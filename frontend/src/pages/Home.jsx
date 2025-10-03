import  { useEffect, useState } from 'react'
import Background from '../components/Background';
import Hero from '../components/Hero';
import Product from './Product';
import OurPolicy from '../components/OurPolicy';
import NewLatterBox from '../components/NewLatterBox';
import Footer from '../components/Footer';

function Home() {

  let heroData = [
    {text1: "30% OFF Limited Offer", text2: "On All Products"},
    {text1: "New Arrivals", text2: "Check Out Our Latest Collection"},
    {text1: "Best Sellers", text2: "Shop Our Most Popular Items"},
    {text1: "Exclusive Deals", text2: "Grab Them Before They're Gone"}
  ]

  let [heroCount, setHeroCount] = useState(0);

   useEffect(()=> {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000)
    return () => clearInterval(interval);
   },[])

  return (
  
  
<div className="overflow-hidden relative top-[70px]">

 <div className=' w-[100vw] h-[100vh]  bg-gradient-to-l from-[#141414] to-[#0c2025]  '>
     <Background heroCount={heroCount}/>
     <Hero heroCount={heroCount}
           setHeroCount={setHeroCount}
           heroData={heroData[heroCount]}/>

        </div>
        <Product/>
        <OurPolicy/>
        <NewLatterBox/>
        <Footer/>
    </div>

  )
}

export default Home;