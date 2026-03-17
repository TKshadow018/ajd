import React, { useMemo } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import activityPhotos from '../data/activityPhotos.json';
import './OurActivity.css';

const OurActivity = () => {
  const { t, i18n } = useTranslation();

  const getTextByLanguage = (item, key) => {
    if (i18n.language === 'bn' && item[`${key}_bn`]) {
      return item[`${key}_bn`];
    }

    if (i18n.language === 'local' && item[`${key}_local`]) {
      return item[`${key}_local`];
    }

    return item[key];
  };

  const groupedActivities = useMemo(() => {
    const getTypeLabel = (item) => {
      if (i18n.language === 'bn' && item.type_bn) {
        return item.type_bn;
      }

      if (i18n.language === 'local' && item.type_local) {
        return item.type_local;
      }

      const labels = {
        protest: 'Protest',
        relief: 'Relief',
        community: 'Community Service',
        iftar: 'Iftar Program',
        advocacy: 'Advocacy'
      };

      return labels[item.type] || 'Other';
    };

    const grouped = activityPhotos.reduce((accumulator, item) => {
      const group = item.type || 'other';

      if (!accumulator[group]) {
        accumulator[group] = [];
      }

      accumulator[group].push(item);
      return accumulator;
    }, {});

    const typeOrder = ['protest', 'relief', 'community', 'iftar', 'advocacy', 'other'];

    return typeOrder
      .filter((type) => grouped[type] && grouped[type].length > 0)
      .map((type) => ({
        type,
        label: getTypeLabel(grouped[type][0]),
        items: grouped[type]
      }));
  }, [i18n.language]);

  return (
    <div className="our-activity-page">
      <section className="our-activity-header">
        <Container>
          <Row className="align-items-center">
            <Col lg={10} className="mx-auto text-center">
              <h1 className="our-activity-title">{t('activity.title') || 'Our Activity'}</h1>
              <p className="our-activity-subtitle">
                {t('activity.subtitle') || 'Highlights from our movement, programs, and community service.'}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="our-activity-gallery">
        <Container>
          {groupedActivities.map((group) => (
            <div key={group.type} className="activity-type-group">
              <h2 className="activity-type-title">{group.label}</h2>
              <Row className="g-4">
                {group.items.map((item, index) => (
                  <Col key={item.photopath} lg={4} md={6} sm={12}>
                    <Card className="activity-photo-card h-100">
                      <Card.Img
                        variant="top"
                        src={item.photopath}
                        alt={getTextByLanguage(item, 'title') || `${t('activity.photoAlt') || 'Activity photo'} ${index + 1}`}
                        className="activity-photo"
                      />
                      <Card.Body>
                        <h5 className="activity-photo-title">{getTextByLanguage(item, 'title')}</h5>
                        <Card.Text className="activity-photo-caption">{getTextByLanguage(item, 'description')}</Card.Text>
                        <p className="activity-photo-time mb-0">{getTextByLanguage(item, 'time')}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Container>
      </section>
    </div>
  );
};

export default OurActivity;
