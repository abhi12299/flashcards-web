import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React from 'react'

// create flashcard FAB
const Fab: React.FC = () => {
  const router = useRouter()
  return (
    <div onClick={() => router.push('/create')} className="fixed bottom-10 right-10 cursor-pointer" data-pr-tooltip="Create Flashcard" data-pr-position="top">
      <div style={{ width: '3rem', height: '3rem' }} className="text-white flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-400">
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </div>
    </div>
  )
}

export default Fab
