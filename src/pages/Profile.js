import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { logout } from '../redux/slices/authSlice';
import { STATUS } from '../utils';
import MembershipCard from '../components/MembershipCard';
import './Profile.css';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user?.uid) {
        navigate('/join');
        return;
      }

      try {
        const docRef = doc(db, 'memberships', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log('No profile found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Helper function to get education label
  const getEducationLabel = (value) => {
    const educationMap = {
      'below_ssc': t('join.form.educationOptions.belowSSC'),
      'ssc': t('join.form.educationOptions.ssc'),
      'hsc': t('join.form.educationOptions.hsc'),
      'bachelor': t('join.form.educationOptions.bachelor'),
      'masters': t('join.form.educationOptions.masters'),
      'postgrad': t('join.form.educationOptions.postgrad'),
      'phd': t('join.form.educationOptions.phd'),
      'other': t('join.form.educationOptions.other')
    };
    return educationMap[value] || value;
  };

  // Helper function to get gender label
  const getGenderLabel = (value) => {
    const genderMap = {
      'male': t('join.form.male'),
      'female': t('join.form.female'),
      'other': t('join.form.other')
    };
    return genderMap[value] || value;
  };

  // Helper function to get political label
  const getPoliticalLabel = (x, y, t) => {
    if (x > 0.3) {
      if (y > 0.3) return t('personalityTest.compass.labels.authRight');
      if (y < -0.3) return t('personalityTest.compass.labels.libRight');
      return t('personalityTest.compass.labels.right');
    }
    if (x < -0.3) {
      if (y > 0.3) return t('personalityTest.compass.labels.authLeft');
      if (y < -0.3) return t('personalityTest.compass.labels.libLeft');
      return t('personalityTest.compass.labels.left');
    }
    if (y > 0.3) return t('personalityTest.compass.labels.authoritarian');
    if (y < -0.3) return t('personalityTest.compass.labels.libertarian');
    return t('personalityTest.compass.labels.centrist');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case STATUS.APPROVED:
        return <Badge bg="success">{t('profile.status.approved') || 'Approved'}</Badge>;
      case STATUS.REJECTED:
        return <Badge bg="danger">{t('profile.status.rejected') || 'Rejected'}</Badge>;
      case STATUS.PENDING:
      default:
        return <Badge bg="warning" text="dark">{t('profile.status.pending') || 'Pending Review'}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <Spinner animation="border" variant="primary" />
          <p>{t('profile.loading') || 'Loading your profile...'}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-page">
        <Container className="text-center py-5">
          <h2>{t('profile.notFound') || 'Profile not found'}</h2>
          <Button variant="primary" onClick={() => navigate('/join')}>
            {t('profile.joinNow') || 'Join Now'}
          </Button>
        </Container>
      </div>
    );
  }

  // Prepare formData for MembershipCard (after null checks)
  const cardFormData = {
    name: profileData.name,
    age: profileData.age,
    gender: profileData.gender,
    photo: null, // Will use photoURL instead
    photoURL: profileData.photoURL,
    profession: profileData.profession,
    education: profileData.education,
    email: profileData.email,
    phone: profileData.phone,
    politicalActivity: profileData.politicalActivity,
    about: profileData.about,
    youthWing: profileData.youthWing
  };

  // Compass position from profile data
  const compassPosition = profileData.compassPosition || { x: 0, y: 0 };

  return (
    <div className="profile-page">
      {/* Profile Content - Two Column Layout */}
      <section className="profile-content-section">
        <Container fluid className="px-4">
          <Row>
            {/* Left Column - Notices, Discussions, Events (66%) */}
            <Col lg={8} md={12} className="mb-4">
              <Card className="profile-section-card">
                <Card.Header className="profile-section-header">
                  <Tabs defaultActiveKey="notices" id="profile-tabs" className="mb-0 profile-tabs-theme">
                    <Tab eventKey="notices" title={<span><i className="bi bi-megaphone me-2"></i>{t('profile.notices.title') || 'Notices'}</span>} />
                    <Tab eventKey="discussions" title={<span><i className="bi bi-chat-dots me-2"></i>{t('profile.discussions.title') || 'Discussions'}</span>} />
                    <Tab eventKey="events" title={<span><i className="bi bi-calendar-event me-2"></i>{t('profile.events.title') || 'Events'}</span>} />
                  </Tabs>
                </Card.Header>
                <Card.Body style={{ minHeight: 320 }}>
                  <Tabs defaultActiveKey="notices" id="profile-content-tabs" className="d-none">
                    <Tab eventKey="notices">
                      <div className="notice-item">
                        <div className="notice-badge">
                          <Badge bg="danger">{t('profile.notices.important') || 'Important'}</Badge>
                        </div>
                        <h6>{t('profile.notices.sample1.title') || 'Welcome to AJD NGANJ'}</h6>
                        <p className="text-muted small mb-1">
                          {t('profile.notices.sample1.content') || 'Thank you for joining our movement. Please complete your profile verification.'}
                        </p>
                        <small className="text-muted">Jan 18, 2026</small>
                      </div>
                      <hr />
                      <div className="notice-item">
                        <div className="notice-badge">
                          <Badge bg="info">{t('profile.notices.update') || 'Update'}</Badge>
                        </div>
                        <h6>{t('profile.notices.sample2.title') || 'Membership Guidelines Updated'}</h6>
                        <p className="text-muted small mb-1">
                          {t('profile.notices.sample2.content') || 'New guidelines have been published for all members. Please review.'}
                        </p>
                        <small className="text-muted">Jan 15, 2026</small>
                      </div>
                    </Tab>
                    <Tab eventKey="discussions">
                      <div className="discussion-item">
                        <div className="d-flex align-items-start gap-3">
                          <div className="discussion-avatar">
                            <i className="bi bi-person-circle"></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <strong>{t('profile.discussions.sample1.author') || 'Community Team'}</strong>
                              <small className="text-muted">2 hours ago</small>
                            </div>
                            <p className="mb-2">
                              {t('profile.discussions.sample1.content') || 'What initiatives would you like to see in your local area? Share your thoughts!'}
                            </p>
                            <div className="discussion-actions">
                              <Button variant="link" size="sm" className="p-0 me-3">
                                <i className="bi bi-hand-thumbs-up me-1"></i> 12
                              </Button>
                              <Button variant="link" size="sm" className="p-0">
                                <i className="bi bi-reply me-1"></i> {t('profile.discussions.reply') || 'Reply'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="text-center">
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-plus-circle me-2"></i>
                          {t('profile.discussions.startNew') || 'Start New Discussion'}
                        </Button>
                      </div>
                    </Tab>
                    <Tab eventKey="events">
                      <div className="event-item d-flex gap-3 mb-3">
                        <div className="event-date-box">
                          <span className="event-day">25</span>
                          <span className="event-month">Jan</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{t('profile.events.sample1.title') || 'Town Hall Meeting'}</h6>
                          <p className="text-muted small mb-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            {t('profile.events.sample1.location') || 'Narayanganj Community Center'}
                          </p>
                          <p className="text-muted small mb-0">
                            <i className="bi bi-clock me-1"></i>
                            {t('profile.events.sample1.time') || '10:00 AM - 2:00 PM'}
                          </p>
                        </div>
                        <Button variant="outline-primary" size="sm" className="align-self-center">
                          {t('profile.events.rsvp') || 'RSVP'}
                        </Button>
                      </div>
                      <hr />
                      <div className="event-item d-flex gap-3">
                        <div className="event-date-box">
                          <span className="event-day">02</span>
                          <span className="event-month">Feb</span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{t('profile.events.sample2.title') || 'Youth Wing Workshop'}</h6>
                          <p className="text-muted small mb-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            {t('profile.events.sample2.location') || 'Virtual Event'}
                          </p>
                          <p className="text-muted small mb-0">
                            <i className="bi bi-clock me-1"></i>
                            {t('profile.events.sample2.time') || '3:00 PM - 5:00 PM'}
                          </p>
                        </div>
                        <Button variant="outline-primary" size="sm" className="align-self-center">
                          {t('profile.events.rsvp') || 'RSVP'}
                        </Button>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column - ID Card (33%) */}
            <Col lg={4} md={12}>
              <div className="profile-sidebar sticky-top" style={{ top: '100px' }}>
                {/* Membership Status Badge */}
                <div className="text-center mb-3">
                  <span className="me-2">{t('profile.membershipStatus') || 'Membership Status'}:</span>
                  {getStatusBadge(profileData.status)}
                </div>

                {/* Membership Card */}
                <MembershipCard
                  formData={cardFormData}
                  compassPosition={compassPosition}
                  getGenderLabel={getGenderLabel}
                  getEducationLabel={getEducationLabel}
                  getPoliticalLabel={getPoliticalLabel}
                  t={t}
                  showActions={true}
                  onEdit={() => navigate('/join')}
                  userId={user?.uid}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Profile;
