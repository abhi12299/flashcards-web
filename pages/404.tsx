import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

const Page404: React.FC = () => {
  return (
    <>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 pt-20 md:pt-30">
          <div className="pt-20 pb-12">
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-xl md:text-2xl font-extrabold leading-tighter tracking-tighter mb-4">
                Not Found!
              </h1>
              <Link href="/">
                <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                  Go to Home page
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(Page404);
