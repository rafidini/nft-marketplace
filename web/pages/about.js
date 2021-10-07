import Head from 'next/head'
import Layout from '../components/layout'

export default function AboutPage() {

    return (
        <div class="relative bg-white">
            <Head>
                <title>NFTs ・ About </title>
                <link rel="icon" href="/img/favicon.ico" />
            </Head>
            <main>
            <Layout navbar_route="about">
            </Layout>
            </main>
        </div>
    )
}