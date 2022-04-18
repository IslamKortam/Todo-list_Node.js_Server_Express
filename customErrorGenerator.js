const generate = (status, statusCode, msg) => {
    const error = new Error(msg);
    error.status = status;
    error.code = statusCode;
    return error;
}

module.exports = {generate}