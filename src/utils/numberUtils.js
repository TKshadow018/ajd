export const convertNumberToLang = (value, to) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = String(value);
  if (to === 'bn') {
    enDigits.forEach((enDigit, index) => {
      result = result.replace(new RegExp(enDigit, 'g'), bnDigits[index]);
    });
  } else if (to === 'en') {
    bnDigits.forEach((bnDigit, index) => {
      result = result.replace(new RegExp(bnDigit, 'g'), enDigits[index]);
    });
  }
  return result;
};