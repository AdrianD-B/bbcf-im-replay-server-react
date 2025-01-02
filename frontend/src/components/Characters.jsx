import React,{useState} from 'react'

import { BbcfRoster } from '../assets'

const Characters = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`flex justify-center my-20 mx-auto w-full gap-5`}>
      <BbcfRoster/>
      </div>
    </section>
  )
}

export default Characters