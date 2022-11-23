import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Skills from '../components/Skills'
import Partners from '../components/Partners'
import Description from '../components/Description'
import Footer from '../components/Footer'
import Features from '../components/Features'
import Works from '../components/Works'
import '../pages/Home.scss'
import Card from '../components/Card'
import Section from '../components/Section'


const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Main />
      <Skills />
      <Works />
      <Section />
      <Partners />
      <Card />
      <Features />
      <Description />
      <Footer />
    </div>
  )
}

export default Home

