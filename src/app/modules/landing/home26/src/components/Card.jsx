import React from 'react'
import './Card.scss'
import card1 from '../img/card-1.png'
import card2 from '../img/card-2.png'
import card3 from '../img/card-3.png'
import card4 from '../img/card-4.png'


const Card = () => {
  return (
    <div className="card">
        <img src={card1} alt="" />
        <img src={card2} alt="" />
        <img src={card3} alt="" />
        <img src={card4} alt="" />
    </div>
  )
}  
export default Card