import sys
import json
import requests
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def select_number():
    nb=-1
    while 1==1:
        nb = input("Select a NFT number: ")
        if  nb.isnumeric() and int(nb)>=0:
            break
    return int(nb)

def try_find_elements_by_xpath(browser, xpath, wait=5, only_one=True, get='text', warn_error=False):
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
        elif key=='currency':
            amount, currency = nft['currency'].split(' ')
            nft['amount'] = float(amount)
            nft['currency'] = currency
    return nft


def add_to_db(nft):
    url = 'http://api:8000/add_nft'
    headers = {'accept': 'application/json', 'Content-Type': 'application/json'}
    return requests.post(url, data=json.dumps(nft), headers=headers)


def parse_nft(browser):
  nft = {
    "id": try_find_elements_by_xpath(browser, "//div[@class='css-24c0g9']"),
    "name": try_find_elements_by_xpath(browser, "//div[@class='css-1t8ijp6']/h4"),
    "image": try_find_elements_by_xpath(browser, '//div[@type="img"]/*/img | //div[@type="img"]/*/video', get='src'),
    "amount": try_find_elements_by_xpath(browser, '//div[@class="css-1nwnm8x"]/*'),
    "currency": None,
    "creator" : try_find_elements_by_xpath(browser, "//div[contains(div/text(),'Creator')]/div", only_one=False)[-1],
    "date": try_find_elements_by_xpath(browser, "//div[@class='TimeLine__TimeLineItem-wkqr3a-0 oHPcd css-vurnku']",
                                       only_one=False),
    "description" : try_find_elements_by_xpath(browser, "//div[@class='css-1e3aajp']"),
    "contract_address": try_find_elements_by_xpath(browser, "//div[@class='css-2czx7p']/*/a"),
    "link": browser.current_url
  }
  nft = process_data(nft)
  return add_to_db(nft)