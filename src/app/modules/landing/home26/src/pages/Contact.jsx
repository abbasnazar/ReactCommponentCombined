import React from 'react'
import Footer from '../components/Footer'
import MainContact from '../components/MainContact'
import Navbar from '../components/Navbar'

const Contact = () => {
  return (
    <div className="contact">
        <Navbar />
        <MainContact />
        <Footer /> 
    </div>
  )
}

export default Contact