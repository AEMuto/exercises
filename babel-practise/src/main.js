// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

const validateCred = array => {
    let total = 0;
    let checkNum = array[array.length - 1];
    // console.log(checkNum);
    let slicedArray = array.slice(0, array.length - 1);
    // let correctedArray = slicedArray;
    let reversedArray = slicedArray.reverse();
    // console.log(correctedArray);
    for (let i = 0; i < reversedArray.length; i++) {
        if (i % 2 === 0 && reversedArray[i] * 2 > 9) { 
            total += ((reversedArray[i] * 2) - 9);
            // console.log(reversedArray[i], 'Valide, double supérieur à 9');
        } else if (i % 2 === 0 && reversedArray[i] * 2 < 9) { 
            total += (reversedArray[i] * 2);
            // console.log(reversedArray[i], 'Valide, double inférieur à 9');
        } else { 
            total += reversedArray[i];
            // console.log(reversedArray[i], 'Invalide');
        }
    } if ((total + checkNum) % 10 === 0) {
        // console.log(total + checkNum);
        return true;
    } else if ((total % 10) === 0 && (total + checkNum) % 10 !== 0){
        checkNum = 0;
        slicedArray.push(checkNum);
        return slicedArray;
    } else {
        checkNum = (10 - (total % 10));
        slicedArray.push(checkNum);
        return slicedArray;
    }
};

batch.forEach(a => console.log(validateCred(a)));

const findInvalidCards = card => {
    let invalidCards = [];
    invalidCards = card.filter(a => validateCred(a) !== true);
    return invalidCards;
};

// console.log(findInvalidCards(batch));

let invalidCards = findInvalidCards(batch);

// console.log(invalidCards);

/***********************************************************

After finding all the invalid credit card numbers,
it’s also necessary to identify the credit card companies
that have possibly issued these faulty numbers.
Create a function, idInvalidCardCompanies() that
has one parameter for a nested array of invalid
numbers and returns an array of companies.

Currently, there 4 accepted companies which each have
unique first digits. The following table shows which
digit is unique to which company:

First Digit	Company
3	Amex (American Express)
4	Visa
5	Mastercard
6	Discover

If the number doesn’t start with any of the numbers
listed, print out a message like: “Company not found”.

idInvalidCardCompanies() should return an array of
companies that have mailed out cards with invalid numbers.
This array should NOT contain duplicates, i.e. even if
there are two invalid Visa cards, "Visa" should only appear
once in the array.

***********************************************************/

const idInvalidCardCompanies = card => {
    let companies = [];
    for (let i = 0; i < card.length - 1; i++) {
        if (card[i][0] === 3) {
            companies.push('Amex');
        } else if (card[i][0] === 4) {
            companies.push('Visa');
        } else if (card[i][0] === 5) {
            companies.push('Mastercard');
        } else if (card[i][0] === 6) {
            companies.push('Discover');
        } else {
            console.log('Invalide');
        }
    } return [...new Set(companies.sort())];
};

console.log(idInvalidCardCompanies(invalidCards));


/*
*
* To make it easier to test credit card numbers, create a function
* that accepts a string and converts it into an array of numbers like
* the initially provided arrays. (Check the hint for a helpful function)
*
*/

let testCard = '4539689887705798'

let returnToArray = x => {
    let array = []; 
    for (let i = 0; i < x.length; i++) {
        array.push(Number(x[i]));
    } return array;
 };

console.log(validateCred(returnToArray(testCard))); // Return true

/* Create a function that will convert invalid numbers into valid numbers. */

// Reprendre la function validateCred, ajouter une variable égale à un array correctedCred
// Lorsque (sum + checkNum) % 10 !== 0, modifier checkNum et le push dans slicedArray
// return correctedCred = slicedArray.push(checkNum);

let correctedCred = card => {
    let invalidCards = [];
    invalidCards = card.filter(a => validateCred(a) !== true);
    return invalidCards;
};

console.log(correctedCred(batch));