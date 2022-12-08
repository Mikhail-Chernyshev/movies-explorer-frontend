import React from 'react';
import Header from '../Header/Header';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import NavTab from '../NavTab/NavTab';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';
import './Main.css';
import Preloader from '../Preloader/Preloader';

export default function Main({ loggedIn }) {
  return (
    <div className='main'>
      <Header loggedIn={loggedIn} />
      {/* <Preloader/> */}
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
}
