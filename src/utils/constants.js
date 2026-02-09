/**
 * Application-wide constants
 */

// Supported languages for i18n
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'local', name: 'নারায়ণগঞ্জ', flag: '🏠' }
];

// Available theme options
export const THEMES = [
  { id: 'default', name: 'Ocean Blue', class: 'default' },
  { id: 'sunset', name: 'Warm Sunset', class: 'sunset' },
  { id: 'forest', name: 'Forest Green', class: 'forest' },
  { id: 'night', name: 'Purple Night', class: 'night' },
  { id: 'ocean', name: 'Deep Ocean', class: 'ocean' },
  { id: 'rose', name: 'Rose Gold', class: 'rose' },
  { id: 'autumn', name: 'Autumn Leaves', class: 'autumn' },
  { id: 'mint', name: 'Fresh Mint', class: 'mint' },
  { id: 'mono', name: 'Monochrome', class: 'mono' },
  { id: 'huff-puff', name: 'Huff Puff', class: 'huff-puff' }
];

// Form validation constraints
export const VALIDATION = {
  MIN_AGE: 18,
  MAX_AGE: 120,
  YOUTH_WING_MAX_AGE: 30,
  ABOUT_MIN_LENGTH: 50,
};

// Firebase collection names
export const COLLECTIONS = {
  MEMBERSHIPS: 'memberships',
};

// Storage paths
export const STORAGE_PATHS = {
  MEMBERSHIP_PHOTOS: 'membership-photos',
};

// Application status values
export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};
