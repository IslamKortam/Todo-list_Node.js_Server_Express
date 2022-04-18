const {updateItems, getItems} = require('./fileHandling.js');
const {generateNewID, isValidStatus} = require('./helperFunctions.js')


const addTodoItem = async (todoItem) => {
    if(!todoItem.status){
        todoItem.status = 'to-do';
    }
    if(!isValidStatus(todoItem.status)){
        throw RangeError("Not a valid status")
    }
    const newID = await generateNewID();
    const item = { id: newID, ...todoItem};
    item.status = item.status.toLowerCase()
    const items = await getItems();
    items.push(item);
    updateItems(items);
}


const deleteTodoItem = async (id) => {
    if(isNaN(id)){
        throw TypeError('Expected a Number found NaN');
    }
    
    let items = await getItems();

    items = items.filter((item) => item.id !== id);
    updateItems(items);
}


const editTodoItem = async (id, editedAttributes) => {
    if(isNaN(id)){
        throw TypeError('Expected the id to be a Number found NaN')
    }
    if(editedAttributes.status){
        if(!isValidStatus(editedAttributes.status)){
            //Status found but not valid
            throw RangeError("Not a valid status");
        }
        editedAttributes.status = editedAttributes.status.toLowerCase();
    }

    const items = await getItems();
    const itemIndex = items.findIndex((item) => item.id === id);
    if(itemIndex === -1){
        throw RangeError('No such item');
    }

    for(const attributeKey in editedAttributes){
        items[itemIndex][attributeKey] = editedAttributes[attributeKey];
    }
    updateItems(items);
}


const listTodoItem = async (filters) => {
    if(filters.status){
        if(!isValidStatus(filters.status)){
            throw RangeError('Not a valid Status');
        }
        filters.status = filters.status.toLowerCase();
    }
    if(filters.id){
        if(isNaN(filters.id)){
            throw TypeError('Expected id to be a Number, found a NaN');
        }
        filters.id = +filters.id;
    }

    let items = await getItems();
    items = items.filter((item) => {
        let isValidItem = true;
        for(const filterKey in filters){
            isValidItem = isValidItem && (item[filterKey] === filters[filterKey]);
        }
        return isValidItem;
    });
    return items;
}


module.exports = {addTodoItem, deleteTodoItem, editTodoItem, listTodoItem}