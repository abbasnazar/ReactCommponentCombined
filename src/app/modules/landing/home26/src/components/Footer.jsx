import React from 'react'
import './Footer.scss'
import logo from '../img/logo.png'
import facebook from '../img/facebook.png'
import instagram from '../img/instagram.png'
import linkedin from '../img/linkedin.png'
import youtube from '../img/youtube.png'

const Footer = () => {
  return (
    <div className="footer">
       <div className="footer-logo">
        <img src={logo} alt="" />
       </div>
       <div className='contact-logo'> 
          <a href="https://www.facebook.com/" target="_blank"><img src={facebook} alt="" /></a>
          <a href="https://www.instagram.com/jobmojo.ai/" target="_blank"><img src={instagram} alt="" /></a>
          <a href="https://www.linkedin.com/company/jobmojoai/about/" target="_blank"><img src={linkedin} alt="" /></a>
          <a href="https://www.youtube.com/channel/UCpTlBq9diMq_p9R88KRZnAQ" target="_blank"><img src={youtube} alt="" /></a>
        </div> 
        <div className='footer-txt'>
          <p>D-108, Sector-63, Noida </p>
          <p>© 2022 JobMojo.ai . All rights received.</p>
        </div>
    </div>
  )
}

export default Footer