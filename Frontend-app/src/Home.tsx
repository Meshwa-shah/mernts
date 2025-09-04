import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import bg from './assets/gradientBackground.png';
import Section from './Section';
import Pay from './Pay';


import Footer from './Footer';
const Home: React.FC = () => {



  return (
     <div className='w-full' style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 800px'}}>
      
      <Nav/>
      <Hero/>
  
      <Section/>
      <Pay/>
      <Footer/>
    </div>
  )
  
}

export default Home