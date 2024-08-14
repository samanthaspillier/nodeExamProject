'use strict';

// Function to validate that the name contains only letters and spaces
export function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
}

// Function to validate that a field contains only numbers
export function validateNumber(input) {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(input);
}
