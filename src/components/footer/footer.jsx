import React from 'react';
import linkedIn from '../../assets/linkedin.png';
import Insta from '../../assets/insta.png';
import Git from '../../assets/git.png';
import './footer.css'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="socials">
            <a href="https://www.linkedin.com/in/arijit-saha-054368244/"><img src={ linkedIn } alt="linkedin logo" /></a>
            <a href="https://instagram.com/draunzie/"><img src={ Insta } alt="instagram logo" /></a>
            <a href="https://github.com/draunzler"><img src={ Git } alt="github logo" /></a>
        </div>
        <h3>Arijit Saha @2024 All Rights Reserved</h3>
    </div>
  )
}