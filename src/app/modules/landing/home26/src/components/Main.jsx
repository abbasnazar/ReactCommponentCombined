import React from 'react'
import Typical from 'react-typical'
import "./Main.scss"
import img1 from '../img/main-img-1.jpg'
import img2 from '../img/main-img-2.jpg'
import img12 from '../img/main-img1&2.png'

const Main = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="content">
          <h1>
             <Typical className="typical"
                  loop={Infinity}
                  wrapper="b"
                  steps={['Recruitment?', 1000, 'Switching Jobs?', 1000]}
              />
              <br />
              we'll make it <br/> Easy.
          </h1>  
          <p>Effective hiring platform for job seekers and recruiters with AI Algorithm.</p>
          <button className='btn'>
               <a href="https://www.jobmojo.ai/#/requestTrial">Try it out for FREE</a> 
          </button>
        </div>
        <div className="images">
          {/* <img className='img-2' src={img2} alt="" />
          <img className='img-1' src={img1} alt="" /> */}

          {/* <img className='img-small' srcSet={img1} sizes='(min-width: 768px)'
          src={img1} alt="" /> */}

          <img className='img-1' src={img1} alt="" />
          <img className='img-2' src={img2} alt="" />
          <img className='img-12' src={img12} alt="" />
        </div> 
      </div>
    </div>
  )
}

export default Main