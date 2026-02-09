import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar, Table } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaUsers, FaChartPie, FaExclamationTriangle, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import voteChoices from '../data/vote-choice';
import './IssueDashboard.css';

const IssueDashboard = () => {
  // Calculate all statistics
  const stats = useMemo(() => {
    const totalIssues = voteChoices.length;
    
    // Issues with unanimous support (no opposition)
    const unanimousIssues = voteChoices.filter(item => item.opposed_by.length === 0);
    
    // Issues with opposition
    const contestedIssues = voteChoices.filter(item => item.opposed_by.length > 0);
    
    // Party opposition count
    const partyOppositionCount = {};
    voteChoices.forEach(item => {
      item.opposed_by.forEach(party => {
        partyOppositionCount[party] = (partyOppositionCount[party] || 0) + 1;
      });
    });
    
    // Sort parties by opposition count
    const sortedParties = Object.entries(partyOppositionCount)
      .sort((a, b) => b[1] - a[1]);
    
    // Most contested issues (by number of opposing parties)
    const mostContested = [...contestedIssues]
      .sort((a, b) => b.opposed_by.length - a.opposed_by.length)
      .slice(0, 10);
    
    // Issues by opposition count ranges
    const oppositionRanges = {
      none: unanimousIssues.length,
      low: contestedIssues.filter(i => i.opposed_by.length >= 1 && i.opposed_by.length <= 3).length,
      medium: contestedIssues.filter(i => i.opposed_by.length >= 4 && i.opposed_by.length <= 6).length,
      high: contestedIssues.filter(i => i.opposed_by.length >= 7).length
    };
    
    // Category analysis (group by issue type keywords)
    const categories = {
      'সংবিধান ও আইন': [],
      'নির্বাচন ও গণতন্ত্র': [],
      'বিচার বিভাগ': [],
      'দুর্নীতি দমন': [],
      'স্থানীয় সরকার': [],
      'প্রশাসন': [],
      'অন্যান্য': []
    };
    
    voteChoices.forEach(item => {
      const issue = item.issue.toLowerCase();
      if (issue.includes('সংবিধান') || issue.includes('অনুচ্ছেদ') || issue.includes('আইন') || issue.includes('জরুরি')) {
        categories['সংবিধান ও আইন'].push(item);
      } else if (issue.includes('নির্বাচন') || issue.includes('ভোট') || issue.includes('সংসদ') || issue.includes('দল') || issue.includes('গণভোট')) {
        categories['নির্বাচন ও গণতন্ত্র'].push(item);
      } else if (issue.includes('বিচার') || issue.includes('আদালত') || issue.includes('বিচারক') || issue.includes('আইনজীবী')) {
        categories['বিচার বিভাগ'].push(item);
      } else if (issue.includes('দুর্নীতি') || issue.includes('সম্পদ') || issue.includes('কালো') || issue.includes('স্বচ্ছতা')) {
        categories['দুর্নীতি দমন'].push(item);
      } else if (issue.includes('স্থানীয়') || issue.includes('ইউনিয়ন') || issue.includes('পৌরসভা')) {
        categories['স্থানীয় সরকার'].push(item);
      } else if (issue.includes('প্রশাসন') || issue.includes('পুলিশ') || issue.includes('সরকারি') || issue.includes('বিভাগ')) {
        categories['প্রশাসন'].push(item);
      } else {
        categories['অন্যান্য'].push(item);
      }
    });
    
    return {
      totalIssues,
      unanimousIssues,
      contestedIssues,
      partyOppositionCount,
      sortedParties,
      mostContested,
      oppositionRanges,
      categories
    };
  }, []);

  const unanimousPercentage = ((stats.unanimousIssues.length / stats.totalIssues) * 100).toFixed(1);
  const contestedPercentage = ((stats.contestedIssues.length / stats.totalIssues) * 100).toFixed(1);

  return (
    <div className="issue-dashboard">
      <Container>
        <h2 className="dashboard-title">
          <FaChartPie className="title-icon" />
          সংস্কার প্রস্তাব পরিসংখ্যান
        </h2>
        <p className="dashboard-subtitle">জুলাই জাতীয় সনদ ২০২৫ - ৮৪টি সংস্কার প্রস্তাবের বিশ্লেষণ</p>

        {/* Summary Cards */}
        <Row className="summary-cards">
          <Col md={3} sm={6}>
            <Card className="stat-card total-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaChartPie />
                </div>
                <div className="stat-content">
                  <h3>{stats.totalIssues}</h3>
                  <p>মোট প্রস্তাব</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="stat-card unanimous-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-content">
                  <h3>{stats.unanimousIssues.length}</h3>
                  <p>সর্বসম্মত সমর্থন</p>
                  <small>{unanimousPercentage}%</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="stat-card contested-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaExclamationTriangle />
                </div>
                <div className="stat-content">
                  <h3>{stats.contestedIssues.length}</h3>
                  <p>বিতর্কিত প্রস্তাব</p>
                  <small>{contestedPercentage}%</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="stat-card parties-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-content">
                  <h3>{stats.sortedParties.length}</h3>
                  <p>বিরোধী দল</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Opposition Distribution */}
        <Row className="mt-4">
          <Col lg={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaThumbsDown className="card-header-icon" />
                বিরোধিতার মাত্রা অনুযায়ী প্রস্তাব
              </Card.Header>
              <Card.Body>
                <div className="opposition-bars">
                  <div className="bar-item">
                    <div className="bar-label">
                      <span>সর্বসম্মত (কোনো বিরোধিতা নেই)</span>
                      <Badge bg="success">{stats.oppositionRanges.none}</Badge>
                    </div>
                    <ProgressBar 
                      variant="success" 
                      now={(stats.oppositionRanges.none / stats.totalIssues) * 100} 
                    />
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">
                      <span>কম বিরোধিতা (১-৩ দল)</span>
                      <Badge bg="info">{stats.oppositionRanges.low}</Badge>
                    </div>
                    <ProgressBar 
                      variant="info" 
                      now={(stats.oppositionRanges.low / stats.totalIssues) * 100} 
                    />
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">
                      <span>মাঝারি বিরোধিতা (৪-৬ দল)</span>
                      <Badge bg="warning">{stats.oppositionRanges.medium}</Badge>
                    </div>
                    <ProgressBar 
                      variant="warning" 
                      now={(stats.oppositionRanges.medium / stats.totalIssues) * 100} 
                    />
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">
                      <span>উচ্চ বিরোধিতা (৭+ দল)</span>
                      <Badge bg="danger">{stats.oppositionRanges.high}</Badge>
                    </div>
                    <ProgressBar 
                      variant="danger" 
                      now={(stats.oppositionRanges.high / stats.totalIssues) * 100} 
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaThumbsUp className="card-header-icon" />
                সর্বসম্মত সমর্থিত প্রস্তাব
              </Card.Header>
              <Card.Body className="unanimous-list">
                <div className="unanimous-scroll">
                  {stats.unanimousIssues.map(item => (
                    <div key={item.serial_number} className="unanimous-item">
                      <Badge bg="success" className="item-number">{item.serial_number}</Badge>
                      <span className="item-title">{item.issue}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Party Opposition Ranking */}
        <Row className="mt-4">
          <Col lg={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaUsers className="card-header-icon" />
                দল অনুযায়ী বিরোধিতার সংখ্যা
              </Card.Header>
              <Card.Body>
                <div className="party-ranking">
                  {stats.sortedParties.map(([party, count], index) => (
                    <div key={party} className="party-item">
                      <div className="party-rank">#{index + 1}</div>
                      <div className="party-info">
                        <span className="party-name">{party}</span>
                        <ProgressBar 
                          variant={count > 10 ? 'danger' : count > 5 ? 'warning' : 'info'}
                          now={(count / stats.totalIssues) * 100}
                          className="party-bar"
                        />
                      </div>
                      <Badge 
                        bg={count > 10 ? 'danger' : count > 5 ? 'warning' : 'info'}
                        className="party-count"
                      >
                        {count} টি প্রস্তাব
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaTimesCircle className="card-header-icon" />
                সবচেয়ে বিতর্কিত প্রস্তাব
              </Card.Header>
              <Card.Body>
                <Table responsive className="contested-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>প্রস্তাব</th>
                      <th>বিরোধী দল</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.mostContested.map(item => (
                      <tr key={item.serial_number}>
                        <td>
                          <Badge bg="secondary">{item.serial_number}</Badge>
                        </td>
                        <td className="issue-name">{item.issue}</td>
                        <td>
                          <Badge bg="danger">{item.opposed_by.length} দল</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Detailed Opposition by Issue */}
        <Row className="mt-4">
          <Col>
            <Card className="dashboard-card">
              <Card.Header>
                <FaExclamationTriangle className="card-header-icon" />
                বিতর্কিত প্রস্তাব বিস্তারিত
              </Card.Header>
              <Card.Body>
                <div className="detailed-opposition">
                  {stats.contestedIssues
                    .sort((a, b) => b.opposed_by.length - a.opposed_by.length)
                    .map(item => (
                    <div key={item.serial_number} className="opposition-detail-item">
                      <div className="detail-header">
                        <Badge bg="primary" className="issue-number">{item.serial_number}</Badge>
                        <h5 className="issue-title">{item.issue}</h5>
                        <Badge bg="danger" className="opposition-count">
                          {item.opposed_by.length} দল বিরোধী
                        </Badge>
                      </div>
                      <div className="opposing-parties">
                        {item.opposed_by.map(party => (
                          <Badge key={party} bg="outline-danger" className="party-badge">
                            {party}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Summary Stats Footer */}
        <Row className="mt-4">
          <Col>
            <Card className="summary-footer">
              <Card.Body>
                <Row>
                  <Col md={4} className="summary-stat">
                    <h4>গড় বিরোধিতা</h4>
                    <p>
                      {(stats.contestedIssues.reduce((sum, item) => sum + item.opposed_by.length, 0) / 
                        (stats.contestedIssues.length || 1)).toFixed(1)} দল/প্রস্তাব
                    </p>
                  </Col>
                  <Col md={4} className="summary-stat">
                    <h4>সর্বোচ্চ বিরোধিতা</h4>
                    <p>
                      {stats.mostContested[0]?.opposed_by.length || 0} দল 
                      ({stats.mostContested[0]?.issue || 'N/A'})
                    </p>
                  </Col>
                  <Col md={4} className="summary-stat">
                    <h4>ঐকমত্যের হার</h4>
                    <p>{unanimousPercentage}% প্রস্তাব সর্বসম্মত</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IssueDashboard;
