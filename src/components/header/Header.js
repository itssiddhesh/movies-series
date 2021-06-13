import React from 'react'
import './Header.css'
import { FcClapperboard,FcCamcorderPro,FcFilmReel } from "react-icons/fc";
import { Link } from 'react-router-dom';


function Header() {
    return (
        <Link to='/'>
        <h2 className='header' > <FcFilmReel/> What to Watch <FcClapperboard/>  </h2>
        </Link>
        
    )
}

export default Header
