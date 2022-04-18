
const {getMetaData, updateMetaData} = require('./fileHandling.js');
const validTodoStatusList = ["done", "in progress", "to-do"]
const validAttributes = ["title", "status"];
const requiredAttributes = ["title"];


const generateNewID = async () => {
    const metadata = await getMetaData();
    metadata.currentID += 1;
    const newID = metadata.currentID;
    updateMetaData(metadata);
    return newID;
}

const isValidStatus = (status) => {
    status = status.toLowerCase();
    return validTodoStatusList.includes(status);
}

const normalizeObjectKeys = (obj) => {
     let normalizedObj = {};
     for(key in obj){
        normalizedObj[key.toLowerCase()] = obj[key];
     }
     return normalizedObj;
}

const areValidAttributes = (attributes) => {
    let valid = true;
    for(const attributeKey in attributes){
        if(!validAttributes.includes(attributeKey)){
            valid = false;
        }
    }
    return valid;
}

const doRequiredAttributesExist = (attributes) => {
    let valid = true;
    requiredAttributes.forEach((attributeKey) => {
        if(!attributes.hasOwnProperty(attributeKey)){
            valid = false;
        }
    })
    return valid;
}




module.exports = {generateNewID, isValidStatus, normalizeObjectKeys, areValidAttributes, doRequiredAttributesExist}