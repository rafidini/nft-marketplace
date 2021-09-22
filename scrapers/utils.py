import sys
import json
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


def parse_nft(browser):
  return {
    "id": try_find_elements_by_xpath(browser, "//div[@class='css-24c0g9']"),
    "name": try_find_elements_by_xpath(browser, "//div[@class='css-1t8ijp6']/h4"),
    "image": try_find_elements_by_xpath(browser, '//div[@type="img"]/*/img | //div[@type="img"]/*/video', get='src'),
    "amount": try_find_elements_by_xpath(browser, '//div[@class="css-1nwnm8x"]/*'),
    "currency": try_find_elements_by_xpath(browser, '//div[@class="css-1nwnm8x"]/*'),
    "creator" : try_find_elements_by_xpath(browser, "//div[contains(div/text(),'Creator')]/div", only_one=False)[-1],
    "date": try_find_elements_by_xpath(browser, "//div[@class='TimeLine__TimeLineItem-wkqr3a-0 oHPcd css-vurnku']", only_one=False),
    "description" : try_find_elements_by_xpath(browser, "//div[@class='css-1e3aajp']"),
    "contract_address": try_find_elements_by_xpath(browser, "//div[@class='css-2czx7p']/*/a"),
    "link": browser.current_url
  }


def add_to_json(_dict,path): 
  if type(_dict)==dict:
    with open(path, 'ab+') as f:
      f.seek(0,2)                                #Go to the end of file    
      if f.tell() == 0 :                         #Check if file is empty
          f.write(json.dumps([_dict], indent=4, ensure_ascii=False).encode())  #If empty, write an array

      else :
          f.seek(-1,2)           
          f.truncate()                           #Remove the last character, open the array
          f.write(' , '.encode())                #Write the separator
          f.write(json.dumps(_dict, indent=4, ensure_ascii=False).encode())    #Dump the dictionary
          f.write(']'.encode())                  #Close the array