import Head from 'next/head'
import Layout from '../../components/layout'

// This also gets called at build time
export async function getServerSideProps(context) {
    const nft_id = context['params']['id']
    const url = "http://api:8000/nft?id=" + String(nft_id)
    const res = await fetch(url)
    const nft = await res.json()
  
    // Pass post data to the page via props
    return { props: { nft } }
}

export default function NftPage({nft}) {

    // Cryptocurrency logo mapping
    const logos_currency = {
        "BUSD": "https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=013",
        "BNB": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=013",
        "ETH": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013"
    }

    // Image or Video
    var picture = ""
    if (nft['image'].search("mp4") < 0)
        picture = <img src={nft['image']}  alt="" class="bg-gray-100 rounded-lg" />
    else
        picture = <video src={nft['image']}  alt="" class="bg-gray-100 rounded-lg" autoplay/>

    return (
        <div class="relative bg-white">
            <Head>
                <title>{nft['name']}</title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" />
            </Head>
            <main>
                <Layout>
                    <div class="bg-white">
                        <div class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                            <div class="grid grid-cols-1 grid-rows-1 gap-0 sm:gap-0 lg:gap-0">
                                {picture}
                            </div>
                            <div>
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{nft['name']}</h2>
                                <p class="mt-4 text-gray-500">{nft['description']}</p>

                                <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Creator</dt>
                                        <dd class="mt-2 text-sm text-gray-500">@{nft['creator']}</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Contract Address</dt>
                                        <dd class="mt-2 text-sm text-gray-500">{nft['contract_address']}</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Scraping date</dt>
                                        <dd class="mt-2 text-sm text-gray-500">{nft['date']}</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Price ({nft['currency']})</dt>
                                        <dd class="mt-2 text-sm text-gray-500 inline">
                                            {nft['amount']}  <img
                                                src={logos_currency[nft['currency']]}
                                                class="inline"
                                                alt="Picture of the author"
                                                width={18}
                                                height={18}
                                            />
                                        </dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Price ($)</dt>
                                        <dd class="mt-2 text-sm text-gray-500 inline">??</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
        </div>
    )
}