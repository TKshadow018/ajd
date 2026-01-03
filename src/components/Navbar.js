import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname === path;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setExpanded(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'local', name: 'নারায়ণগঞ্জ', flag: '🏠' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

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
            
            <Dropdown className="language-dropdown ms-lg-2">
              <Dropdown.Toggle variant="outline-light" className="language-toggle">
                <FaGlobe className="me-2" />
                <span className="lang-flag">{currentLanguage.flag}</span>
                <span className="lang-name d-none d-md-inline ms-2">{currentLanguage.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="language-menu">
                {languages.map((lang) => (
                  <Dropdown.Item
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    active={i18n.language === lang.code}
                    className="language-item"
                  >
                    <span className="lang-flag-menu">{lang.flag}</span>
                    <span className="lang-name-menu">{lang.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              as={Link}
              to="/join"
              variant="primary"
              className="join-btn ms-lg-3"
              onClick={() => setExpanded(false)}
            >
              {t('nav.joinUs')}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
