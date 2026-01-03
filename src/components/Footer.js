import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="custom-footer">
      <Container>
        <Row className="py-5">
          <Col lg={4} md={6} className="mb-4">
            <h3 className="footer-title">{t('nav.brand')}</h3>
            <p className="footer-tagline">{t('footer.tagline')}</p>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="social-links">
              <a href="#facebook" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#instagram" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#youtube" className="social-icon" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="footer-heading">{t('footer.quickLinks')}</h5>
            <ul className="footer-links">
              <li><a href="/">{t('footer.home')}</a></li>
              <li><a href="/about">{t('footer.about')}</a></li>
              <li><a href="/manifesto">{t('footer.manifesto')}</a></li>
              <li><a href="#news">{t('footer.news')}</a></li>
              <li><a href="#events">{t('footer.events')}</a></li>
              <li><a href="#contact">{t('footer.contact')}</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5 className="footer-heading">{t('footer.getInvolved')}</h5>
            <ul className="footer-links">
              <li><a href="#volunteer">{t('footer.volunteer')}</a></li>
              <li><a href="#donate">{t('footer.donate')}</a></li>
              <li><a href="#membership">{t('footer.membership')}</a></li>
              <li><a href="#campaigns">{t('footer.campaigns')}</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="footer-heading">{t('footer.contactUs')}</h5>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>{t('footer.address')}</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>{t('footer.phone')}</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>{t('footer.email')}</span>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="footer-bottom">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p>&copy; {currentYear} {t('nav.brand')}. {t('footer.rights')}</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#privacy" className="footer-link">{t('footer.privacy')}</a>
            <span className="mx-2">|</span>
            <a href="#terms" className="footer-link">{t('footer.terms')}</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
