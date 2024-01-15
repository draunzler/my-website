import React, { useEffect, useState } from 'react';
import './home.css';
import heroImage from '../../assets/me.jpg';
import download from '../../assets/download.png';
import hsecBG from '../../assets/hero-section-bg.png';
import skillReact from '../../assets/skill-react.png';
import skillFigma from '../../assets/skill-figma.png';
import skillGCP from '../../assets/skill-gcp.png';
import skillJava from '../../assets/skill-java.png';
import skillPS from '../../assets/skill-photoshop.png';
import skillPython from '../../assets/skill-python.png';
import RepoDetails from '../../components/repo/repo';
import Contact from '../../components/contact/contact';

export const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="hero-section">
        <img src={ hsecBG } alt="" className='hero-section-bg'/>
        <div className="des parallax-content" data-speed="0.5" style={{ transform: `translate(0%, calc(0% + ${-scrollTop * 0.5}px))` }}>
          <h1>Hi! I’m Arijit</h1>
          <span>Full Stack Developer</span>
          <p>Full Stack Dev & UI/UX Designer passionate about crafting seamless digital experiences with HTML, CSS, JavaScript, React, Node.js. Welcome to my portfolio where development meets design to redefine the digital landscape.</p>
          <button>Download Resume <img src={download} alt="Download Icon" /></button>
        </div>
        <img src={heroImage} alt="" className='hero-image'/>
      </div>
      <div className="skills">
        <h1>What am I good at?</h1>
        <div className="grid-container parallax-content" data-speed="0.3" style={{ transform: `translate(0%, calc(0% + ${-scrollTop * 0.3}px))` }}>
          <div className="grid-item">
            <img src={skillPS} alt="" />
          </div>
          <div className="grid-item">
            <img src={skillReact} alt="" />
          </div>
          <div className="grid-item">
            <img src={skillFigma} alt="" />
          </div>
          <div className="grid-item">
            <img src={skillGCP} alt="" />
          </div>
          <div className="grid-item">
            <img src={skillJava} alt="" />
          </div>
          <div className="grid-item">
            <img src={skillPython} alt="" />
          </div>
        </div>
      </div>
      <RepoDetails/>
      <Contact/>
    </>
  );
};
