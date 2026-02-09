/**
 * Form validation utilities
 */

import { VALIDATION } from './constants';

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

/**
 * Phone number validation regex
 */
export const PHONE_REGEX = /^[\d\s\-+()]+$/;

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  return email && EMAIL_REGEX.test(email.trim());
};

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether the phone is valid
 */
export const isValidPhone = (phone) => {
  return phone && PHONE_REGEX.test(phone.trim());
};

/**
 * Checks if a value is not empty (after trimming)
 * @param {string} value - Value to check
 * @returns {boolean} - Whether the value is not empty
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Checks if text meets minimum length requirement
 * @param {string} text - Text to check
 * @param {number} minLength - Minimum length required
 * @returns {boolean} - Whether the text meets the requirement
 */
export const hasMinLength = (text, minLength) => {
  return text && text.trim().length >= minLength;
};

/**
 * Checks if age is valid for membership
 * @param {number|string} age - Age to validate
 * @returns {boolean} - Whether the age is valid
 */
export const isValidAge = (age) => {
  const ageNum = Number(age);
  return ageNum >= VALIDATION.MIN_AGE && ageNum <= VALIDATION.MAX_AGE;
};

/**
 * Checks if person qualifies for youth wing
 * @param {number|string} age - Age to check
 * @returns {boolean} - Whether the person qualifies for youth wing
 */
export const qualifiesForYouthWing = (age) => {
  const ageNum = Number(age);
  return ageNum >= VALIDATION.MIN_AGE && ageNum < VALIDATION.YOUTH_WING_MAX_AGE;
};

/**
 * Validates the membership form data
 * @param {Object} formData - Form data to validate
 * @param {Function} t - Translation function
 * @returns {Object} - Object containing validation errors (empty if valid)
 */
export const validateMembershipForm = (formData, t) => {
  const errors = {};
  
  if (!isNotEmpty(formData.name)) {
    errors.name = t('join.form.errors.nameRequired');
  }
  
  if (!formData.age || !isValidAge(formData.age)) {
    errors.age = t('join.form.errors.ageMin');
  }
  
  if (!formData.gender) {
    errors.gender = t('join.form.errors.genderRequired');
  }
  
  if (!isNotEmpty(formData.profession)) {
    errors.profession = t('join.form.errors.professionRequired');
  }
  
  if (!formData.education) {
    errors.education = t('join.form.errors.educationRequired');
  }
  
  if (!isValidEmail(formData.email)) {
    errors.email = t('join.form.errors.emailInvalid');
  }
  
  if (!isValidPhone(formData.phone)) {
    errors.phone = t('join.form.errors.phoneInvalid');
  }
  
  if (!hasMinLength(formData.about, VALIDATION.ABOUT_MIN_LENGTH)) {
    errors.about = t('join.form.errors.aboutMin');
  }
  
  if (!formData.agreePhilosophy) {
    errors.agreePhilosophy = t('join.form.errors.agreePhilosophyRequired');
  }

  return errors;
};
