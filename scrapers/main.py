
from utils import *

WAIT = 18000 # 5h = 18000s
MAX_NFT_NB = 16
NEXT_START = datetime.now()+timedelta(seconds=WAIT)

while True:
    browser = open_marketplace() # ouverture du marketplace
    scroll_down(browser, MAX_NFT_NB) # scroll down sur marketplace
    detailed_pages = find_detailed_pages(browser, MAX_NFT_NB) # recherche de pages détaillées
    parse_detailed_pages(browser, detailed_pages) # scraping des pages détaillées
    NEXT_START = wait_next_scraping(NEXT_START, WAIT) # attente avant prochain scraping 
