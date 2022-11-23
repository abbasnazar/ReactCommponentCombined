import React from 'react'
import './Works.scss'
import search from '../gif/search-job.gif'
import apply from '../gif/apply-job.gif'
import work from '../gif/work-job.gif'

const Works = () => {
  return (
    <div className="works">
        <div className="content">
            <h2>How it Works?</h2>
        </div>
        <div className="wrapper">
            <div className="container">
                <img src={search} alt="" />
                <h3>1. Search a job</h3>
                <p>Manage job seekers and positions through the Jobmojo Content Management System, a tailor-made CMS for keeping track of companies, jobs and candidates.</p>
            </div>
            <div className="container">
                <img src={apply} alt="" />
                <h3>2. Apply for job</h3>
                <p>Manage job seekers and positions through the Jobmojo Content Management System, a tailor-made CMS for keeping track of companies, jobs and candidates.</p>
            </div>
            <div className="container">
                <img src={work} alt="" />
                <h3>3. Get your job</h3>
                <p>Manage job seekers and positions through the Jobmojo Content Management System, a tailor-made CMS for keeping track of companies, jobs and candidates.</p>
            </div>
        </div>
    </div>
  )
}

export default Works