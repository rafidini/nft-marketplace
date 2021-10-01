
from utils import *

WAIT = 3*60 # 5h = 18000s
MAX_NFT_NB = 16
NEXT_START = datetime.now()+timedelta(seconds=WAIT)
start_url = 'https://www.binance.com/en/nft/market?currency=&mediaType=&tradeType=&amountFrom=&amountTo=&categorys=&keyword=&page=1&rows=16&productIds=&order=list_time%40-1'
browser= None

while True:
    browser = open_binance(start_url, browser) # ouverture du marketplace
    scroll_down(browser, MAX_NFT_NB) # scroll down sur marketplace
    detailed_pages = find_detailed_nft_pages(browser, MAX_NFT_NB) # recherche de pages détaillées
    parse_detailed_nft_pages(browser, detailed_pages) # scraping des pages détaillées
    NEXT_START = wait_next_scraping(NEXT_START, WAIT) # attente avant prochain scraping 
