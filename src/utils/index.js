/**
 * Utility functions index - re-exports all utilities
 */

// Constants
export * from './constants';

// Cursor utilities
export { 
  useDynamicCursor, 
  generateCursorUrl, 
  getColorFromElement, 
  getThemeCursorColor,
  isTransparentColor 
} from './cursor';

// Validation utilities
export { 
  validateMembershipForm,
  isValidEmail,
  isValidPhone,
  isNotEmpty,
  hasMinLength,
  isValidAge,
  qualifiesForYouthWing,
  EMAIL_REGEX,
  PHONE_REGEX
} from './validation';

// Theme utilities
export { applyTheme, getSavedTheme } from './theme';
