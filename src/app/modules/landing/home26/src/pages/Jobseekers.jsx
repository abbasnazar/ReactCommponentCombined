import React from 'react'
import './Jobseekers.scss'
import recruiter from '../gif/recruiter-1.gif'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import card_2 from '../img/Jobmojo-card-2.png'
import login_img from '../img/login-component.png'


const Jobseekers = () => {
  return (
    <div className="jobseekers">
        <Navbar />
        <div className="wrapper">
            <div className="container">
                <div className="content">
                    <h1>Willing to <span>hire?</span><br />
                        We've got you covered.
                    </h1>
                    <p>Explore thousands of job opportunities with all the information you need. It's your future. Come find it. Manage all your job application from start to finish.</p> 
                </div>
                <div className="form">
                    <h2>Let's get started</h2>
                    <form className='action' action="">
                        <input type="name" placeholder='Name' />
                        <input type="email" placeholder='Email' />
                        <input type="organisationName" placeholder='Contact Number' />
                        <button>Upload Resume</button>
                    </form>
                </div>   
            </div>
            <div className="image-container">
                <img src={card_2} alt="" /> 
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Jobseekers