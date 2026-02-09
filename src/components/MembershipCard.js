import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import Barcode from 'react-barcode';
import './MembershipCard.css';

/**
 * 3D Membership ID Card Component
 * Displays member information in a stylized card format
 */
const MembershipCard = ({ 
  formData, 
  compassPosition, 
  getGenderLabel, 
  getEducationLabel, 
  getPoliticalLabel, 
  t,
  onEdit,
  showActions = true,
  userId,
  memberId = null, // null means pending
  size = 'normal' // 'normal' or 'large'
}) => {
  const isPending = !memberId;
  const cardRef = useRef(null);

  // Generate profile URL for barcode
  const profileUrl = userId ? `ajd.ng/p/${userId.slice(-8)}` : 'ajd.ng/join';

  // Download card as image
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `${formData.name || 'membership'}-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <>
      <div className="id-card-wrapper">
        <div className="id-card-container" ref={cardRef}>
          {showActions && (
            <div className="id-card-actions">
              {!isPending && (
                <Button 
                  variant="light" 
                  size="sm" 
                  className="id-card-action-btn"
                  onClick={handleDownload}
                  title={t('personalityTest.preview.download') || 'Download'}
                >
                  <i className="bi bi-download"></i>
                </Button>
              )}
              {onEdit && (
                <Button 
                  variant="light" 
                  size="sm" 
                  className="id-card-action-btn"
                  onClick={onEdit}
                  title={t('personalityTest.preview.edit') || 'Edit'}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              )}
            </div>
          )}
          <div className={`id-card${size === 'large' ? ' id-card-large' : ''}`}>
          {/* Card Header */}
          <div className="id-card-header">
            <div className="id-card-logo">
              <img src="./logo/butterfly2.png" alt="Logo" className="id-card-logo-img" />
            </div>
            <div className="id-card-org">
              <h3>{t('nav.brand')}</h3>
              <span>{t('personalityTest.preview.membershipCard')}</span>
            </div>
          </div>
          
          {/* Card Body */}
          <div className="id-card-body">
            {/* Photo Section */}
            <div className="id-card-photo-section">
              {formData.photo || formData.photoURL ? (
                <img 
                  src={formData.photo ? URL.createObjectURL(formData.photo) : formData.photoURL} 
                  alt="Profile" 
                  className="id-card-photo"
                />
              ) : (
                <div className="id-card-photo-placeholder">
                  <i className="bi bi-person-fill"></i>
                </div>
              )}
              {formData.youthWing && (
                <span className="id-card-badge youth-badge">
                  {t('personalityTest.preview.youthWing')}
                </span>
              )}
            </div>
            
            {/* Info Section */}
            <div className="id-card-info">
              <div className="id-card-name">{formData.name}</div>
              <div className="id-card-profession">{formData.profession}</div>
              
              <div className="id-card-details">
                <div className="id-card-detail-row">
                  <i className="bi bi-person-badge"></i>
                  <span><strong>ID:</strong> {memberId || 'Pending'}</span>
                </div>
                <div className="id-card-detail-row">
                  <i className="bi bi-calendar3"></i>
                  <span>{formData.age} {t('personalityTest.preview.years')}</span>
                </div>
                <div className="id-card-detail-row">
                  <i className="bi bi-gender-ambiguous"></i>
                  <span>{getGenderLabel(formData.gender)}</span>
                </div>
                <div className="id-card-detail-row">
                  <i className="bi bi-mortarboard-fill"></i>
                  <span>{getEducationLabel(formData.education)}</span>
                </div>
                <div className="id-card-detail-row">
                  <i className="bi bi-envelope-fill"></i>
                  <span>{formData.email}</span>
                </div>
                <div className="id-card-detail-row">
                  <i className="bi bi-telephone-fill"></i>
                  <span>{formData.phone}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="id-card-footer">
            <div className="id-card-political">
              <i className="bi bi-compass"></i>
              <span>{getPoliticalLabel(compassPosition.x, compassPosition.y, t)}</span>
            </div>
            <div className="id-card-barcode">
              <Barcode 
                value={profileUrl}
                width={0.8}
                height={25}
                fontSize={8}
                margin={0}
                background="transparent"
                lineColor="#1a5490"
                displayValue={true}
              />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="id-card-hologram"></div>
        </div>
      </div>
    </div>
      
      {/* Additional info below card */}
      {(formData.politicalActivity || formData.about) && (
        <div className="id-card-additional-wrapper">
          <Card className="id-card-additional">
            <Card.Body>
              <h5 className="text-center mb-3" style={{ color: '#1a5490' }}>
                <i className="bi bi-info-circle me-2"></i>
                {t('personalityTest.preview.additionalInfo')}
              </h5>
              {formData.politicalActivity && (
                <div className="additional-info-item">
                  <strong><i className="bi bi-flag me-2"></i>{t('join.form.politicalActivity')}:</strong>
                  <p>{formData.politicalActivity}</p>
                </div>
              )}
              {formData.about && (
                <div className="additional-info-item">
                  <strong><i className="bi bi-chat-quote me-2"></i>{t('join.form.about')}:</strong>
                  <p>{formData.about}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default MembershipCard;
