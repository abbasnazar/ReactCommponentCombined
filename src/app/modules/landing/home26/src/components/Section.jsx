import React from 'react'
import './Section.scss'
import img from '../img/section-img1.png'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Section = () => {
  return (
    <div className="section">
        <div className="container">
          <div className="content">
            <h1>Hiring made easy! <br /> & trusted across Industries. <br /> Connect with us. <br /> </h1>
            <button className='btn'>
              <a href=""> <Link to="contact">Contact us</Link></a>
            </button> 
            {/* <Button className='button' variant="contained">Contact Us</Button> */}
          </div>  
          <img src={img} alt="" />
        </div>
    </div>
  )
}

export default Section