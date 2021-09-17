import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="relative">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600" data-aos="zoom-y-out">
              Made as a side project by <a href="https://iabhishek.dev" className="underline" target="_blank" rel="noreferrer">Abhishek</a>.
            </p>
          </div>

          {/* Items */}
          <div className="max-w-2xl md:max-w-4xl mx-auto grid gap-2 grid-cols-2 md:grid-cols-4">

            {/* Item */}
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://www.apollographql.com">
                <Image src="/apollo.png" width="50px" height="50px" alt="apollo logo" />
                <p className="text-md text-gray-600">Apollo GraphQL</p>
              </a>
            </div>

            {/* Item */}
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://www.postgresql.org/">
                <Image src="/postgres.png" width="50px" height="50px" alt="postgresql logo" />
                <p className="text-md text-gray-600">PostgreSQL</p>
              </a>
            </div>

            {/* Item */}
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://typegraphql.com/">
                <Image src="/typegraphql.png" width="50px" height="50px" alt="type-graphql logo" />
                <p className="text-md text-gray-600">Type-GraphQL</p>
              </a>
            </div>

            {/* Item */}
            <div className="flex items-center text-center justify-center py-2 col-span-1 md:col-auto flex-col">
              <a target="_blank" className="cursor-pointer" rel="noreferrer" href="https://nextjs.org/">
                <Image src="/nextjs.png" width="70px" height="50px" alt="nextjs logo" />
                <p className="text-md text-gray-600">NextJS</p>
              </a>
            </div>

          </div>

          {/* Testimonials */}
          <div className="mx-auto mt-10" data-aos="zoom-y-out">
            <div className="relative text-center">
              <div className="flex flex-col">
                <div
                  className="mb-2 cursor-pointer"
                  onClick={() => window.open('https://github.com/abhi12299/flashcards-backend', '_blank')}
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </div>
                <div className="font-semibold text-lg not-italic mt-3">
                  Consider starring on Github
                </div>
              </div>
              {/* Testimonial */}
              {/* <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                  <svg className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                  </svg>
                  <img className="relative rounded-full" src={require('../images/testimonial.jpg').default} width="96" height="96" alt="Testimonial 01" />
                </div>
                <blockquote className="text-xl font-medium mb-4">
                  “ I love this product and would recommend it to anyone. Could be not easier to use, and our multiple websites are wonderful. We get nice comments all the time. “
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">Darya Finger</cite>
                <div className="text-gray-600">
                  <span>CEO & Co-Founder</span> <a className="text-blue-600 hover:underline" href="#0">@Dropbox</a>
                </div>
              </div> */}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;