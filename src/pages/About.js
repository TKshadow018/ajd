import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaUsers, 
  FaBook, 
  FaBullhorn, 
  FaFistRaised, 
  FaTruck, 
  FaFileAlt, 
  FaGraduationCap, 
  FaBriefcase, 
  FaLeaf, 
  FaBalanceScale,
  FaShieldAlt,
  FaHeartbeat,
  FaBan,
  FaHeart,
  FaDove
} from 'react-icons/fa';
import { GiButterfly } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '../hooks';
import './About.css';

// Section IDs for scroll spy
const SECTION_IDS = ['timeline', 'principles', 'pillars', 'leadership'];

const About = () => {
  const { t } = useTranslation();
  const { activeSection, scrollToSection } = useScrollSpy(SECTION_IDS);
  const [showInfographic, setShowInfographic] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  
  // Auto-advance timeline every 5 seconds on mobile, 30 seconds on desktop
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const interval = setInterval(() => {
      setCurrentTimelineIndex((prevIndex) => (prevIndex + 1) % 8);
    }, isMobile ? 10000 : 30000);
    
    const handleResize = () => {
      // Clear and reset interval on resize
      clearInterval(interval);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const timeline = [
    {
      year: t('about.timeline.event1.year'),
      title: t('about.timeline.event1.title'),
      description: t('about.timeline.event1.description'),
      icon: FaUsers,
      color: '#3498db',
      backgroundImage: '/timeline/event1-bg.jpg',
      foregroundImage: '/timeline/event1-fg.jpg'
    },
    {
      year: t('about.timeline.event2.year'),
      title: t('about.timeline.event2.title'),
      description: t('about.timeline.event2.description'),
      icon: FaBook,
      color: '#16a085',
      backgroundImage: '/timeline/event2-bg.jpg',
      foregroundImage: '/timeline/event2-fg.png'
    },
    {
      year: t('about.timeline.event3.year'),
      title: t('about.timeline.event3.title'),
      description: t('about.timeline.event3.description'),
      icon: FaBullhorn,
      color: '#e67e22',
      backgroundImage: '/timeline/event3-bg.jpg',
      foregroundImage: '/timeline/event3-fg.jpg'
    },
    {
      year: t('about.timeline.event4.year'),
      title: t('about.timeline.event4.title'),
      description: t('about.timeline.event4.description'),
      icon: FaFistRaised,
      color: '#e74c3c',
      backgroundImage: '/timeline/event4-bg.jpg',
      foregroundImage: '/timeline/event4-fg.jpg'
    },
    {
      year: t('about.timeline.event5.year'),
      title: t('about.timeline.event5.title'),
      description: t('about.timeline.event5.description'),
      icon: FaDove,
      color: '#9b59b6',
      backgroundImage: '/timeline/event5-bg.jpg',
      foregroundImage: '/timeline/event5-fg.jpg'
    },
    {
      year: t('about.timeline.event6.year'),
      title: t('about.timeline.event6.title'),
      description: t('about.timeline.event6.description'),
      icon: FaFileAlt,
      color: '#f39c12',
      backgroundImage: '/timeline/event6-bg.jpg',
      foregroundImage: '/timeline/event6-fg.jpg'
    },
    {
      year: t('about.timeline.event7.year'),
      title: t('about.timeline.event7.title'),
      description: t('about.timeline.event7.description'),
      icon: GiButterfly,
      color: '#9b59b6',
      backgroundImage: '/timeline/event7-bg.jpg',
      foregroundImage: '/timeline/event7-fg.jpg'
    }
  ];

  const pillars = [
    {
      icon: FaShieldAlt,
      title: t('manifesto.pillars.education.title'),
      color: '#1a5490',
      points: [
        t('manifesto.pillars.education.point1'),
        t('manifesto.pillars.education.point2'),
        t('manifesto.pillars.education.point3'),
        t('manifesto.pillars.education.point4'),
        t('manifesto.pillars.education.point5')
      ]
    },
    {
      icon: FaLeaf,
      title: t('manifesto.pillars.economy.title'),
      color: '#28a745',
      points: [
        t('manifesto.pillars.economy.point1'),
        t('manifesto.pillars.economy.point2'),
        t('manifesto.pillars.economy.point3'),
        t('manifesto.pillars.economy.point4'),
        t('manifesto.pillars.economy.point5')
      ]
    },
    {
      icon: FaBriefcase,
      title: t('manifesto.pillars.healthcare.title'),
      color: '#2d7ab8',
      points: [
        t('manifesto.pillars.healthcare.point1'),
        t('manifesto.pillars.healthcare.point2'),
        t('manifesto.pillars.healthcare.point3'),
        t('manifesto.pillars.healthcare.point4'),
        t('manifesto.pillars.healthcare.point5')
      ]
    },
    {
      icon: FaFistRaised,
      title: t('manifesto.pillars.environment.title'),
      color: '#ffd700',
      points: [
        t('manifesto.pillars.environment.point1'),
        t('manifesto.pillars.environment.point2'),
        t('manifesto.pillars.environment.point3'),
        t('manifesto.pillars.environment.point4'),
        t('manifesto.pillars.environment.point5')
      ]
    },
    {
      icon: FaGraduationCap,
      title: t('manifesto.pillars.justice.title'),
      color: '#dc3545',
      points: [
        t('manifesto.pillars.justice.point1'),
        t('manifesto.pillars.justice.point2'),
        t('manifesto.pillars.justice.point3'),
        t('manifesto.pillars.justice.point4'),
        t('manifesto.pillars.justice.point5')
      ]
    },
    {
      icon: FaBalanceScale,
      title: t('manifesto.pillars.security.title'),
      color: '#6c757d',
      points: [
        t('manifesto.pillars.security.point1'),
        t('manifesto.pillars.security.point2'),
        t('manifesto.pillars.security.point3'),
        t('manifesto.pillars.security.point4'),
        t('manifesto.pillars.security.point5')
      ]
    },
    {
      icon: FaUsers,
      title: t('manifesto.pillars.gender.title'),
      color: '#e91e63',
      points: [
        t('manifesto.pillars.gender.point1'),
        t('manifesto.pillars.gender.point2'),
        t('manifesto.pillars.gender.point3'),
        t('manifesto.pillars.gender.point4'),
        t('manifesto.pillars.gender.point5')
      ]
    },
    {
      icon: FaShieldAlt,
      title: t('manifesto.pillars.defense.title'),
      color: '#343a40',
      points: [
        t('manifesto.pillars.defense.point1'),
        t('manifesto.pillars.defense.point2'),
        t('manifesto.pillars.defense.point3'),
        t('manifesto.pillars.defense.point4'),
        t('manifesto.pillars.defense.point5')
      ]
    },
    {
      icon: FaHeartbeat,
      title: t('manifesto.pillars.health.title'),
      color: '#00bcd4',
      points: [
        t('manifesto.pillars.health.point1'),
        t('manifesto.pillars.health.point2'),
        t('manifesto.pillars.health.point3'),
        t('manifesto.pillars.health.point4'),
        t('manifesto.pillars.health.point5')
      ]
    },
    {
      icon: FaBan,
      title: t('manifesto.pillars.anticorruption.title'),
      color: '#ff5722',
      points: [
        t('manifesto.pillars.anticorruption.point1'),
        t('manifesto.pillars.anticorruption.point2'),
        t('manifesto.pillars.anticorruption.point3'),
        t('manifesto.pillars.anticorruption.point4'),
        t('manifesto.pillars.anticorruption.point5')
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* Side Navigation Panel */}
      <div className="side-nav-panel">
        <nav className="side-nav">
          <button 
            className={`side-nav-item ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => scrollToSection('timeline')}
          >
            <span className="side-nav-dot"></span>
            <span className="side-nav-label">{t('about.navigation.timeline')}</span>
          </button>
          <button 
            className={`side-nav-item ${activeSection === 'principles' ? 'active' : ''}`}
            onClick={() => scrollToSection('principles')}
          >
            <span className="side-nav-dot"></span>
            <span className="side-nav-label">{t('about.navigation.principles')}</span>
          </button>
          <button 
            className={`side-nav-item ${activeSection === 'pillars' ? 'active' : ''}`}
            onClick={() => scrollToSection('pillars')}
          >
            <span className="side-nav-dot"></span>
            <span className="side-nav-label">{t('about.navigation.pillars')}</span>
          </button>
          <button 
            className={`side-nav-item ${activeSection === 'leadership' ? 'active' : ''}`}
            onClick={() => scrollToSection('leadership')}
          >
            <span className="side-nav-dot"></span>
            <span className="side-nav-label">{t('about.navigation.leadership')}</span>
          </button>
        </nav>
      </div>

      {/* Timeline Section */}
      <section id='timeline' className="timeline-section py-5">
        <Container fluid>
          <h2 className="section-title text-center mb-5">{t('about.timeline.title')}</h2>

          {/* Interactive Timeline Slider */}
          <div className="timeline-slider-container">
            {/* Background Image */}
            <div 
              className="timeline-slider-background"
              style={{
                backgroundImage: `url(${timeline[currentTimelineIndex].backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay */}
              <div className="timeline-slider-overlay"></div>
            </div>

            {/* Main Content Area */}
            <div className="timeline-slider-content">
              <div className="timeline-slider-inner">
                {/* Content Section */}
                <div className={`timeline-slider-info ${currentTimelineIndex % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-slider-year">{timeline[currentTimelineIndex].year}</div>
                  <h3 className="timeline-slider-title">{timeline[currentTimelineIndex].title}</h3>
                  <p className="timeline-slider-description">{timeline[currentTimelineIndex].description}</p>
                </div>

                {/* Foreground Image */}
                <div className={`timeline-slider-foreground ${currentTimelineIndex % 2 === 0 ? 'right' : 'left'}`}>
                  <img 
                    src={timeline[currentTimelineIndex].foregroundImage}
                    alt={timeline[currentTimelineIndex].title}
                    className="timeline-foreground-image"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows - Mobile Only */}
            <button 
              className="timeline-slider-arrow timeline-slider-arrow-left"
              onClick={() => setCurrentTimelineIndex(prev => prev === 0 ? timeline.length - 1 : prev - 1)}
              aria-label="Previous timeline event"
            >
              ‹
            </button>
            <button 
              className="timeline-slider-arrow timeline-slider-arrow-right"
              onClick={() => setCurrentTimelineIndex(prev => prev === timeline.length - 1 ? 0 : prev + 1)}
              aria-label="Next timeline event"
            >
              ›
            </button>

            {/* Timeline Years at Bottom */}
            <div className="timeline-slider-years">
              <div className="timeline-years-scroll">
                {timeline.map((item, index) => (
                  <button
                    key={index}
                    className={`timeline-year-button ${currentTimelineIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentTimelineIndex(index)}
                  >
                    <span className="timeline-year-text">{item.year}</span>
                    {currentTimelineIndex === index && (
                      <div className="timeline-year-indicator"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Infographic Image */}
          <div className="text-center mb-4 mt-5">
            <button 
              className="btn btn-primary infographic-btn"
              onClick={() => setShowInfographic(!showInfographic)}
            >
              {showInfographic ? t('about.timeline.hideInfographic') : t('about.timeline.showInfographic')}
            </button>
          </div>
          {showInfographic && (
              <div className="infographic-image"></div>
          )}
          
        </Container>
      </section>

      {/* Core Principles */}
      <section id="principles" className="principles-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">{t('manifesto.principles.title')}</h2>
          <p className="text-center mb-5 intro-text">
            {t('manifesto.principles.subtitle')}
          </p>
          <Row>
            <Col md={4} className="mb-4">
              <div className="value-card">
                <FaShieldAlt className="value-icon" />
                <h4 className="value-title">{t('manifesto.principles.sovereignty.title')}</h4>
                <p className="value-text">
                  {t('manifesto.principles.sovereignty.description')}
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="value-card">
                <FaHeart className="value-icon" />
                <h4 className="value-title">{t('manifesto.principles.selfReliance.title')}</h4>
                <p className="value-text">
                  {t('manifesto.principles.selfReliance.description')}
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="value-card">
                <FaBalanceScale className="value-icon" />
                <h4 className="value-title">{t('manifesto.principles.goodGovernance.title')}</h4>
                <p className="value-text">
                  {t('manifesto.principles.goodGovernance.description')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Pillars */}
      <section id="pillars" className="pillars-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">{t('manifesto.pillars.title')}</h2>
          <Row>
            {pillars.map((pillar, index) => (
              <Col lg={6} md={6} sm={12} className="mb-4" key={index}>
                <Card className="pillar-card">
                  <Card.Body>
                    <div className="pillar-icon-wrapper" style={{ backgroundColor: `${pillar.color}20` }}>
                      <pillar.icon className="pillar-icon" style={{ color: pillar.color }} />
                    </div>
                    <h3 className="pillar-title" style={{ color: pillar.color }}>{pillar.title}</h3>
                    <ul className="pillar-points">
                      {pillar.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="leadership-section">
        <Container>
          <h2 className="section-title text-center mb-5">{t('about.leadership.title')}</h2>
          {/* Central Leadership */}
          <h3 className="subsection-title mb-4 text-center">{t('about.leadership.centralTitle')}</h3>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.leader1.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.leader1.image')} 
                    alt={t('about.leadership.leader1.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.leader1.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.leader1.name')}</h4>
                  <p className="leader-position">{t('about.leadership.leader1.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.leader1.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.leader2.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.leader2.image')} 
                    alt={t('about.leadership.leader2.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.leader2.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.leader2.name')}</h4>
                  <p className="leader-position">{t('about.leadership.leader2.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.leader2.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.leader3.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.leader3.image')} 
                    alt={t('about.leadership.leader3.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.leader3.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.leader3.name')}</h4>
                  <p className="leader-position">{t('about.leadership.leader3.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.leader3.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Narayanganj Leadership */}
          <h3 className="subsection-title mt-5 mb-4 text-center">{t('about.leadership.narayanganjTitle')}</h3>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.narayanganj.leader1.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.narayanganj.leader1.image')} 
                    alt={t('about.leadership.narayanganj.leader1.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.narayanganj.leader1.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.narayanganj.leader1.name')}</h4>
                  <p className="leader-position">{t('about.leadership.narayanganj.leader1.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.narayanganj.leader1.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.narayanganj.leader2.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.narayanganj.leader2.image')} 
                    alt={t('about.leadership.narayanganj.leader2.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.narayanganj.leader2.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.narayanganj.leader2.name')}</h4>
                  <p className="leader-position">{t('about.leadership.narayanganj.leader2.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.narayanganj.leader2.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="leader-card">
                {t('about.leadership.narayanganj.leader3.image') ? (
                  <Card.Img 
                    variant="top" 
                    src={t('about.leadership.narayanganj.leader3.image')} 
                    alt={t('about.leadership.narayanganj.leader3.name')}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="leader-image-placeholder">
                    <div className="leader-placeholder-content">{t('about.leadership.narayanganj.leader3.name')}</div>
                  </div>
                )}
                <Card.Body className="text-center">
                  <h4 className="leader-name">{t('about.leadership.narayanganj.leader3.name')}</h4>
                  <p className="leader-position">{t('about.leadership.narayanganj.leader3.position')}</p>
                  <p className="leader-bio">
                    {t('about.leadership.narayanganj.leader3.bio')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default About;
