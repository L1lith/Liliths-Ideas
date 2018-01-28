function isInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str;
}
module.exports = isInteger;
