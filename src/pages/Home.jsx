import React from 'react'
import Headers from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import Generatebtn from '../components/Generatebtn'
const home = () => {
  return (
    <div>
      <Headers />
      <Steps/>
      <Description/>
      <Testimonials />
      <Generatebtn/>
    </div>
  )
}

export default home
