import os
import sys
import json
import requests
import numpy as np
import pandas as pd
from tqdm import tqdm
from time import sleep
from selenium import webdriver
from datetime import datetime, timedelta
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import NoSuchElementException


def try_find_elements_by_xpath(browser, xpath, wait=10, only_one=True, get='text', warn_error=False):
  try:
    WebDriverWait(browser,wait).until(EC.presence_of_element_located((By.XPATH,xpath)))
    if only_one:
      elt = [browser.find_element_by_xpath(xpath)]
    else:
      elt = list(browser.find_elements_by_xpath(xpath))

    for i,v in enumerate(elt):
      if type(get)==str and get=='text':
        elt[i] = elt[i].text
      elif type(get)==str and get!='text':
        elt[i] = elt[i].get_attribute(get)

    if len(elt)==1:
      return elt[0]
    return elt
 
  except:
    if warn_error:
      code = str(sys.exc_info()[0]).strip('>').split(' ')[-1]
      message = sys.exc_info()[1]
      print(f"{code}: {message}")
    return None


def process_data(nft):
    del nft['id']
    for key in nft.keys():
        if key=='date': nft['date'] = str(datetime.now())
        elif nft[key]==None: nft[key]='N/A'
        elif key=='creator': nft['creator']=nft['creator'][-1]
        elif key=='amount':
            amount, currency = nft['amount'].split(' ')
            nft['amount'] = float(amount)
            nft['currency'] = currency
    return nft


def add_to_db(_dict, url, headers):
    return requests.post(url, data=json.dumps(_dict), headers=headers)


def parse_nft(browser):
  nft = {
    "id": try_find_elements_by_xpath(browser, "//div[@class='css-24c0g9']"),
    "name": try_find_elements_by_xpath(browser, "//div[@class='css-1t8ijp6']/h4"),
    "image": try_find_elements_by_xpath(browser, '//div[@type="img"]/*/img | //div[@type="img"]/*/video', get='src'),
    "amount": try_find_elements_by_xpath(browser, '//div[@class="css-1nwnm8x"]/*'),
    "currency": None,
    "creator" : try_find_elements_by_xpath(browser, "//div[contains(div/text(),'Creator')]/div", only_one=False),
    "date": try_find_elements_by_xpath(browser, "//div[@class='TimeLine__TimeLineItem-wkqr3a-0 oHPcd css-vurnku']",
                                       only_one=False),
    "description" : try_find_elements_by_xpath(browser, '//div[@class="css-df6xow"]'),
    "contract_address": try_find_elements_by_xpath(browser, "//div[@class='css-2czx7p']/*/a"),
    "link": browser.current_url
  }
  nft = process_data(nft)
  url = 'http://api:8000/add_nft'
  headers = {'accept': 'application/json', 'Content-Type': 'application/json'}
  return add_to_db(nft, url, headers)


def open_binance(start_url, browser ,handle_cookies=True):
        print(f"{str(datetime.now()).split('.')[0]}: New scraping initiated")
        try:
            browser.current_url
        except:
            print(f"{str(datetime.now()).split('.')[0]}: Selenium configuration")
            options = webdriver.ChromeOptions()
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            browser = webdriver.Remote("http://selenium:4444/wd/hub", DesiredCapabilities.CHROME, options=options)
        finally:
            browser.get(start_url)
            if handle_cookies:
                try:
                    cookies = browser.find_element_by_xpath("//button[contains(text(),'Accept')]")
                    cookies.click()
                    print(f"{str(datetime.now()).split('.')[0]}: Binance cookies activation")
                except NoSuchElementException:
                    pass
            print(f"{str(datetime.now()).split('.')[0]}: Binance page correctly opened")
            return browser


def scroll_down(browser, MAX_NFT_NB):
    CURRENT_PAGE_NUMBER = int(browser.current_url.split("page=")[-1].split("&")[0])
    NFT_NUMBER_PER_PAGE = int(browser.current_url.split("rows=")[-1].split("&")[0])
    if MAX_NFT_NB/NFT_NUMBER_PER_PAGE == MAX_NFT_NB//NFT_NUMBER_PER_PAGE:
      scroll_down = np.arange((MAX_NFT_NB//NFT_NUMBER_PER_PAGE)-1)
    else:
      scroll_down = np.arange(MAX_NFT_NB//NFT_NUMBER_PER_PAGE)
    for i in tqdm(scroll_down, desc=f'{str(datetime.now()).split(".")[0]}: Scrolling down on the main page'):
      while CURRENT_PAGE_NUMBER == (browser.current_url.split("page=")[-1]).split("&")[0]:
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
      CURRENT_PAGE_NUMBER = (browser.current_url.split("page=")[-1]).split("&")[0]
    
    
def find_detailed_nft_pages(browser, MAX_NFT_NB):
    detailed_pages = []
    pbar = tqdm(total = MAX_NFT_NB, desc=f"{str(datetime.now()).split('.')[0]}: Searching of NFT detailed pages")
    BAR_LEVEL = 0
    while len(detailed_pages) < MAX_NFT_NB:
      browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
      detailed_pages = browser.find_elements_by_xpath('//button[contains(text(),"BSC")]')
      pbar.update(max(0,len(detailed_pages)-BAR_LEVEL))
      BAR_LEVEL = len(detailed_pages)
    pbar.close()
    return detailed_pages


def parse_detailed_nft_pages(browser, detailed_pages):
    success = 0
    failure = 0
    total = len(detailed_pages)

    for page in tqdm(detailed_pages, desc=f"{str(datetime.now()).split('.')[0]}: Scraping of detailed NFT pages"):
      page.click()
      browser.switch_to.window(browser.window_handles[-1])
      res = parse_nft(browser)
      if res.status_code == 201:
            success += 1
      else:
            failure += 1
      browser.close()
      browser.switch_to.window(browser.window_handles[-1])
    print(f"{str(datetime.now()).split('.')[0]}: Storage on database (Success={success}/{total}; Failure={failure}/{total})")
    
    
def wait_next_scraping(NEXT_START, WAIT):
    to_wait = NEXT_START - datetime.now()
    to_wait = round(max(0,to_wait.total_seconds()))
    for i in tqdm(range(to_wait), desc=f"{str(datetime.now()).split('.')[0]}: Waiting for next scraping"):
        sleep(1)
    return NEXT_START+timedelta(seconds=WAIT)


def find_crypto_pages(browser):
    print(f"{str(datetime.now()).split('.')[0]}: Searching of crypto pages")
    browser.find_element_by_xpath('//div[contains(text(),"Toutes les cryptos")]').click()
    nb_pages = browser.find_elements_by_xpath('//button[contains(@aria-label,"Page number")]')[-1].text
    return int(nb_pages)

def parse_crypto_pages(browser, nb_pages):
    columns = ["acronym","name","price"]
    crypto = pd.DataFrame(columns=columns)
    for i in tqdm(range(1,int(nb_pages)+1), desc=f'{str(datetime.now()).split(".")[0]}: Scraping of crypto pages'):
        if i>1:
            next_page = browser.find_element_by_xpath(f"//button[text()='{i}']")
            next_page.click()
        new_infos = pd.DataFrame([elt.text.split("\n")[0:len(columns)] 
                                  for elt in browser.find_elements_by_xpath('//div[@class="css-vlibs4"]')],
                                 columns=columns)
        crypto = pd.concat([crypto,new_infos], ignore_index=True)
    crypto['currency'] = crypto.price.apply(lambda s: s[0])
    crypto['date'] = len(crypto)*[str(datetime.now())]
    crypto.price = crypto.price.apply(lambda s: s[1:].replace('\u202f','').replace(',','.')).astype('float')
    crypto = crypto.to_dict(orient='records')
    url = 'http://api:8000/add_crypto'
    headers = {'accept': 'application/json', 'Content-Type': 'application/json'}
    success = 0
    failure = 0
    total = len(crypto)
    for _dict in crypto:
        res = add_to_db(_dict, url, headers)
        if res.status_code == 201:
            success += 1
        else:
            failure += 1
    print(f"{str(datetime.now()).split('.')[0]}: Storage on database (Success={success}/{total}; Failure={failure}/{total})")
    return crypto