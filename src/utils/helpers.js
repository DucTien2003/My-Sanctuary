export const extend = Object.assign;

// Add zero
export const addZero = (number) => {
  return number < 10 ? '0' + number : number;
};

export const showQuantity = (number) => {
  return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number;
};

export const isEmpty = (value) => {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  );
};
