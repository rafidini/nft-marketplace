import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage() {

    return (
        <div class="relative bg-white">
            <Head>
                <title>NFTs ・ About </title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" />
            </Head>
            <main>
            <Layout navbar_route="about">
            </Layout>
            </main>
        </div>
    )
}