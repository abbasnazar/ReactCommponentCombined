import React from 'react'
import './Partners.scss'
import techm from '../img/techm.svg'
import mindtree from '../img/mindtree-logo.png'
import capgemini from '../img/capgemini-1.png'
import wipro from '../img/wipro.png'
import tcs from '../img/tcs.png'
import tcl from '../img/tcl.png'
import birlasoft from '../img/birlasoft.jpg'
import kyndryl from '../img/Kyndryl.png'
import innova from '../img/Innova.png'
import ibm from '../img/ibm.png'


const Partners = () => {
  return (
    <div className="partner">
        <div className="container">
            <aside>Trusted by fast-growing organisations and modern leaders</aside>
            <div className='images'>
                <img src={techm} alt="" />
                <img src={mindtree} alt="" />
                <img src={capgemini} alt="" />
                <img src={wipro} alt="" />
                <img src={tcs} alt="" />
                <img src={tcl} alt="" />
                <img src={birlasoft} alt="" />
                <img src={kyndryl} alt="" />
                <img src={innova} alt="" />
                <img src={ibm} alt="" />
            </div> 
        </div>
    </div>
  )
}

export default Partners