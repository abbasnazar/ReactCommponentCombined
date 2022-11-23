import React from 'react'
import './Features.scss'
import workflow from '../gif/workflow-w.gif'
import content from '../gif/content-w.gif'
import ai from '../gif/ai-w.gif'

const Features = () => {
  return (
    <div className="features">
        <div className="content">
            <h1>Features<span>.</span></h1>
            <p>Find out how Jobmojo makes recruitment a breeze.</p>   
        </div>
        <div className="wrapper">
          <div className="container">
            <h3>Content Management.</h3>
            <p>Manage job seekers and positions through the Jobmojo Content Management System, a tailor-made CMS for keeping track of companies, jobs and candidates.</p>
            <img src={content} alt="" />
          </div>
          <div className="container">
            <h3>Manage your complete Recruitment Workflow.</h3>
            <p>Jobmojo provides the tools to manage your recruitment workflow from end  end. Add jobs, track candidates, manage communications—all through one tool.</p>
            <img src={workflow} alt="" />
          </div>
          <div className="container">
            <h3>AI Recruiter.</h3>
            <p>Jobomojo’s AI Recruiter uses cutting edge deep learning algorithms to sort through applicants from across job portals and find the best candidates for your jobs.</p>
            <img src={ai} alt="" />
          </div>
      </div>
    </div>  
  )
}

export default Features