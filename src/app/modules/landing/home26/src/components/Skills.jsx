import React from 'react'
import "./Skills.scss"
import skill from '../img/skill.png'
import location from '../img/location.png'

const Skills = () => {
  return (
    <div className="skills">
        <div className="container">
            <div className="skillset">
                <img src={skill} alt="" />
                <input type="text" placeholder="Candidate's Skillset" />
            </div>
            <div className="location">
                <img src={location} alt="" />
                <input type="text" placeholder="Hiring Location" />
            </div>
            <button className='btn'>
              Get Started
            </button>
        </div>
        <div className="component">
          <div className="skillset-comp components">
              <img src={skill} alt="" />
              <input type="text" placeholder="Candidate's Skillset" />
          </div>
          <div className="location-comp components">
              <img src={location} alt="" />
              <input type="text" placeholder="Hiring Location" />
          </div>
          <button className='btn'>
               <a href="https://www.jobmojo.ai/#/requestTrial">Get Started</a> 
          </button>
        </div>
    </div>
  )
}

export default Skills

