var sha256 = require('js-sha256');

function myHash(pin) {
    return sha256(pin);
}

module.exports = { 'myHash':myHash};
