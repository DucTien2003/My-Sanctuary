const extend = Object.assign;

// Add zero
const addZero = (number) => {
  return number < 10 ? '0' + number : number;
};

const isEmpty = (value) => {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  );
};

const showQuantity = (number) => {
  return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number;
};

// Reformat path
const formatPath = (path) => {
  return path.toLowerCase().replace(/\s+/g, '-');
};

// Remove slash at the end of string
const removeEndSlash = (str) => {
  return str.replace(/\/+$/, '');
};

// Sort by last number of string
const sortByLastNumber = (arr, ascending = false) => {
  return arr.sort((a, b) => {
    // Split the string by spaces and get the last element
    const numA = parseFloat(a.split(' ').pop());
    const numB = parseFloat(b.split(' ').pop());

    return ascending ? numB - numA : numA - numB;
  });
};

export {
  extend,
  addZero,
  isEmpty,
  showQuantity,
  formatPath,
  removeEndSlash,
  sortByLastNumber,
};
