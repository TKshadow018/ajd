import React from 'react';
import Home from './Home';
import About from './About';
import Join from './Join';
import Login from './Login';
import Profile from './Profile';
import Vote from './Vote';
import Dashboard from './Dashboard';
import Candidates from './Candidates';
import Footprint from './Footprint';
import OurActivity from './OurActivity';
import Tarek from './Tarek';
import CustomNavbar from '../components/Navbar';

const getPageComponent = (page) => {
  switch (page) {
    case 'home':
      return <Home />; 
    case 'about':
      return <About />;
    case 'join':
      return <Join />;
    case 'login':
      return <Login />;
    case 'profile':
      return <Profile />;
    case 'vote':
      return <Vote />;  
    case 'dashboard':
      return <Dashboard />;
    case 'candidates':
      return <Candidates />;
    case 'footprint':
      return <Footprint />;
    case 'activity':
      return <OurActivity />;
    case 'tarek':
      return <Tarek />;
    default:
      return <Home />;
  }
};

const MainContainer = (props) => {
  return (
    <div className='d-flex flex-column flex-grow-1'>
      <CustomNavbar />
      {getPageComponent(props.page)}
    </div>
  );
};

export default MainContainer;