import React from 'react';
import { Container } from 'react-bootstrap';
import VoteComponent from '../components/VoteComponent';
import './Vote.css';

function Vote() {
  return (
    <div className="vote-page">
      <Container>
        <VoteComponent />
      </Container>
    </div>
  );
}

export default Vote;
