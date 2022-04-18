const fs = require('fs');
const fsPromises = fs.promises;

const itemsFilePath = './DB/items.json';
const metaDataFilePath = './DB/metadata.json'

const updateItems = async (newList) => {
    const newListStringfied = JSON.stringify(newList, null, 4);
    await fs.writeFile(itemsFilePath, newListStringfied, () => {});
}

const getItems = async () => {
    const fileHandler = await fsPromises.open(itemsFilePath, 'r');
    const itemsStringfied = await fileHandler.readFile('utf-8');
    fileHandler.close();
    const items = JSON.parse(itemsStringfied);
    return items;
}



const getMetaData = async () =>{
    const fileHandler = await fsPromises.open(metaDataFilePath, 'r');
    const metadataStr = await fileHandler.readFile('utf-8');
    fileHandler.close()
    const metadata = JSON.parse(metadataStr);
    return metadata;
}

const updateMetaData = async (metadata) =>{
    const metadataStringfied = JSON.stringify(metadata, null, 4);
    await fs.writeFile(metaDataFilePath, metadataStringfied, () => {});
}

module.exports = {updateItems, getItems, getMetaData, updateMetaData}