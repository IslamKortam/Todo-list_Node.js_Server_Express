const req = require('express/lib/request');
const customErrorGenerator = require('./customErrorGenerator');
const { normalizeObjectKeys, areValidAttributes, doRequiredAttributesExist, isValidStatus } = require('./helperFunctions');



const validateID = (req, res, next) => {
    if(req.method == 'POST'){
        return next(customErrorGenerator.generate(422, 'INVALID REQ', 'id is auto generated'))
    }

    const id = req.params.id;
    if(isNaN(id) || (id.indexOf('.') !== -1)){
        return next(customErrorGenerator.generate(422, 'INVALID_ID', 'id must be an Integer'))
    }

    return next();
} 



const validateBody = (req, res, next) => {
    const body = req.body;
    switch(req.method){
        case 'PUT':
        case 'POST':
            if(Object.keys(body).length === 0){ //Body is empty
                return next(customErrorGenerator.generate(422, 'INVALID_REQ', `requst body in ${req.method} method cannot be empty`));
            }
            break;
        default:
            if(Object.keys(body).length !== 0){ //Body isnot empty
                return next(customErrorGenerator.generate(422, 'INVALID_REQ', `requst body in ${req.method} method must be empty`));
            }
            break;
    }
    return next();
}

const validateAttributes = (req, res, next) => {
    let attributes = req.body;
    attributes = normalizeObjectKeys(attributes);
    if(!areValidAttributes(attributes)){
        return next(customErrorGenerator.generate(422, 'INVALID_ATTRIBUTES', `requst body contains invalid attributes`));
    }
    if((req.method == 'POST') && (!doRequiredAttributesExist(attributes))){
        return next(customErrorGenerator.generate(422, 'INVALID_ATTRIBUTES', `requst body is missing required attributes 'title'`));
    }
    if(attributes.status && !isValidStatus(attributes.status)){
        return next(customErrorGenerator.generate(422, 'INVALID_ATTRIBUTES', `requst body contains invalid attribute value 'status'`));
    }
    return next();
}




module.exports = {validateID, validateBody, validateAttributes};