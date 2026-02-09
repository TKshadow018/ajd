import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, Spinner, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { setUser } from '../redux/slices/authSlice';
import { validateMembershipForm, qualifiesForYouthWing, COLLECTIONS, STATUS } from '../utils';
import { FAMOUS_POLITICIANS } from '../data/politicians';
import MembershipCard from '../components/MembershipCard';
import './Join.css';

// Hostinger upload endpoint
const UPLOAD_ENDPOINT = 'https://bisque-bear-900175.hostingersite.com/api/upload.php';

// LocalStorage keys
const STORAGE_KEYS = {
  FORM_DATA: 'ajd_join_formData',
  PERSONALITY_ANSWERS: 'ajd_join_personalityAnswers',
  CURRENT_LAYER: 'ajd_join_currentLayer',
  SKIPPED_LAYERS: 'ajd_join_skippedLayers',
  SHOW_TEST: 'ajd_join_showTest',
  TEST_COMPLETED: 'ajd_join_testCompleted'
};

// Initial form data structure
const INITIAL_FORM_DATA = {
  name: '',
  age: '',
  gender: '',
  photo: null,
  profession: '',
  education: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  politicalActivity: '',
  about: '',
  agreePhilosophy: false,
  youthWing: false
};

// 5 layers with their question IDs
const LAYER_QUESTIONS = {
  layer1: ['q1', 'q2', 'q3', 'q4', 'q5'],     // Economic Systems
  layer2: ['q6', 'q7', 'q8', 'q9', 'q10'],    // Governance & Power
  layer3: ['q11', 'q12', 'q13', 'q14', 'q15'], // Social Values & Rights
  layer4: ['q16', 'q17', 'q18', 'q19', 'q20'], // Geopolitics & Structure
  layer5: []  // Personal Philosophy - to be added later
};

// Answer options for each question
const ANSWER_OPTIONS = ['a', 'b', 'c', 'd'];

/**
 * Political Compass Scoring System
 * X-axis: Economic Left (-) to Economic Right (+)
 * Y-axis: Libertarian (-) to Authoritarian (+)
 * 
 * Each answer affects both axes with specific weights
 */
/**
 * Calculate political compass position from answers using translation file values
 * @param {Object} answers - Object with questionId: answer format
 * @param {Function} t - Translation function from i18next
 * @returns {Object} { x: leftRight, y: libAuth } with values from -10 to +10
 */
const calculatePoliticalCompass = (answers, t) => {
  let totalLeftRight = 0;
  let totalLibAuth = 0;
  let answeredCount = 0;
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Get values from translation file
    const leftRight = t(`personalityTest.questions.${questionId}.options.${answer}.leftRight`, { returnObjects: true });
    const libAuth = t(`personalityTest.questions.${questionId}.options.${answer}.libAuth`, { returnObjects: true });
    
    // Only add if values are valid numbers
    if (typeof leftRight === 'number' && typeof libAuth === 'number') {
      totalLeftRight += leftRight;
      totalLibAuth += libAuth;
      answeredCount++;
    }
  });
  
  // Calculate average (values are already -10 to +10)
  const avgLeftRight = answeredCount > 0 ? totalLeftRight / answeredCount : 0;
  const avgLibAuth = answeredCount > 0 ? totalLibAuth / answeredCount : 0;
  
  // Clamp values between -10 and 10
  return {
    x: Math.max(-10, Math.min(10, avgLeftRight)),
    y: Math.max(-10, Math.min(10, avgLibAuth))
  };
};

/**
 * Get political ideology label based on compass position
 */
const getPoliticalLabel = (x, y, t) => {
  // Determine quadrant and intensity
  const isLeft = x < -2;
  const isRight = x > 2;
  const isAuth = y > 2;
  const isLib = y < -2;
  const isCenterX = x >= -2 && x <= 2;
  const isCenterY = y >= -2 && y <= 2;
  
  if (isCenterX && isCenterY) return t('personalityTest.compass.labels.centrist');
  
  if (isAuth) {
    if (isLeft) return t('personalityTest.compass.labels.authLeft');
    if (isRight) return t('personalityTest.compass.labels.authRight');
    return t('personalityTest.compass.labels.authoritarian');
  }
  
  if (isLib) {
    if (isLeft) return t('personalityTest.compass.labels.libLeft');
    if (isRight) return t('personalityTest.compass.labels.libRight');
    return t('personalityTest.compass.labels.libertarian');
  }
  
  if (isLeft) return t('personalityTest.compass.labels.left');
  if (isRight) return t('personalityTest.compass.labels.right');
  
  return t('personalityTest.compass.labels.moderate');
};

/**
 * Political Compass Visual Component
 */
// Filter options for compass
const COMPASS_FILTERS = {
  ALL: 'all',
  BANGLADESH: 'bangladesh',
  G7: 'g7',
  BRICS: 'brics',
  HISTORICAL: 'historical'
};

const PoliticalCompass = ({ position, t, isBengali, filter, onFilterChange }) => {
  // Convert -10 to +10 scale to 0-100% for positioning
  const dotX = ((position.x + 10) / 20) * 100;
  const dotY = ((10 - position.y) / 20) * 100; // Invert Y because CSS Y increases downward
  
  // Convert politician positions to percentages
  const getPoliticianPosition = (pol) => ({
    ...pol,
    left: ((pol.x + 10) / 20) * 100,
    top: ((10 - pol.y) / 20) * 100
  });
  
  // Filter politicians based on selected filter
  const getFilteredPoliticians = () => {
    switch (filter) {
      case COMPASS_FILTERS.BANGLADESH:
        return FAMOUS_POLITICIANS.filter(p => p.countryName === 'Bangladesh');
      case COMPASS_FILTERS.G7:
        return FAMOUS_POLITICIANS.filter(p => 
          ['USA', 'France', 'UK', 'Germany', 'Italy', 'Canada', 'Japan'].includes(p.countryName)
        );
      case COMPASS_FILTERS.BRICS:
        return FAMOUS_POLITICIANS.filter(p => 
          ['Russia', 'China', 'India', 'Brazil', 'South Africa', 'Egypt', 'Ethiopia', 'Iran', 'UAE'].includes(p.countryName)
        );
      case COMPASS_FILTERS.HISTORICAL:
        return FAMOUS_POLITICIANS.filter(p => 
          ['Stalin', 'Mao', 'Lenin', 'Castro', 'Che Guevara', 'Gandhi', 'Mandela', 'Thatcher', 'Reagan', 'Obama', 'Merkel'].includes(p.name)
        );
      default:
        return FAMOUS_POLITICIANS;
    }
  };
  
  const filteredPoliticians = getFilteredPoliticians();
  
  return (
    <div className="political-compass-container">
      <h4 className="text-center mb-3">{t('personalityTest.compass.title')}</h4>
      
      {/* Filter buttons */}
      <div className="compass-filter-buttons mb-3">
        <Button
          size="sm"
          variant={filter === COMPASS_FILTERS.ALL ? 'primary' : 'outline-primary'}
          onClick={() => onFilterChange(COMPASS_FILTERS.ALL)}
          className="me-1 mb-1"
        >
          🌍 {isBengali ? 'সবাই' : 'All'}
        </Button>
        <Button
          size="sm"
          variant={filter === COMPASS_FILTERS.BANGLADESH ? 'success' : 'outline-success'}
          onClick={() => onFilterChange(COMPASS_FILTERS.BANGLADESH)}
          className="me-1 mb-1"
        >
          🇧🇩 {isBengali ? 'বাংলাদেশ' : 'Bangladesh'}
        </Button>
        <Button
          size="sm"
          variant={filter === COMPASS_FILTERS.G7 ? 'info' : 'outline-info'}
          onClick={() => onFilterChange(COMPASS_FILTERS.G7)}
          className="me-1 mb-1"
        >
          🏛️ G7
        </Button>
        <Button
          size="sm"
          variant={filter === COMPASS_FILTERS.BRICS ? 'warning' : 'outline-warning'}
          onClick={() => onFilterChange(COMPASS_FILTERS.BRICS)}
          className="me-1 mb-1"
        >
          🌐 BRICS
        </Button>
        <Button
          size="sm"
          variant={filter === COMPASS_FILTERS.HISTORICAL ? 'secondary' : 'outline-secondary'}
          onClick={() => onFilterChange(COMPASS_FILTERS.HISTORICAL)}
          className="me-1 mb-1"
        >
          📜 {isBengali ? 'ঐতিহাসিক' : 'Historical'}
        </Button>
      </div>
      
      <div className="political-compass compass-large">
        {/* Quadrant colors */}
        <div className="compass-quadrant auth-left"></div>
        <div className="compass-quadrant auth-right"></div>
        <div className="compass-quadrant lib-left"></div>
        <div className="compass-quadrant lib-right"></div>
        
        {/* Grid lines */}
        <div className="compass-grid"></div>
        
        {/* Famous politicians */}
        {filteredPoliticians.map((pol, index) => {
          const pos = getPoliticianPosition(pol);
          const displayName = isBengali ? pol.nameBn : pol.name;
          const displayCountry = isBengali ? pol.countryNameBn : pol.countryName;
          return (
            <div
              key={index}
              className="compass-politician"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`
              }}
              title={`${displayName} (${displayCountry}) ${pol.country}`}
            >
              <span className="politician-label">{displayName}</span>
            </div>
          );
        })}
        
        {/* Axis labels */}
        <div className="compass-label top">{t('personalityTest.compass.authoritarian')}</div>
        <div className="compass-label bottom">{t('personalityTest.compass.libertarian')}</div>
        <div className="compass-label left">{t('personalityTest.compass.left')}</div>
        <div className="compass-label right">{t('personalityTest.compass.right')}</div>
        
        {/* User position dot */}
        <div 
          className="compass-dot user-dot"
          style={{ 
            left: `${dotX}%`, 
            top: `${dotY}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="compass-dot-inner"></div>
          <div className="compass-dot-pulse"></div>
          <span className="user-label">{t('personalityTest.compass.you')}</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="compass-legend mt-2">
        <small className="text-muted d-block text-center mb-2">
          {t('personalityTest.compass.legendHint')}
        </small>
      </div>
      
      {/* Position label */}
      <div className="compass-result text-center mt-2">
        <span className="compass-label-text">
          {getPoliticalLabel(position.x, position.y, t)}
        </span>
        <div className="compass-coordinates">
          <small className="text-muted">
            {t('personalityTest.compass.economic')}: {position.x.toFixed(1)} | {t('personalityTest.compass.social')}: {position.y.toFixed(1)}
          </small>
        </div>
      </div>
    </div>
  );
};

/**
 * Uploads an image to the Hostinger server
 */
const uploadImageToHosting = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', 'membership-photos');
  
  const response = await fetch(UPLOAD_ENDPOINT, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Upload failed');
  }
  
  return data.url;
};

const Join = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load initial state from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return defaultValue;
  };

  // Initialize state with localStorage values
  const [formData, setFormData] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.FORM_DATA, null);
    if (saved) {
      // Don't restore file/photo from localStorage (can't serialize File objects)
      return { ...INITIAL_FORM_DATA, ...saved, photo: null };
    }
    return INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [submitError, setSubmitError] = useState(null);
  
  // Personality Test State - load from localStorage
  const [showPersonalityTest, setShowPersonalityTest] = useState(() => 
    loadFromStorage(STORAGE_KEYS.SHOW_TEST, false)
  );
  const [currentLayer, setCurrentLayer] = useState(() => 
    loadFromStorage(STORAGE_KEYS.CURRENT_LAYER, 1)
  );
  const [personalityAnswers, setPersonalityAnswers] = useState(() => 
    loadFromStorage(STORAGE_KEYS.PERSONALITY_ANSWERS, {})
  );
  const [skippedLayers, setSkippedLayers] = useState(() => 
    loadFromStorage(STORAGE_KEYS.SKIPPED_LAYERS, [])
  );
  const [testCompleted, setTestCompleted] = useState(() => 
    loadFromStorage(STORAGE_KEYS.TEST_COMPLETED, false)
  );
  
  // Compass filter state
  const [compassFilter, setCompassFilter] = useState(COMPASS_FILTERS.ALL);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      // Don't save password or photo to localStorage for security
      const { password, confirmPassword, photo, ...safeFormData } = formData;
      localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(safeFormData));
    } catch (e) {
      console.error('Error saving form data to localStorage:', e);
    }
  }, [formData]);

  // Save personality test state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONALITY_ANSWERS, JSON.stringify(personalityAnswers));
    } catch (e) {
      console.error('Error saving personality answers to localStorage:', e);
    }
  }, [personalityAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_LAYER, JSON.stringify(currentLayer));
    } catch (e) {
      console.error('Error saving current layer to localStorage:', e);
    }
  }, [currentLayer]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKIPPED_LAYERS, JSON.stringify(skippedLayers));
    } catch (e) {
      console.error('Error saving skipped layers to localStorage:', e);
    }
  }, [skippedLayers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHOW_TEST, JSON.stringify(showPersonalityTest));
    } catch (e) {
      console.error('Error saving show test to localStorage:', e);
    }
  }, [showPersonalityTest]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_COMPLETED, JSON.stringify(testCompleted));
    } catch (e) {
      console.error('Error saving test completed to localStorage:', e);
    }
  }, [testCompleted]);

  // Clear localStorage after successful submission
  const clearSavedData = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  const isBengali = i18n.language === 'bn' || i18n.language === 'local';
  const layerKeys = Object.keys(LAYER_QUESTIONS);
  const totalLayers = layerKeys.length;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  // Personality Test Handlers
  const handleStartPersonalityTest = () => {
    const newErrors = validateMembershipForm(formData, t);
    
    if (!formData.password) {
      newErrors.password = t('join.form.errors.passwordRequired') || 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = t('join.form.errors.passwordTooShort') || 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('join.form.errors.confirmPasswordRequired') || 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('join.form.errors.passwordMismatch') || 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setShowPersonalityTest(true);
    }
  };

  const handleAnswerQuestion = (questionId, value) => {
    setPersonalityAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getCurrentLayerQuestions = () => {
    const layerKey = layerKeys[currentLayer - 1];
    return LAYER_QUESTIONS[layerKey];
  };

  const isLayerComplete = () => {
    const questionIds = getCurrentLayerQuestions();
    return questionIds.every(qId => personalityAnswers[qId] !== undefined);
  };

  const handleNextLayer = () => {
    if (currentLayer < totalLayers) {
      setCurrentLayer(prev => prev + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handleSkipLayer = () => {
    setSkippedLayers(prev => [...prev, currentLayer]);
    if (currentLayer < totalLayers) {
      setCurrentLayer(prev => prev + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handleBackToForm = () => {
    setShowPersonalityTest(false);
  };

  const getProgress = () => {
    const answeredCount = Object.keys(personalityAnswers).length;
    const totalQuestions = 20; // Currently 20 questions, layer 5 to be added
    return Math.round((answeredCount / totalQuestions) * 100);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError(null);
    setLoading(true);
    
    try {
      setLoadingMessage(t('join.form.creatingAccount') || 'Creating your account...');
      
      const [photoURL, userCredential] = await Promise.all([
        formData.photo ? uploadImageToHosting(formData.photo) : Promise.resolve(null),
        createUserWithEmailAndPassword(auth, formData.email.trim().toLowerCase(), formData.password)
      ]);
      
      const user = userCredential.user;
      
      setLoadingMessage(t('join.form.savingProfile') || 'Saving your profile...');
      
      const membershipData = {
        uid: user.uid,
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        photoURL,
        profession: formData.profession.trim(),
        education: formData.education,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        politicalActivity: formData.politicalActivity.trim(),
        about: formData.about.trim(),
        youthWing: formData.youthWing,
        agreePhilosophy: formData.agreePhilosophy,
        personalityTest: {
          answers: personalityAnswers,
          skippedLayers: skippedLayers,
          compassPosition: compassPosition,
          completedAt: new Date().toISOString()
        },
        status: STATUS.PENDING,
        createdAt: serverTimestamp(),
      };
      
      await setDoc(doc(db, COLLECTIONS.MEMBERSHIPS, user.uid), membershipData);
      
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        ...membershipData
      }));
      
      // Clear saved data from localStorage after successful submission
      clearSavedData();
      
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Error during registration:', error);
      
      let errorMessage = t('join.form.errors.submitFailed') || 'Failed to submit. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('join.form.errors.emailInUse') || 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('join.form.errors.weakPassword') || 'Password is too weak.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('join.form.errors.invalidEmail') || 'Invalid email address.';
      }
      
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  // Helper function to get education label
  const getEducationLabel = (value) => {
    const educationMap = {
      'no_basic': t('join.form.educationOptions.noBasic'),
      'basic_literacy': t('join.form.educationOptions.basicLiteracy'),
      'ssc': t('join.form.educationOptions.ssc'),
      'hsc': t('join.form.educationOptions.hsc'),
      'diploma': t('join.form.educationOptions.diploma'),
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

  // Calculate political compass position
  const compassPosition = calculatePoliticalCompass(personalityAnswers, t);

  // Render Personality Test Complete Screen
  const renderTestComplete = () => (
    <div className="join-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <Spinner animation="border" variant="light" style={{ width: '4rem', height: '4rem' }} />
            <p className="loading-message">{loadingMessage}</p>
          </div>
        </div>
      )}

      <section className="join-form-section" style={{ paddingTop: '2rem' }}>
        <div className="container-fluid px-2 px-md-4">
          <Row className="justify-content-center">
            <Col lg={10} md={12}>
              {/* Unified Preview Card */}
              <Card className="join-form-card">
                {/* Header with Progress */}
                <Card.Header className="text-center py-4" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                    <h4 className="mb-0">{t('personalityTest.preview.title') || 'Application Preview'}</h4>
                  </div>
                  <small className="opacity-75">
                    {t('personalityTest.answeredQuestions', { 
                      count: Object.keys(personalityAnswers).length, 
                      skipped: skippedLayers.length 
                    })}
                  </small>
                  <ProgressBar 
                    now={getProgress()} 
                    label={`${getProgress()}%`}
                    className="mt-3"
                    style={{ height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }}
                    variant="light"
                  />
                </Card.Header>

                {/* Profile Preview Section - Membership Card */}
                <Card.Body className="py-4">
                  <MembershipCard
                    formData={formData}
                    compassPosition={compassPosition}
                    getGenderLabel={getGenderLabel}
                    getEducationLabel={getEducationLabel}
                    getPoliticalLabel={getPoliticalLabel}
                    t={t}
                    onEdit={() => setShowPersonalityTest(false)}
                    showActions={true}
                  />
                </Card.Body>

                {/* Submit Section */}
                <Card.Footer className="text-center py-4" style={{ backgroundColor: 'var(--background-light)', borderTop: '1px solid var(--border-color)' }}>
                  {submitError && (
                    <Alert variant="danger" className="mb-4">
                      {submitError}
                    </Alert>
                  )}
                  
                  <p className="mb-4 text-muted">
                    {t('personalityTest.preview.confirmText')}
                  </p>

                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button 
                      variant="outline-secondary"
                      size="lg"
                      onClick={() => {
                        setTestCompleted(false);
                        setCurrentLayer(1);
                      }}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      {t('personalityTest.preview.editAnswers')}
                    </Button>
                    
                    <Button 
                      variant="success" 
                      size="lg"
                      className="submit-btn"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          {t('join.form.submitting') || 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check2-circle me-2"></i>
                          {t('join.form.submit') || 'Submit Application'}
                        </>
                      )}
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <Modal 
        show={submitted} 
        onHide={() => navigate('/profile')}
        centered
        backdrop="static"
        className="success-modal"
      >
        <Modal.Header className="success-modal-header">
          <Modal.Title className="w-100 text-center">
            <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: '2rem' }}></i>
            <br />
            {t('join.form.successTitle')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="mb-0">{t('join.form.successMessage')}</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="success" onClick={() => navigate('/profile')}>
            {t('join.form.viewProfile') || 'View My Profile'}
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate('/')}>
            {t('join.form.goHome') || 'Go to Home'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  // Render Personality Test Questions
  const renderPersonalityTest = () => {
    if (testCompleted) {
      return renderTestComplete();
    }

    const questionIds = getCurrentLayerQuestions();
    const layerKey = layerKeys[currentLayer - 1];

    // Skip layer 5 if it has no questions yet
    if (questionIds.length === 0) {
      if (currentLayer < totalLayers) {
        setCurrentLayer(prev => prev + 1);
      } else {
        setTestCompleted(true);
      }
      return null;
    }

    return (
      <div className="join-page">
        <section className="join-hero">
          <Container>
            <Row className="align-items-center">
              <Col lg={12} className="text-center text-white">
                <h1 className="join-hero-title">
                  {t('personalityTest.title')}
                </h1>
                <p className="join-hero-subtitle">
                  {`${t('personalityTest.layers.' + layerKey + '.title')} (${currentLayer}/${totalLayers})`}
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="join-form-section">
          <div className="container-fluid px-2 px-md-4">
            <Row className="justify-content-center">
              <Col lg={10} md={12}>
                <Card className="join-form-card">
                  <Card.Body>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">
                          {t('personalityTest.progress')}
                        </small>
                        <small className="text-muted">{getProgress()}%</small>
                      </div>
                      <ProgressBar now={getProgress()} style={{ height: '10px' }} />
                    </div>

                    {/* Layer Progress */}
                    <div className="layer-indicators mb-4 d-flex justify-content-center gap-2">
                      {layerKeys.map((key, index) => {
                        const hasQuestions = LAYER_QUESTIONS[key].length > 0;
                        if (!hasQuestions) return null;
                        return (
                          <div 
                            key={index}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 
                                skippedLayers.includes(index + 1) ? '#ffc107' :
                                index + 1 < currentLayer ? '#28a745' :
                                index + 1 === currentLayer ? '#1a5490' : '#e9ecef',
                              color: index + 1 <= currentLayer || skippedLayers.includes(index + 1) ? 'white' : '#6c757d',
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}
                          >
                            {index + 1}
                          </div>
                        );
                      })}
                    </div>

                    <h3 className="text-center mb-2" style={{ color: '#1a5490' }}>
                      {t('personalityTest.layers.' + layerKey + '.title')}
                    </h3>
                    <p className="text-center text-muted mb-4">
                      {t('personalityTest.layers.' + layerKey + '.description')}
                    </p>

                    {/* Questions with Radio Buttons */}
                    <div className="personality-questions">
                      {questionIds.map((questionId, index) => (
                        <div key={questionId} className="question-card mb-4 p-4" style={{
                          backgroundColor: '#f8f9fa',
                          borderRadius: '12px',
                          border: personalityAnswers[questionId] ? '2px solid #28a745' : '1px solid #dee2e6'
                        }}>
                          <p className="question-situation mb-3" style={{ 
                            fontWeight: '500', 
                            fontSize: '1.05rem',
                            lineHeight: '1.6'
                          }}>
                            <span className="question-number" style={{
                              display: 'inline-block',
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              backgroundColor: '#1a5490',
                              color: 'white',
                              textAlign: 'center',
                              lineHeight: '30px',
                              marginRight: '10px',
                              fontSize: '0.9rem'
                            }}>
                              {index + 1}
                            </span>
                            {t(`personalityTest.questions.${questionId}.situation`)}
                          </p>
                          
                          <div className="answer-options mt-3">
                            {ANSWER_OPTIONS.map(optionKey => (
                              <Form.Check
                                key={optionKey}
                                type="radio"
                                id={`${questionId}-${optionKey}`}
                                name={questionId}
                                className="mb-2 p-3"
                                style={{
                                  backgroundColor: personalityAnswers[questionId] === optionKey ? '#e8f5e9' : 'white',
                                  borderRadius: '8px',
                                  border: personalityAnswers[questionId] === optionKey ? '2px solid #28a745' : '1px solid #e0e0e0',
                                  cursor: 'pointer'
                                }}
                                label={
                                  <span style={{ marginLeft: '8px', fontSize: '0.95rem' }}>
                                    <strong style={{ color: '#1a5490' }}>{optionKey.toUpperCase()}.</strong>{' '}
                                    {t(`personalityTest.questions.${questionId}.options.${optionKey}.text`)}
                                  </span>
                                }
                                checked={personalityAnswers[questionId] === optionKey}
                                onChange={() => handleAnswerQuestion(questionId, optionKey)}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      <Button 
                        variant="outline-secondary"
                        onClick={currentLayer === 1 ? handleBackToForm : () => setCurrentLayer(prev => prev - 1)}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        {currentLayer === 1 
                          ? t('personalityTest.backToForm')
                          : t('personalityTest.previousLayer')
                        }
                      </Button>

                      <div className="d-flex gap-2">
                        <Button 
                          variant="warning"
                          onClick={handleSkipLayer}
                        >
                          {t('personalityTest.skipLayer')}
                          <i className="bi bi-skip-forward ms-2"></i>
                        </Button>

                        <Button 
                          variant="success"
                          onClick={handleNextLayer}
                          disabled={!isLayerComplete()}
                        >
                          {currentLayer === totalLayers 
                            ? t('personalityTest.complete')
                            : t('personalityTest.nextLayer')
                          }
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    );
  };

  // Main Form View
  if (showPersonalityTest) {
    return renderPersonalityTest();
  }

  return (
    <div className="join-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <Spinner animation="border" variant="light" style={{ width: '4rem', height: '4rem' }} />
            <p className="loading-message">{loadingMessage}</p>
          </div>
        </div>
      )}

      <section className="join-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="text-center text-white">
              <h1 className="join-hero-title">{t('join.hero.title')}</h1>
              <p className="join-hero-subtitle">{t('join.hero.subtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="join-form-section">
        <div className="container-fluid px-2 px-md-4">
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="join-form-card">
                <Card.Body>
                  <h2 className="form-title text-center mb-4">{t('join.form.title')}</h2>
                  
                  <Modal 
                    show={submitted} 
                    onHide={() => navigate('/profile')}
                    centered
                    backdrop="static"
                    className="success-modal"
                  >
                    <Modal.Header className="success-modal-header">
                      <Modal.Title className="w-100 text-center">
                        <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: '2rem' }}></i>
                        <br />
                        {t('join.form.successTitle')}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                      <p className="mb-0">{t('join.form.successMessage')}</p>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                      <Button variant="success" onClick={() => navigate('/profile')}>
                        {t('join.form.viewProfile') || 'View My Profile'}
                      </Button>
                      <Button variant="outline-secondary" onClick={() => navigate('/')}>
                        {t('join.form.goHome') || 'Go to Home'}
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {submitError && (
                    <Alert variant="danger" className="text-center">
                      {submitError}
                    </Alert>
                  )}

                  <Form onSubmit={(e) => e.preventDefault()}>
                    {/* Name */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.name')} <span className="required">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        placeholder={t('join.form.namePlaceholder')}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Age and Gender Row */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.age')} <span className="required">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            isInvalid={!!errors.age}
                            placeholder={t('join.form.agePlaceholder')}
                            min="18"
                            max="120"
                          />
                          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.gender')} <span className="required">*</span></Form.Label>
                          <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            isInvalid={!!errors.gender}
                          >
                            <option value="">{t('join.form.genderSelect')}</option>
                            <option value="male">{t('join.form.male')}</option>
                            <option value="female">{t('join.form.female')}</option>
                            <option value="other">{t('join.form.other')}</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Youth Wing Option */}
                    {formData.age && qualifiesForYouthWing(formData.age) && (
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="youthWing"
                          name="youthWing"
                          checked={formData.youthWing}
                          onChange={handleChange}
                          label={t('join.form.youthWingLabel')}
                        />
                        <Form.Text className="text-muted">{t('join.form.youthWingHelp')}</Form.Text>
                      </Form.Group>
                    )}

                    {/* Photo */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.photo')}</Form.Label>
                      <Form.Control
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      <Form.Text className="text-muted">{t('join.form.photoHelp')}</Form.Text>
                    </Form.Group>

                    {/* Profession */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.profession')} <span className="required">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        isInvalid={!!errors.profession}
                        placeholder={t('join.form.professionPlaceholder')}
                      />
                      <Form.Control.Feedback type="invalid">{errors.profession}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Educational Status */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.education')} <span className="required">*</span></Form.Label>
                      <Form.Select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        isInvalid={!!errors.education}
                      >
                        <option value="">{t('join.form.educationSelect')}</option>
                        <option value="no_basic">{t('join.form.educationOptions.noBasic')}</option>
                        <option value="basic_literacy">{t('join.form.educationOptions.basicLiteracy')}</option>
                        <option value="ssc">{t('join.form.educationOptions.ssc')}</option>
                        <option value="hsc">{t('join.form.educationOptions.hsc')}</option>
                        <option value="diploma">{t('join.form.educationOptions.diploma')}</option>
                        <option value="bachelor">{t('join.form.educationOptions.bachelor')}</option>
                        <option value="masters">{t('join.form.educationOptions.masters')}</option>
                        <option value="postgrad">{t('join.form.educationOptions.postgrad')}</option>
                        <option value="phd">{t('join.form.educationOptions.phd')}</option>
                        <option value="other">{t('join.form.educationOptions.other')}</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.education}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Email and Phone Row */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.email')} <span className="required">*</span></Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            placeholder={t('join.form.emailPlaceholder')}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.phone')} <span className="required">*</span></Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            placeholder={t('join.form.phonePlaceholder')}
                          />
                          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Password Row */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.password') || 'Password'} <span className="required">*</span></Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            placeholder={t('join.form.passwordPlaceholder') || 'Create a password'}
                          />
                          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                          <Form.Text className="text-muted">{t('join.form.passwordHelp') || 'At least 6 characters'}</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('join.form.confirmPassword') || 'Confirm Password'} <span className="required">*</span></Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                            placeholder={t('join.form.confirmPasswordPlaceholder') || 'Confirm your password'}
                          />
                          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Previous Political Activity */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.politicalActivity')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="politicalActivity"
                        value={formData.politicalActivity}
                        onChange={handleChange}
                        placeholder={t('join.form.politicalActivityPlaceholder')}
                      />
                      <Form.Text className="text-muted">{t('join.form.politicalActivityHelp')}</Form.Text>
                    </Form.Group>

                    {/* About Yourself */}
                    <Form.Group className="mb-3">
                      <Form.Label>{t('join.form.about')} <span className="required">*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        isInvalid={!!errors.about}
                        placeholder={t('join.form.aboutPlaceholder')}
                      />
                      <Form.Text className="text-muted">
                        {formData.about.length}/500 {t('join.form.characters')}
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">{errors.about}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Philosophy Agreement */}
                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="agreePhilosophy"
                        name="agreePhilosophy"
                        checked={formData.agreePhilosophy}
                        onChange={handleChange}
                        isInvalid={!!errors.agreePhilosophy}
                        label={
                          <span>
                            {t('join.form.agreePhilosophy')} <span className="required">*</span>
                          </span>
                        }
                        feedback={errors.agreePhilosophy}
                        feedbackType="invalid"
                      />
                    </Form.Group>

                    {/* Go to Personality Test Button */}
                    <div className="text-center">
                      <Button 
                        variant="primary" 
                        size="lg"
                        className="submit-btn"
                        onClick={handleStartPersonalityTest}
                      >
                        {t('join.form.goToPersonalityTest') || 'Go to Personality Test'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Join;
