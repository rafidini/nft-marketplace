# NFT Marketplace
- [NFT Marketplace [template]](#nft-marketplace-template)
- [Table of contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
  - [Git [optional]](#git-optional)
  - [Docker](#docker)
- [Usage](#usage)
- [Contributing](#contributing)
- [Help](#help)
- [Credits](#credits)

# About
This application is an example of a marketplace where you cannot buy (unfortunately). Here is how this application was implemented :
- frontend : **Next.js** (**React** framework) + **Tailwind CSS**
- backend  : **FastAPI** (web framework for building APIs with **Python** 3.6+) + 
  **MongoDB** (NoSQL database program)
- scraper  : **Selenium** (open-source project aimed at automated web browsing)

Some functionalities :
- Visualize NFTs, real-time price in fiat currency and fixed price in cryptocurrency
- Post and access to comments made for the application on the wall page

# Installation
This part is dedicated to the prerequisites to launch the application.

## Git [optional]
You can download the project by pressing the ***Code/Download ZIP*** button on GitHub or else you can type the following command in your terminal if you have Git of course.

```
$ git clone https://github.com/rafidini/nft-marketplace.git
```

## Docker
> **Docker**
:
*Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. - **Wikipedia***

You can download the desktop software by taking a look at this [link](https://www.docker.com/get-started).

In order to use the app you will have to install both ***Docker*** and ***Docker Compose***. The following instructions are compatible
with linux and macOs terminals.

1. Build the images with *Docker Compose*
```bash
$ docker-compose build
```

2. Run the container with *Docker Compose*
```bash
$ docker-compose up
```

# Usage
## Web
After launching the docker container, check the main web page at [localhost:3000](http://localhost:3000)
and if the page is loaded you can begin to check either, the *Marketplace* or the *Wall*.

You can also find the *Marketplace* at [localhost:3000/marketplace](http://localhost:3000/marketplace) and,
the *Wall* page at [localhost:3000/wall](http://localhost:3000/wall).

## Rest API
In order to check our API you can navigate through the following page [localhost:8000/docs](http://localhost:8000/docs) and you can test the different **GET** and, **POST** requests by using the *Try it out* button.

## Scrapers
The scrapers are automated **Python** scripts that extracts data from specific websites (here [binance.com](http://binance.com)) at regular intervals in an endless loop.

## MongoDB
Data is arranged in the the `local` database and you can find :
- NFTs in the `nfts` collection
- Cryptocurrency prices in the `cryptos` collection
- Wall page comments in the `comments` collection

# Issues
## Keycloak
We wanted to add an authentification system by using **Keycloak** but we couldn't do it with our tech
stack so we put it aside. This functionnality can be implemented in the future.

## Kong
Our lack of time in the project developpement did not allow us to add the gateway management with **Kong**
so this functionnality can also be implemented in the future.

# Credits
We would like to thanks the following people for their support :
- COURIVAUD Raphaël
- VO Nicolas
