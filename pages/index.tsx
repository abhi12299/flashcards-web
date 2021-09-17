import Head from 'next/head';
import About from '../components/About';
import Features from '../components/Features';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

function Home() {

  return (
    <>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Features />
        <About />
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(Home);
