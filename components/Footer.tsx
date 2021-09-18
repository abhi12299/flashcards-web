import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 md:col-span-10">
            <div className="mb-2">
              {/* Logo */}
              <Link href="/" aria-label="Cruip">
                <a className="inline-block">
                  Flashcards!
                </a>
              </Link>
            </div>
          </div>

          {/* 2nd block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Products</h6>
            <ul className="text-sm">
              <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Web Studio</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">DynamicBox Flex</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Programming Forms</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Integrations</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Command-line</Link>
                </li>                            
            </ul>
          </div> */}

          {/* 3rd block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Documentation</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Tutorials & Guides</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Blog</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Support Center</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Partners</Link>
                </li>
            </ul>
          </div> */}

          {/* 4th block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Company</h6>
            <ul className="text-sm">
              <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Home</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About us</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Company values</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Pricing</Link>
                </li>
                <li className="mb-2">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Privacy Policy</Link>
                </li>
            </ul>
          </div> */}

          {/* 5th block */}
          <div className="sm:col-span-12  md:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Reach Out</h6>
            <p className="text-sm text-gray-600 mb-2">Want to have a word with me?</p>
            <a className="cursor-pointer text-sm underline" href="https://iabhishek.dev/contact" target="_blank" rel="noreferrer">Click here</a>
            {/* <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                  <div className="relative flex items-center max-w-xs">
                    <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="Your email" required />
                    <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                      <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                      <svg className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                  Success message
                  <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p>
                </div>
              </div>
            </form> */}
          </div>

        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Social links */}
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
          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">Made using <a className="text-blue-600 hover:underline" href="https://cruip.com/">Cruip</a> free template. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
