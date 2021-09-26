import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 py-8 md:py-12 border-t border-gray-200">
          <div className="sm:col-span-12 md:col-span-10">
            <div className="mb-2">
              <Link href="/" aria-label="Cruip">
                <a className="inline-block">
                  Flashcards!
                </a>
              </Link>
            </div>
          </div>
          <div className="sm:col-span-12  md:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Reach Out</h6>
            <p className="text-sm text-gray-600 mb-2">Want to have a word with me?</p>
            <a className="cursor-pointer text-sm underline" href="https://iabhishek.dev/contact" target="_blank" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <Link href="#" aria-label="Twitter">
                <a className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 transition duration-150 ease-in-out">
                  <FontAwesomeIcon style={{ fontSize: '1.5rem' }} icon={faTwitter} />
                </a>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="#" aria-label="Github">
                <a className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 transition duration-150 ease-in-out">
                  <FontAwesomeIcon style={{ fontSize: '1.5rem' }} icon={faGithub} />
                </a>
              </Link>
            </li>
            <li className="ml-4">
              <Link href="#" aria-label="LinkedIn">
                <a className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 transition duration-150 ease-in-out">
                  <FontAwesomeIcon style={{ fontSize: '1.5rem' }} icon={faLinkedin} />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
