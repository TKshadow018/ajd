import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../redux/slices/authSlice';
import { COLLECTIONS } from '../utils';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const user = userCredential.user;

      // Fetch user profile from Firestore
      const docRef = doc(db, COLLECTIONS.MEMBERSHIPS, user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          ...docSnap.data()
        }));
      } else {
        dispatch(setUser({
          uid: user.uid,
          email: user.email
        }));
      }

      // Show success animation before navigating
      setShowSuccessAnimation(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000); // Wait for animation to complete
    } catch (err) {
      console.error('Login error:', err);
      
      let errorMessage = t('login.errors.default') || 'Login failed. Please try again.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = t('login.errors.userNotFound') || 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = t('login.errors.wrongPassword') || 'Incorrect password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = t('login.errors.invalidEmail') || 'Invalid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = t('login.errors.tooManyRequests') || 'Too many failed attempts. Please try again later.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = t('login.errors.invalidCredential') || 'Invalid email or password.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetError(null);
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail.trim().toLowerCase());
      setResetSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
      
      let errorMessage = t('login.errors.resetFailed') || 'Failed to send reset email.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = t('login.errors.userNotFound') || 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = t('login.errors.invalidEmail') || 'Invalid email address.';
      }
      
      setResetError(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="login-success-overlay">
          <div className="success-animation-container">
            <div className="success-cube">
              <div className="cube-face front">
                <i className="bi bi-check-lg"></i>
              </div>
              <div className="cube-face back">
                <i className="bi bi-person-check"></i>
              </div>
              <div className="cube-face right">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="cube-face left">
                <i className="bi bi-unlock"></i>
              </div>
              <div className="cube-face top">
                <i className="bi bi-star"></i>
              </div>
              <div className="cube-face bottom">
                <i className="bi bi-heart"></i>
              </div>
            </div>
            <h3 className="success-text">{t('login.success.welcome') || 'Welcome Back!'}</h3>
            <p className="success-subtext">{t('login.success.redirecting') || 'Redirecting to your profile...'}</p>
          </div>
        </div>
      )}

      {/* Login Form Section */}
      <section className="login-form-section" style={{ paddingTop: '2rem' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={5} md={7}>
              <Card className="login-card">
                <Card.Body>
                  {!showForgotPassword ? (
                    <>
                      <h2 className="form-title text-center mb-4">
                        <i className="bi bi-person-circle me-2"></i>
                        {t('login.form.title') || 'Login'}
                      </h2>

                      {error && (
                        <Alert variant="danger" className="text-center">
                          {error}
                        </Alert>
                      )}

                      <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('login.form.email') || 'Email'}</Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('login.form.emailPlaceholder') || 'Enter your email'}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>{t('login.form.password') || 'Password'}</Form.Label>
                          <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('login.form.passwordPlaceholder') || 'Enter your password'}
                            required
                          />
                        </Form.Group>

                        <div className="d-grid gap-2 mb-3">
                          <Button 
                            variant="primary" 
                            type="submit" 
                            size="lg"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner size="sm" className="me-2" />
                                {t('login.form.loggingIn') || 'Logging in...'}
                              </>
                            ) : (
                              t('login.form.loginButton') || 'Login'
                            )}
                          </Button>
                        </div>

                        <div className="text-center mb-3">
                          <Button 
                            variant="link" 
                            className="forgot-password-link"
                            onClick={() => setShowForgotPassword(true)}
                          >
                            {t('login.form.forgotPassword') || 'Forgot Password?'}
                          </Button>
                        </div>

                        <hr />

                        <div className="text-center">
                          <p className="mb-2">{t('login.form.noAccount') || "Don't have an account?"}</p>
                          <Button 
                            as={Link} 
                            to="/join" 
                            variant="outline-success"
                            className="join-link-btn"
                          >
                            <i className="bi bi-person-plus me-2"></i>
                            {t('login.form.joinNow') || 'Join as New Member'}
                          </Button>
                        </div>
                      </Form>
                    </>
                  ) : (
                    <>
                      <h2 className="form-title text-center mb-4">
                        <i className="bi bi-key me-2"></i>
                        {t('login.forgotPassword.title') || 'Reset Password'}
                      </h2>

                      {resetSent ? (
                        <Alert variant="success" className="text-center">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          {t('login.forgotPassword.success') || 'Password reset email sent! Check your inbox.'}
                        </Alert>
                      ) : (
                        <>
                          {resetError && (
                            <Alert variant="danger" className="text-center">
                              {resetError}
                            </Alert>
                          )}

                          <p className="text-muted text-center mb-4">
                            {t('login.forgotPassword.instructions') || 'Enter your email address and we\'ll send you a link to reset your password.'}
                          </p>

                          <Form onSubmit={handleForgotPassword}>
                            <Form.Group className="mb-3">
                              <Form.Label>{t('login.form.email') || 'Email'}</Form.Label>
                              <Form.Control
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder={t('login.form.emailPlaceholder') || 'Enter your email'}
                                required
                              />
                            </Form.Group>

                            <div className="d-grid gap-2 mb-3">
                              <Button 
                                variant="primary" 
                                type="submit"
                                disabled={resetLoading}
                              >
                                {resetLoading ? (
                                  <>
                                    <Spinner size="sm" className="me-2" />
                                    {t('login.forgotPassword.sending') || 'Sending...'}
                                  </>
                                ) : (
                                  t('login.forgotPassword.sendButton') || 'Send Reset Link'
                                )}
                              </Button>
                            </div>
                          </Form>
                        </>
                      )}

                      <div className="text-center mt-3">
                        <Button 
                          variant="link"
                          onClick={() => {
                            setShowForgotPassword(false);
                            setResetSent(false);
                            setResetError(null);
                            setResetEmail('');
                          }}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          {t('login.forgotPassword.backToLogin') || 'Back to Login'}
                        </Button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
