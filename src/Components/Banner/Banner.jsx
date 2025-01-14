import React from 'react';
import './Banner.css';
import banner_icon from '../Assets/Name_Banner.png'
const Banner = () => {
    return (
        <div className="banner-main">
            <img src={banner_icon} alt="" />
        </div>
    )
}

export default Banner;