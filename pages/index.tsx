import Head from 'next/head';
import About from '../components/About';
import Fab from '../components/Fab';
import Features from '../components/Features';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import { useUserQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

function Home() {
  const { data } = useUserQuery({
    fetchPolicy: 'network-only'
  })

  console.log('user', data)
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
        {data && data.user && <Fab />}
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(Home);
