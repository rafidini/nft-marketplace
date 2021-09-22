import Head from 'next/head'
import {useRouter}  from "next/router";
import Layout from '../components/layout'

// This gets called on every request
export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch("http://api:8000/nft?id=6149a41c3ffa70814c5e5d31")
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

export default function NftPage() {

    return (
        <div class="relative bg-white">
            <Head>
                <title>NFTs ・ Sir. Lion Swag #0 </title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" />
            </Head>
            <main>
                <Layout>
                    <div class="bg-white">
                        <div class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                            <div class="grid grid-cols-1 grid-rows-1 gap-0 sm:gap-0 lg:gap-0">
                                <img src="https://public.nftstatic.com/static/nft/res/136f20299f8545299e688c5f1756ad37.png" alt="" class="bg-gray-100 rounded-lg" />
                            </div>
                            <div>
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Sir. Lion Swag #0</h2>
                                <p class="mt-4 text-gray-500">
                                    Sir. Lion Swag are a group of 6666 lions living in the metaverse.<br />
                                    They are noble, they are the king of beasts.<br />
                                    They are fierce, they hunt with no mercy.<br />
                                    They are united, they live like a family.<br />
                                    Traits:<br />
                                    Genesis:Lion King #0</p>

                                <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Creator</dt>
                                        <dd class="mt-2 text-sm text-gray-500">ThroneAndCrown</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Contract Address</dt>
                                        <dd class="mt-2 text-sm text-gray-500">0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Token ID</dt>
                                        <dd class="mt-2 text-sm text-gray-500">100300120058</dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Price (BUSD)</dt>
                                        <dd class="mt-2 text-sm text-gray-500 inline">
                                            879.6  <img
                                                src="https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=013"
                                                class="inline"
                                                alt="Picture of the author"
                                                width={18}
                                                height={18}
                                            />
                                        </dd>
                                    </div>

                                    <div class="border-t border-gray-200 pt-4">
                                        <dt class="font-medium text-gray-900">Price ($)</dt>
                                        <dd class="mt-2 text-sm text-gray-500 inline">879.5</dd>
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