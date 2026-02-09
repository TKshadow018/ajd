import candidatesEN from './candidates_en';
import candidatesBN from './candidates_bn';

export const getCandidates = (language = 'en') => {
  return language === 'en' ? candidatesEN : candidatesBN;
};

export default getCandidates;
