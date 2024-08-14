'use strict';

// Function to validate that the name contains only letters and spaces
function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
}

// Function to validate that a field contains only numbers
function validateNumber(input) {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(input);
}

// Export the functions (for environments like Node.js, or use global functions for front-end)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateName, validateNumber };
}
