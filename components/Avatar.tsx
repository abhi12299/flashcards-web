import Image from 'next/image'
import React from 'react'

const Avatar: React.FC<{
  name: string
}> = ({ name }) => {
  return (
    <Image layout="fill" className="rounded-full" alt={`avatar of ${name}`} src={`https://avatars.dicebear.com/api/initials/${name}.svg`} />
  )
}

export default Avatar
