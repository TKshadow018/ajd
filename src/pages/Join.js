import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Join.css';

const Join = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    photo: null,
    profession: '',
    email: '',
    phone: '',
    politicalActivity: '',
    about: '',
    agreePhilosophy: false,
    youthWing: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = t('join.form.errors.nameRequired');
    if (!formData.age || formData.age < 18) newErrors.age = t('join.form.errors.ageMin');
    if (!formData.gender) newErrors.gender = t('join.form.errors.genderRequired');
    if (!formData.profession.trim()) newErrors.profession = t('join.form.errors.professionRequired');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('join.form.errors.emailInvalid');
    }
    if (!formData.phone.trim() || !/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = t('join.form.errors.phoneInvalid');
    }
    if (!formData.about.trim() || formData.about.length < 50) {
      newErrors.about = t('join.form.errors.aboutMin');
    }
    if (!formData.agreePhilosophy) {
      newErrors.agreePhilosophy = t('join.form.errors.agreePhilosophyRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          age: '',
          gender: '',
          photo: null,
          profession: '',
          email: '',
          phone: '',
          politicalActivity: '',
          about: '',
          agreePhilosophy: false,
          youthWing: false
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="join-page">
      {/* Hero Section */}
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

      {/* Form Section */}
      <section className="join-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="join-form-card">
                <Card.Body>
                  <h2 className="form-title text-center mb-4">{t('join.form.title')}</h2>
                  
                  {submitted && (
                    <Alert variant="success" className="text-center">
                      <h5>{t('join.form.successTitle')}</h5>
                      <p>{t('join.form.successMessage')}</p>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.age}
                          </Form.Control.Feedback>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Youth Wing Option (shown if age < 30) */}
                    {formData.age && Number(formData.age) < 30 && (
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="youthWing"
                          name="youthWing"
                          checked={formData.youthWing}
                          onChange={handleChange}
                          label={t('join.form.youthWingLabel')}
                        />
                        <Form.Text className="text-muted">
                          {t('join.form.youthWingHelp')}
                        </Form.Text>
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
                      <Form.Text className="text-muted">
                        {t('join.form.photoHelp')}
                      </Form.Text>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.profession}
                      </Form.Control.Feedback>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
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
                      <Form.Text className="text-muted">
                        {t('join.form.politicalActivityHelp')}
                      </Form.Text>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.about}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Philosophy Agreement */}
                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
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

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        className="submit-btn"
                      >
                        {t('join.form.submit')}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Join;
