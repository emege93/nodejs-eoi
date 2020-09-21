const { request } = require("express");

module.exports = {
    getErrorMessage: (statusCode, message) => {
        if (statusCode == 404){
            message = 'Not foud';
        }
        return {
            error: message
        }
    }
}