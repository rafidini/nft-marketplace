import Head from 'next/head'
import Layout from '../components/layout'
import List from '../components/list'

// Constants
const N_NFTS = 30

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/nfts?limit=` + N_NFTS)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

export default function MarketplacePage({data}) {
    return (
        <div class="relative bg-white">
            <Head>
                <title>NFTs ・ Marketplace </title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" />
            </Head>
            <main>
                <Layout navbar_route="marketplace">
                    <List data={data}/>
                </Layout>
            </main>
        </div>
    )
}