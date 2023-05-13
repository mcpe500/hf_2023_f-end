export function generateLabel(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            result += ' ' + str[i];
        } else {
            result += str[i];
        }
    }
    return result.charAt(0).toUpperCase() + result.slice(1).trim();
}

