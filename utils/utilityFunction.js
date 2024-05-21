import { required } from "nconf";

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

/**
 * Function to sort object keys by their values
 * @param  obj
 */
export const sortObjectPropertiesByValues = (obj) => {
    let arr = [];
    let sortedObj = {};

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({ 'key': prop, 'value': obj[prop] });
        }
    }

    arr.sort((a, b) => a.value - b.value);

    arr.forEach((ele) => {
        sortedObj[ele.key] = ele.value;
    });

    return sortedObj; // returns sorted object
}

/**
 * Function to sort object properties by their alphabetical order
 * @param  obj
 * @param {*} order
 */
export const sortObjectPropertiesByAlphabetialOrder = (obj, order = 'asc') => {
    const tempArry = Object.keys(obj);

    tempArry.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const sortedObj = {};

    if (order === 'desc') {
        for (let i = tempArry.length - 1; i >= 0; i--) {
            sortedObj[tempArry[i]] = obj[tempArry[i]];
        }
    } else {
        for (let i = 0; i < tempArry.length; i++) {
            sortedObj[tempArry[i]] = obj[tempArry[i]];
        }
    }
    return sortedObj;
}

/**
 * Function to upload file
 * @param  obj
 */
export const uploadFileUtility = (obj) => {
    if (obj.file) {
        const file = obj.file;
        const fileName = file.name;

        file.mv(__dirname + '/upload/' + fileName, (err) => {
            if (err) {
                return err;
            } else {
                return obj;
            }
        })
    }
}

export function pad(str, count = 2, char = '0') {
    str = str.toString();
    if (str.length < count)
        str = Array(count - str.length).fill(char).join('') + str;
    return str;
}
