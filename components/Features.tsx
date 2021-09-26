import { faBook, faEdit, faGlobe, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-10 md:pb-16">
            <h2 className="h2">How It Works</h2>
          </div>
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
            <div className="feat relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="rounded-full items-center fill-current text-blue-600">
                <FontAwesomeIcon icon={faEdit} size="2x" className="w-16 h-16" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Create Flashcards</h4>
              <p className="text-gray-600 text-center">
                For anything you want to remember!
              </p>
            </div>
            <div className="feat relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="rounded-full items-center fill-current text-blue-600">
                <FontAwesomeIcon icon={faBook} size="2x" className="w-16 h-16" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Organize Flashcards</h4>
              <p className="text-gray-600 text-center">
                Assign tags to flashcards for easy access later on.
              </p>
            </div>
            <div className="feat relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="rounded-full items-center fill-current text-blue-600">
                <FontAwesomeIcon icon={faGlobe} size="2x" className="w-16 h-16" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Share Flashcards</h4>
              <p className="text-gray-600 text-center">
                Share your knowledge with others, or keep it to yourself. Your choice!
              </p>
            </div>
            <div className="feat relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="rounded-full items-center fill-current text-blue-600">
                <FontAwesomeIcon icon={faShareAlt} size="2x" className="w-16 h-16" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Fork Flashcards</h4>
              <p className="text-gray-600 text-center">
                Like someone&apos;s flashcard? Fork it to make it yours!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features
