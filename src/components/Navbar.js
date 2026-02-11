import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { logout } from '../redux/slices/authSlice';
import { LANGUAGES } from '../utils';
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setExpanded(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setExpanded(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[1];

  return (
    <Navbar expanded={expanded} expand="lg" className="custom-navbar --cursor-color-1" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <img 
            src="./logo/butterfly2.png" 
            alt="Amjonatar Dal Logo" 
            className="brand-butterfly-icon"
            width="40"
            height="40"
          />
          <div className="brand-text-container">
            <span className="brand-text">{t('nav.brand')}</span>
            <span className="brand-tagline">{t('nav.tagline')}</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="custom-toggler"
        >
          {expanded ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className={isActive('/') ? 'active' : ''}
              onClick={() => setExpanded(false)}
            >
              {t('nav.home')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={isActive('/about') ? 'active' : ''}
              onClick={() => setExpanded(false)}
            >
              {t('nav.about')}
            </Nav.Link>
            {/* <Nav.Link
              as={Link}
              to="/vote"
              className={isActive('/vote') ? 'active' : ''}
              onClick={() => setExpanded(false)}
            >
              {t('nav.vote') || 'ভোট দিন'}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={isActive('/dashboard') ? 'active' : ''}
              onClick={() => setExpanded(false)}
            >
              {t('nav.dashboard') || 'পরিসংখ্যান'}
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/candidates"
              className={isActive('/candidates') ? 'active' : ''}
              onClick={() => setExpanded(false)}
            >
              {t('nav.candidates') || 'Candidates'}
            </Nav.Link>
            
            <Dropdown className="language-dropdown ms-lg-2">
              <Dropdown.Toggle variant="outline-light" className="language-toggle">
                <FaGlobe className="me-2" />
                <span className="lang-flag">{currentLanguage.flag}</span>
                <span className="lang-name d-none d-md-inline ms-2">{currentLanguage.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="language-menu">
                {LANGUAGES.map((lang) => (
                  <Dropdown.Item
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    active={i18n.language === lang.code}
                    className="language-item"
                  >
                    <span className="lang-name-menu">{lang.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to="/profile"
                  variant="success"
                  className="join-btn ms-lg-3"
                  onClick={() => setExpanded(false)}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {t('nav.myProfile') || 'My Profile'}
                </Button>
                <Button
                  variant="outline-danger"
                  className="logout-btn ms-lg-2"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="primary"
                className="join-btn ms-lg-3"
                onClick={() => setExpanded(false)}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                {t('nav.login') || 'Login'}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
