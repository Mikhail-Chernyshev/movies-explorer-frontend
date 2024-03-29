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

export default function Main({
  loggedIn,
  width,
  breakpointTable,
  openMenu,
  breakpointMobile,
}) {
  return (
    <div className='page__wrapper'>
      <Header
        openMenu={openMenu}
        width={width}
        breakpointTable={breakpointTable}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
