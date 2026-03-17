import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaProjectDiagram, FaHandsHelping } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { districts } from '../data/districts';
import BangladeshMap from '../components/BangladeshMap';
import './Footprint.css';

const Footprint = () => {
  const { i18n } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const isLanguageEnglish = i18n.language === 'en';

  const getDistrictDisplayName = () => {
    return isLanguageEnglish ? selectedDistrict.name : selectedDistrict.namebn;
  };

  const getDistrictDescription = () => {
    return isLanguageEnglish ? selectedDistrict.description : selectedDistrict.descriptionbn;
  };

  return (
    <div className="footprint-page">
      {/* Header Section */}
      <section className="footprint-header">
        <Container>
          <Row className="align-items-center">
            <Col lg={10} className="mx-auto text-center">
              <h1 className="footprint-title">
                {isLanguageEnglish ? 'Our Footprint' : 'আমাদের পদচিহ্ন'}
              </h1>
              <p className="footprint-subtitle">
                {isLanguageEnglish
                  ? 'Explore our organizational presence and community projects across Bangladesh'
                  : 'বাংলাদেশ জুড়ে আমাদের সাংগঠনিক উপস্থিতি এবং কমিউনিটি প্রকল্পগুলি অন্বেষণ করুন'}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map and Data Section */}
      <section className="footprint-content">
        <Container fluid>
          <Row className="g-4">
            {/* Map Section */}
            <Col lg={6} className="map-section">
              <BangladeshMap 
                selectedDistrict={selectedDistrict} 
                onDistrictSelect={setSelectedDistrict}
              />
              <p className="map-instruction">
                {isLanguageEnglish ? 'Click on a district to view details' : 'একটি জেলায় ক্লিক করুন'}
              </p>
            </Col>

            {/* Data Section */}
            <Col lg={6} className="data-section">
              <Card className="district-info-card">
                {/* Header with District Name */}
                <Card.Header className="district-header">
                  <div className="district-title-row">
                    <h2 className="district-name fancy">
                      {getDistrictDisplayName()}
                    </h2>
                  </div>
                  <p className="district-id" style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                    {isLanguageEnglish ? selectedDistrict.underDivision : selectedDistrict.underDivisionbn}
                  </p>
                </Card.Header>

                {/* Description */}
                <Card.Body className="district-body">
                  <div className="description-section">
                    <h5 className="section-title">
                      {isLanguageEnglish ? 'About' : 'বিবরণ'}
                    </h5>
                    <p className="description-text">
                      {getDistrictDescription()}
                    </p>
                  </div>

                  {/* Activities Section */}
                  <div className="activities-section">
                    <h5 className="section-title">
                      {isLanguageEnglish ? 'Our Information' : 'আমাদের তথ্য'}
                    </h5>
                    <div className="activities-list">
                      <div className="activity-item">
                        <span className="activity-bullet">▸</span>
                        <span className="activity-text">
                          <strong>{isLanguageEnglish ? 'District Committee Chief:' : 'জেলা কমিটি প্রধান:'}</strong> {isLanguageEnglish ? selectedDistrict.personInCharge : selectedDistrict.personInChargebn}
                        </span>
                      </div>
                      <div className="activity-item">
                        <span className="activity-bullet">▸</span>
                        <span className="activity-text">
                          <strong>{isLanguageEnglish ? 'Total Members:' : 'মোট সদস্য:'}</strong> {isLanguageEnglish ? selectedDistrict.totalMembers : selectedDistrict.totalMembersbn}
                        </span>
                      </div>
                      <div className="activity-item">
                        <span className="activity-bullet">▸</span>
                        <span className="activity-text">
                          <strong>{isLanguageEnglish ? 'Approval Rating:' : 'অনুমোদন হার:'}</strong> {isLanguageEnglish ? selectedDistrict.approvalRating : selectedDistrict.approvalRatingbn}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="info-footer">
                    <p className="small-text">
                      {isLanguageEnglish
                        ? 'Our initiatives in this district focus on community development and empowerment.'
                        : 'এই জেলায় আমাদের উদ্যোগ এবং কর্মসূচি সম্প্রদায়ের উন্নয়ন এবং ক্ষমতায়নের উপর দৃষ্টি নিবদ্ধ করে।'}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Districts Quick Access */}
      <section className="districts-list-section">
        <Container>
          <h3 className="section-heading">
            {isLanguageEnglish ? 'All Districts' : 'সকল জেলা'}
          </h3>
          <Row className="g-2">
            {districts.map((district) => (
              <Col key={district.id} xs={6} sm={4} md={3} lg={2}>
                <button
                  className={`district-btn ${
                    selectedDistrict.id === district.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedDistrict(district)}
                  title={isLanguageEnglish ? district.name : district.namebn}
                >
                  {isLanguageEnglish ? district.name : district.namebn}
                </button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Footprint;
