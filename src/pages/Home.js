import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaArrowRight, FaUsers, FaHandshake, FaChartLine } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={8} className="text-white">
              <h1 className="hero-title animate-fade-in">
                {t('home.hero.title')}
              </h1>
              <h2 className="hero-subtitle animate-fade-in-delay">
                {t('home.hero.subtitle')}
              </h2>
              <p className="hero-description animate-fade-in-delay-2">
                {t('home.hero.description')}
              </p>
              <div className="hero-buttons animate-fade-in-delay-3">
                <Button variant="warning" size="lg" className="me-3 hero-btn-primary">
                  {t('home.hero.joinMovement')} <FaArrowRight className="ms-2" />
                </Button>
                <Button variant="outline-light" size="lg" className="hero-btn-secondary">
                  {t('home.hero.learnMore')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="stat-card">
                <FaUsers className="stat-icon" />
                <h3 className="stat-number">50,000+</h3>
                <p className="stat-label">{t('home.stats.members')}</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="stat-card">
                <FaHandshake className="stat-icon" />
                <h3 className="stat-number">200+</h3>
                <p className="stat-label">{t('home.stats.projects')}</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="stat-card">
                <FaChartLine className="stat-icon" />
                <h3 className="stat-number">85%</h3>
                <p className="stat-label">{t('home.stats.approval')}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4">
              <h2 className="section-title">{t('home.vision.title')}</h2>
              <p className="section-description">
                {t('home.vision.description')}
              </p>
              <ul className="vision-list">
                <li>{t('home.vision.point1')}</li>
                <li>{t('home.vision.point2')}</li>
                <li>{t('home.vision.point3')}</li>
                <li>{t('home.vision.point4')}</li>
                <li>{t('home.vision.point5')}</li>
              </ul>
              <Button variant="primary" size="lg" className="mt-3">
                {t('home.vision.readVision')}
              </Button>
            </Col>
            <Col lg={6}>
              <div className="vision-image-placeholder">
                <div className="placeholder-content">
                  <h3>Vision Image</h3>
                  <p>Add your inspiring political imagery here</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest Updates */}
      <section className="updates-section">
        <Container>
          <h2 className="section-title text-center mb-5">{t('home.updates.title')}</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="update-card">
                <Card.Body>
                  <div className="update-date">{t('home.updates.date1')}</div>
                  <Card.Title>{t('home.updates.title1')}</Card.Title>
                  <Card.Text>
                    {t('home.updates.desc1')}
                  </Card.Text>
                  <Button variant="link" className="p-0">{t('home.updates.readMore')} <FaArrowRight /></Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="update-card">
                <Card.Body>
                  <div className="update-date">{t('home.updates.date2')}</div>
                  <Card.Title>{t('home.updates.title2')}</Card.Title>
                  <Card.Text>
                    {t('home.updates.desc2')}
                  </Card.Text>
                  <Button variant="link" className="p-0">{t('home.updates.readMore')} <FaArrowRight /></Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="update-card">
                <Card.Body>
                  <div className="update-date">{t('home.updates.date3')}</div>
                  <Card.Title>{t('home.updates.title3')}</Card.Title>
                  <Card.Text>
                    {t('home.updates.desc3')}
                  </Card.Text>
                  <Button variant="link" className="p-0">{t('home.updates.readMore')} <FaArrowRight /></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="cta-title">{t('home.cta.title')}</h2>
              <p className="cta-description">
                {t('home.cta.description')}
              </p>
              <Button variant="warning" size="lg" className="cta-btn">
                {t('home.cta.button')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
