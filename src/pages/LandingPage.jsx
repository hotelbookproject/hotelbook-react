import React from 'react'
import SearchComponent from '../components/common/SearchComponent'
import Carousel from '../components/common/Carousel';
import Room from '../components/landingPageComponent/rooms'
import Footer from '../components/common/Footer'

function LandingPage() {
    return (
        <div> 
            <Carousel/> 
            <SearchComponent initialValues={null} />
            <Room />
            <Footer />
        </div> 
    )
}

export default LandingPage
