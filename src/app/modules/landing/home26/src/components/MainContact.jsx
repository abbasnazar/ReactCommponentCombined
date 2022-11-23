import React from 'react'
import './MainContact.scss'
import img from '../img/contact-img.png'
import img1 from '../img/form-contact.png'

const MainContact = () => {
  return (
    <div className="mainContact">
        <div className="main-container">
            <div className="main-content">
                <h1>Hi, how can we help?</h1>
                <h2>Help and support</h2>
                <p>Have questions or need to report an issue with a Jobmojo product or service? We've got you covered.</p>
                <button className='btn-support'>
                   <a href="">Get Support</a> 
                </button>
            </div>
            <img src={img} alt="" />
        </div>
        <div className="main-container">
            <div className="main-content">
                <h2>Get In Touch</h2>
                <p>We are help for you! How can we help you?</p>
                <form action="">
                    <input type="text" className='mail'  name="mail" placeholder="Email Address" /> 
                    <input type="text" className='message'  name="message" placeholder="Your Message" /> 
                </form>
                <button className='btn-support'>
                   <a href="">Submit</a> 
                </button>
            </div>
            <img src={img1} alt="" />
        </div>
        <div className="press">
            <h1>Member of the Press?</h1>
            <p>Send us a note <span>here.</span></p>
        </div>
    </div>
  )
}

export default MainContact