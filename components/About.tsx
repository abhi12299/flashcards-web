import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="relative">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600">
              Made as a side project by <a href="https://iabhishek.dev" className="underline" target="_blank" rel="noreferrer">Abhishek</a>.
            </p>
          </div>
          <div className="max-w-2xl md:max-w-4xl mx-auto grid gap-2 grid-cols-2 md:grid-cols-4">
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://www.apollographql.com">
                <Image src="/apollo.png" width="50px" height="50px" alt="apollo logo" />
                <p className="text-md text-gray-600">Apollo GraphQL</p>
              </a>
            </div>
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://www.postgresql.org/">
                <Image src="/postgres.png" width="50px" height="50px" alt="postgresql logo" />
                <p className="text-md text-gray-600">PostgreSQL</p>
              </a>
            </div>
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://typegraphql.com/">
                <Image src="/typegraphql.png" width="50px" height="50px" alt="type-graphql logo" />
                <p className="text-md text-gray-600">Type-GraphQL</p>
              </a>
            </div>
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://nextjs.org/">
                <Image src="/nextjs.png" width="70px" height="50px" alt="nextjs logo" />
                <p className="text-md text-gray-600">NextJS</p>
              </a>
            </div>

          </div>
          <div className="mx-auto mt-10">
            <div className="relative text-center">
              <div className="flex flex-col">
                <div>
                  <FontAwesomeIcon className="mb-2 cursor-pointer" onClick={() => window.open('https://github.com/abhi12299/flashcards-backend', '_blank')} icon={faGithub} size="2x" />
                </div>
                <div className="font-semibold text-lg not-italic mt-3">
                  Consider starring on Github
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;