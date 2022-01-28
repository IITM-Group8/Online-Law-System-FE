import React from 'react';
import '../Styles/herosection.css';
import Court from '../Images/Court.jpg';
import Law from '../Images/Law-1.jpg';


function HeroSection() {
  return (
    <div className='hero-container'>
      <img src = {Law} alt = 'Not Found' className='header-img'></img>
      <h1>Truth alone Triumphs</h1>
     </div>
  );
}

export default HeroSection;
