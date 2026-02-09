import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Card, Button, ProgressBar, Badge, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaArrowLeft, FaArrowRight, FaRedo, FaThumbsUp, FaThumbsDown, FaUser, FaMapMarkerAlt, FaVoteYea, FaTimesCircle, FaComment, FaSave } from 'react-icons/fa';
import { db } from '../services/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import voteChoices from '../data/vote-choice';
import './VoteComponent.css';

// Transform the vote choices data into questions format
const questions = voteChoices.map((item, index) => ({
  id: index + 1,
  serialNumber: item.serial_number,
  question: item.issue,
  details: item.details_about_issue,
  choices: [
    {
      id: 'SUPPORT',
      label: 'সমর্থন',
      description: item.why_should_it_be_supported
    },
    {
      id: 'OPPOSE',
      label: 'বিরোধিতা',
      description: item.why_it_should_be_not_supported,
      opposedBy: item.opposed_by
    }
  ]
}));

const SAVE_INTERVAL = 5; // Save every 5 votes

function VoteComponent() {
  // Registration state
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  
  // Voting state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [opinions, setOpinions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Firebase document reference
  const voteDocIdRef = useRef(null);
  const lastSavedCountRef = useRef(0);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  // Generate unique session ID
  const sessionId = useMemo(() => {
    return `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Handle registration
  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setRegistrationError('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }
    if (!userLocation.trim()) {
      setRegistrationError('অনুগ্রহ করে আপনার এলাকা লিখুন');
      return;
    }

    try {
      setIsSaving(true);
      // Create initial document in Firebase
      const docRef = await addDoc(collection(db, 'votes'), {
        sessionId,
        userName: userName.trim(),
        userLocation: userLocation.trim(),
        startedAt: serverTimestamp(),
        completedAt: null,
        totalQuestions,
        answeredCount: 0,
        answers: {},
        opinions: {},
        supportCount: 0,
        opposeCount: 0,
        isComplete: false
      });
      
      voteDocIdRef.current = docRef.id;
      setIsRegistered(true);
      setRegistrationError('');
    } catch (error) {
      console.error('Error creating vote document:', error);
      setRegistrationError('সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSaving(false);
    }
  };

  // Save progress to Firebase
  const saveProgress = useCallback(async (forceComplete = false) => {
    if (!voteDocIdRef.current) return;
    
    try {
      setIsSaving(true);
      const supportCount = Object.values(answers).filter(a => a === 'SUPPORT').length;
      const opposeCount = Object.values(answers).filter(a => a === 'OPPOSE').length;
      
      const updateData = {
        answers,
        opinions,
        answeredCount: Object.keys(answers).length,
        supportCount,
        opposeCount,
        lastUpdated: serverTimestamp()
      };

      if (forceComplete) {
        updateData.completedAt = serverTimestamp();
        updateData.isComplete = true;
        updateData.supportPercentage = ((supportCount / totalQuestions) * 100).toFixed(1);
        updateData.recommendation = supportCount >= (totalQuestions * 0.8) ? 'YES' : 'NO';
      }

      await updateDoc(doc(db, 'votes', voteDocIdRef.current), updateData);
      lastSavedCountRef.current = Object.keys(answers).length;
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsSaving(false);
    }
  }, [answers, opinions, totalQuestions]);

  // Auto-save every 5 votes
  useEffect(() => {
    const currentAnswered = Object.keys(answers).length;
    const saveCheckpoint = Math.floor(currentAnswered / SAVE_INTERVAL) * SAVE_INTERVAL;
    const lastSaveCheckpoint = Math.floor(lastSavedCountRef.current / SAVE_INTERVAL) * SAVE_INTERVAL;
    
    if (saveCheckpoint > lastSaveCheckpoint && currentAnswered > 0) {
      saveProgress();
    }
  }, [answers, saveProgress]);

  const handleChoice = useCallback((questionId, choiceId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choiceId
    }));
  }, []);

  const handleOpinionChange = useCallback((questionId, opinion) => {
    setOpinions(prev => ({
      ...prev,
      [questionId]: opinion
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (answeredCount === totalQuestions) {
      saveProgress(true);
      setShowResults(true);
    }
  }, [currentQuestion, totalQuestions, answeredCount, saveProgress]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [currentQuestion]);

  const handleReset = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setOpinions({});
    setShowResults(false);
    setIsRegistered(false);
    setUserName('');
    setUserLocation('');
    voteDocIdRef.current = null;
    lastSavedCountRef.current = 0;
  }, []);

  const handleGoToQuestion = useCallback((index) => {
    setCurrentQuestion(index);
    setShowResults(false);
  }, []);

  // Calculate results
  const calculateResults = useMemo(() => {
    const supportCount = Object.values(answers).filter(a => a === 'SUPPORT').length;
    const opposeCount = Object.values(answers).filter(a => a === 'OPPOSE').length;
    const supportPercentage = (supportCount / totalQuestions) * 100;
    const shouldVoteYes = supportPercentage >= 80;
    return { supportCount, opposeCount, supportPercentage, shouldVoteYes };
  }, [answers, totalQuestions]);

  // Registration Form
  if (!isRegistered) {
    return (
      <div className="vote-registration">
        <Container>
          <div className="registration-wrapper">
            <Card className="registration-card">
              <Card.Body>
                <div className="registration-header">
                  <img 
                    src="/logo/butterfly2.png" 
                    alt="Logo" 
                    className="registration-logo"
                  />
                  <h2>জুলাই জাতীয় সনদ ২০২৫</h2>
                  <p className="registration-subtitle">সংবিধান সংস্কার প্রস্তাব - জনমত জরিপ</p>
                </div>

                <div className="registration-info">
                  <div className="info-item">
                    <FaVoteYea className="info-icon" />
                    <span>৮৪টি সংস্কার প্রস্তাবে আপনার মতামত দিন</span>
                  </div>
                  <div className="info-item">
                    <FaComment className="info-icon" />
                    <span>প্রতিটি প্রস্তাবে আপনার মন্তব্য যোগ করতে পারবেন</span>
                  </div>
                  <div className="info-item">
                    <FaSave className="info-icon" />
                    <span>আপনার মতামত নিরাপদে সংরক্ষিত হবে</span>
                  </div>
                </div>

                <Form onSubmit={handleRegistration} className="registration-form">
                  {registrationError && (
                    <div className="registration-error">
                      <FaTimesCircle /> {registrationError}
                    </div>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUser className="label-icon" /> আপনার নাম
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="আপনার পুরো নাম লিখুন"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="registration-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaMapMarkerAlt className="label-icon" /> আপনার এলাকা
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="যেমন: সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="registration-input"
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="registration-submit"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        অপেক্ষা করুন...
                      </>
                    ) : (
                      <>
                        <FaVoteYea className="me-2" />
                        ভোট দেওয়া শুরু করুন
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const { supportCount, opposeCount, supportPercentage, shouldVoteYes } = calculateResults;
    const percentSupport = supportPercentage.toFixed(1);
    const percentOppose = ((opposeCount / totalQuestions) * 100).toFixed(1);

    return (
      <div className="vote-results">
        <Container>
          <Card className="results-card">
            <Card.Body>
              <div className="results-header">
                <FaCheckCircle className="results-icon" />
                <h2>ধন্যবাদ, {userName}!</h2>
                <p>আপনি সব {totalQuestions}টি প্রস্তাবে মতামত দিয়েছেন</p>
              </div>

              {/* Recommendation Banner */}
              <div className={`recommendation-banner ${shouldVoteYes ? 'vote-yes' : 'vote-no'}`}>
                <div className="recommendation-icon">
                  {shouldVoteYes ? <FaThumbsUp /> : <FaThumbsDown />}
                </div>
                <div className="recommendation-text">
                  <h3>আপনার সুপারিশ</h3>
                  {shouldVoteYes ? (
                    <p>আপনি <strong>{percentSupport}%</strong> প্রস্তাব সমর্থন করেছেন। গণভোটে আপনার <strong>"হ্যাঁ"</strong> ভোট দেওয়া উচিত।</p>
                  ) : (
                    <p>আপনি <strong>{percentOppose}%</strong> প্রস্তাবে বিরোধিতা করেছেন। গণভোটে আপনার <strong>"না"</strong> ভোট দেওয়া উচিত।</p>
                  )}
                </div>
              </div>

              <div className="results-summary">
                <Row>
                  <Col md={6}>
                    <div className="result-item support">
                      <FaThumbsUp className="result-type-icon" />
                      <h4>সমর্থন করেছেন</h4>
                      <div className="result-count">{supportCount}</div>
                      <ProgressBar 
                        now={parseFloat(percentSupport)} 
                        variant="success" 
                        className="result-bar"
                      />
                      <span className="result-percent">{percentSupport}%</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="result-item oppose">
                      <FaThumbsDown className="result-type-icon" />
                      <h4>বিরোধিতা করেছেন</h4>
                      <div className="result-count">{opposeCount}</div>
                      <ProgressBar 
                        now={parseFloat(percentOppose)} 
                        variant="danger" 
                        className="result-bar"
                      />
                      <span className="result-percent">{percentOppose}%</span>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="results-details">
                <h5>আপনার উত্তরের সারাংশ</h5>
                <div className="answers-grid">
                  {questions.map((q, index) => (
                    <Badge 
                      key={q.id}
                      bg={answers[q.id] === 'SUPPORT' ? 'success' : 'danger'}
                      className="answer-badge"
                      onClick={() => handleGoToQuestion(index)}
                      style={{ cursor: 'pointer' }}
                      title={`${q.question}: ${answers[q.id] === 'SUPPORT' ? 'সমর্থন' : 'বিরোধিতা'}`}
                    >
                      {q.id}: {answers[q.id] === 'SUPPORT' ? '✓' : '✗'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="results-actions">
                <Button variant="outline-primary" onClick={handleReset}>
                  <FaRedo className="me-2" />
                  নতুন করে শুরু করুন
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedChoice = answers[question.id];
  const currentOpinion = opinions[question.id] || '';

  return (
    <div className="vote-component">
      <Container>
        {/* Header */}
        <div className="vote-header">
          <div className="vote-header-left">
            <img src="/logo/butterfly2.png" alt="Logo" className="vote-logo" />
            <div className="vote-header-text">
              <h1>জুলাই জাতীয় সনদ ২০২৫</h1>
              <span className="vote-user-info">
                <FaUser className="me-1" /> {userName} | <FaMapMarkerAlt className="me-1" /> {userLocation}
              </span>
            </div>
          </div>
          {isSaving && (
            <div className="save-indicator">
              <Spinner size="sm" animation="border" />
              <span>সংরক্ষণ হচ্ছে...</span>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="vote-progress">
          <div className="progress-info">
            <span>প্রশ্ন {currentQuestion + 1} / {totalQuestions}</span>
            <span>{answeredCount}টি উত্তর দেওয়া হয়েছে</span>
          </div>
          <ProgressBar now={progress} variant="primary" className="main-progress" />
        </div>

        {/* Question Navigation */}
        <div className="question-nav">
          {questions.map((q, index) => (
            <button
              key={q.id}
              className={`nav-dot ${currentQuestion === index ? 'active' : ''} ${answers[q.id] ? (answers[q.id] === 'SUPPORT' ? 'answered-support' : 'answered-oppose') : ''}`}
              onClick={() => setCurrentQuestion(index)}
              title={`প্রশ্ন ${q.id}${answers[q.id] ? ` - ${answers[q.id] === 'SUPPORT' ? 'সমর্থন' : 'বিরোধিতা'}` : ''}`}
            >
              {q.id}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <Card className="question-card">
          <Card.Body>
            <div className="question-header">
              <Badge bg="secondary" className="question-number">
                প্রস্তাব #{question.serialNumber}
              </Badge>
            </div>
            
            <h3 className="question-text">{question.question}</h3>
            <p className="question-details">{question.details}</p>

            <div className="choices-container">
              {question.choices.map((choice) => (
                <div
                  key={choice.id}
                  className={`choice-card ${choice.id.toLowerCase()} ${selectedChoice === choice.id ? 'selected' : ''}`}
                  onClick={() => handleChoice(question.id, choice.id)}
                >
                  <div className="choice-header">
                    <div className="choice-indicator">
                      {choice.id === 'SUPPORT' ? (
                        <FaThumbsUp className="choice-icon support" />
                      ) : (
                        <FaThumbsDown className="choice-icon oppose" />
                      )}
                      {selectedChoice === choice.id && (
                        <FaCheckCircle className="check-icon" />
                      )}
                    </div>
                    <h4 className="choice-label">{choice.label}</h4>
                  </div>
                  <p className="choice-description">{choice.description}</p>
                  {choice.opposedBy && choice.opposedBy.length > 0 && (
                    <div className="opposed-by">
                      <span className="opposed-label">বিরোধী দল:</span>
                      <div className="opposed-parties">
                        {choice.opposedBy.map((party, idx) => (
                          <Badge key={idx} bg="warning" className="party-badge">
                            {party}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Opinion Section */}
            <div className="opinion-section">
              <Form.Group>
                <Form.Label className="opinion-label">
                  <FaComment className="me-2" />
                  আপনার মন্তব্য (ঐচ্ছিক)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="এই প্রস্তাব সম্পর্কে আপনার মতামত লিখুন..."
                  value={currentOpinion}
                  onChange={(e) => handleOpinionChange(question.id, e.target.value)}
                  className="opinion-input"
                />
              </Form.Group>
            </div>
          </Card.Body>
        </Card>

        {/* Navigation Buttons */}
        <div className="vote-navigation">
          <Button
            variant="outline-secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="nav-btn"
          >
            <FaArrowLeft className="me-2" />
            পূর্ববর্তী
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!selectedChoice}
            className="nav-btn"
          >
            {currentQuestion === totalQuestions - 1 ? (
              answeredCount === totalQuestions ? (
                <>
                  <FaCheckCircle className="me-2" />
                  ফলাফল দেখুন
                </>
              ) : 'পরবর্তী'
            ) : (
              <>
                পরবর্তী
                <FaArrowRight className="ms-2" />
              </>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default VoteComponent;
