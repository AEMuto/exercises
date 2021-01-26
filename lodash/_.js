const _ = {

    // CLAMP - Méthode 1 - Control Flow

    /***************************
     
    clamp(x, y, z) {
        if (x < y) {
            return y;
        } else if (x > z) {
            return z;
        } else if (x > y && x < z) {
            return x;
        } else {
            console.log('Error!');
        }
    }

    ***************************/

    // CLAMP - Méthode 2 - 'Solution'
    clamp(number, lower, upper) {
        const lowerClampedValue = Math.max(number, lower);
        const clampedValue = Math.min(lowerClampedValue, upper);
        return clampedValue;
    },

    inRange(num, start, end) {
        let newStart = 0;
        let newEnd = 0;
        if (end === undefined) {
            end = start;
            start = 0;
            if (num >= start && num < end) {
                return true;
            } else {
                return false;
            }
        } else if (start > end){
            newStart = end;
            newEnd = start;
            if (num >= newStart && num < newEnd) {
                return true;
            } else {
                return false;
            }
        } else if (num >= start && num < end) {
            return true;
        } else {
            return false;
        }
    },

    words(string) {
        let result = string.split(' ');
        return result;
    },

    pad(string, length) {
        if (string.length >= length) {
            return string;
        } else if (string.length < length) {
            let result = string;
            let padding = length - string.length;
            let paddingStart = Math.floor(padding / 2);
            let paddingEnd = Math.round(padding / 2);
            result = result.padStart(paddingStart + result.length);
            result = result.padEnd(paddingEnd + result.length);
            return result;            
        } else {
            return false;
        }
    },

    has(obj, key) {
        for (x in obj) {
            if (x === key) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    invert(obj) {
        let result = {};
        for (let key in obj) {
            let originalValue = obj[key];
            result[originalValue] = key;
        }
        return result;
    },

    findKey(obj, predicate) {
        for (let key in obj) {
            let parser = predicate(obj[key]);
            if (parser === true) {
                return key;
            }
        }
        return undefined;
    },

    drop(arr, num) {
        let result = [];
        if (num === undefined) {
            result = arr.slice(1);
            return result;
        } else if (num >= arr.length) {
            return result;
        } else if (num === 0) {
            return arr;
        } else {
            result = arr.slice(num);
            return result;
        }
    },

    dropWhile(arr, predicate) {
        let result = [];
        let parser = arr.findIndex((element, index) => !predicate(element, index, arr));
        //console.log(parser);
        if (parser !== -1) {
            result = this.drop(arr, parser);
            return result;
        } else {
            return result;
        }
    },

    chunk(arr, size) {
        if (size === undefined) {
            size = 1;
        }
        let result = [];
        for (let i = 0; i < arr.length; i += size) {
            arrChunk = arr.slice(i, (i + size));
            result.push(arrChunk);
        }
        return result;
    }


};

// console.log(_.pad('hi', 10));
// const indexIsSmallerThanElement = (element, index) => index < element;

const testArray = [1, 2, 0, 4];

console.log(_.chunk(testArray, 3));

// console.log(testArray.findIndex(indexIsSmallerThanElement));
// Do not write or modify code below this line.
module.exports = _;