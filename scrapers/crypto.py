
from utils import *

WAIT = 3*60 # 15 min = 900s
NEXT_START = datetime.now()+timedelta(seconds=WAIT)
start_url = 'https://www.binance.com/fr/markets'

while True:
    browser = open_binance(start_url, False) # ouverture de la page principale des cryptos
    nb_pages = find_crypto_pages(browser) # recherche de pages additionnelles
    parse_crypto_pages(browser, nb_pages) # scraping des pages de cryptos
    NEXT_START = wait_next_scraping(NEXT_START, WAIT) # attente avant prochain scraping 
