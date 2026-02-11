import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBirthdayCake, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import getCandidates from '../data/index';
import './Candidates.css';

const Candidates = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [seatFilter, setSeatFilter] = useState('');

  // Get candidates based on current language
  const candidates = useMemo(() => getCandidates(i18n.language), [i18n.language]);

  // Filter candidates based on search and seat filter
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.seat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeat = seatFilter === '' || candidate.seat === seatFilter;
    
    return matchesSearch && matchesSeat;
  });

  // Get unique seats for filter dropdown
  const uniqueSeats = [...new Set(candidates.map(c => c.seat))].sort();

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const locale = i18n.language === 'bn' ? 'bn-BD' : 'en-US';
  return date.toLocaleDateString(locale, options);
};


const calculateAge = (dob) => {
  const today = new Date();
  const [day, month, year] = dob.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

  return (
    <div className="candidates-page">
      {/* Header Section */}
      <section className="candidates-header">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={10} className="mx-auto text-center">
              <h1 className="candidates-title">
                {t('candidates.title') || '2026 Election Candidates'}
              </h1>
              <p className="candidates-subtitle">
                {t('candidates.subtitle') || 'Meet our dedicated candidates for the 2026 national election'}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="candidates-filters-section">
        <Container>
          <Row className="mb-4">
            <Col lg={6} className="mx-auto">
              <InputGroup className="search-input-group mb-3">
                <InputGroup.Text className="search-icon-wrapper">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder={t('candidates.searchPlaceholder') || "Search by name, seat, or father's name..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col lg={6} className="mx-auto">
              <Form.Select
                value={seatFilter}
                onChange={(e) => setSeatFilter(e.target.value)}
                className="seat-filter-select"
              >
                <option value="">
                  {t('candidates.allSeats') || 'All Seats'}
                </option>
                {uniqueSeats.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="text-center mb-3">
            <Col>
              <p className="results-count">
                {t('candidates.showingResults') || 'Showing'} <strong>{filteredCandidates.length}</strong> {t('candidates.candidates') || 'candidates'}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Candidates Grid Section */}
      <section className="candidates-grid-section">
        <Container>
          {filteredCandidates.length > 0 ? (
            <Row className="g-4">
              {filteredCandidates.map((candidate) => (
                <Col lg={4} md={6} sm={12} key={candidate.id} className="candidate-col">
                  <Card className="candidate-card h-100 shadow-sm">
                    {/* Photo Section */}
                    <div className="candidate-photo-wrapper">
                      <Card.Img
                        variant="top"
                        src={candidate.photo}
                        alt={candidate.name}
                        className="candidate-photo"
                      />
                      <div className="seat-badge">
                        <FaMapMarkerAlt className="me-1" />
                        {candidate.seat}
                        {console.log(candidate.candidateType,"||")}
                        {(candidate.candidateType !== "Eligible" && candidate.candidateType !=="যোগ্য") && (
                          <span className="election-status not-elected ms-2">(Decleared Non Eligible)</span>
                        )}
                      </div>
                    </div>

                    <Card.Body className="candidate-body">
                      {/* Name */}
                      <h5 className="candidate-name">{candidate.name}</h5>
                      
                      {/* Father Name */}
                      <p className="candidate-father-name">
                        <small className="text-muted">
                          {t('candidates.fatherName') || "Father's Name"}: {candidate.fatherName}
                        </small>
                      </p>

                      {/* Mother Name */}
                      {candidate.motherName && (
                        <p className="candidate-mother-name">
                          <small className="text-muted">
                            {t('candidates.motherName') || "Mother's Name"}: {candidate.motherName}
                          </small>
                        </p>
                      )}

                      {/* Divider */}
                      <hr className="candidate-divider" />

                      {/* Information Grid */}
                      <div className="candidate-info">
                        {/* Date of Birth */}
                        <div className="info-item">
                          <FaBirthdayCake className="info-icon" />
                          <div>
                            <span className="info-label">
                              {t('candidates.dob') || 'Date of Birth'}
                            </span>
                            <p className="info-value">{formatDate(candidate.dob) || "Unknown"}</p>
                            <p className="info-age">
                              <small>({calculateAge(candidate.dob) || "Unknown"} {t('candidates.yearsOld') || 'years old'})</small>
                            </p>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="info-item">
                          <FaGraduationCap className="info-icon" />
                          <div>
                            <span className="info-label">
                              {t('candidates.education') || 'Education'}
                            </span>
                            <p className="info-value">{candidate.education || "Unknown"}</p>
                          </div>
                        </div>

                        {/* Occupation */}
                        <div className="info-item">
                          <FaBriefcase className="info-icon" />
                          <div>
                            <span className="info-label">
                              {t('candidates.occupation') || 'Occupation'}
                            </span>
                            <p className="info-value">{candidate.occupation || "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="text-center py-5">
              <Col>
                <p className="no-results">
                  {t('candidates.noResults') || 'No candidates found matching your search criteria.'}
                </p>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Candidates;
