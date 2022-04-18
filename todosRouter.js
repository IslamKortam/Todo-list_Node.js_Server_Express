const {addTodoItem, deleteTodoItem, editTodoItem, listTodoItem} = require('./crudOperations')
const {normalizeObjectKeys, areValidAttributes, doRequiredAttributesExist} = require('./helperFunctions');
const customErrorGenerator = require('./customErrorGenerator');

const todosMiddlewareValidators = require('./todo_middleware_validator');

const Express = require('express');
const router = Express.Router();

router.use(Express.json())
router.use('/:id', todosMiddlewareValidators.validateID);
router.use(['/', '/:id'], todosMiddlewareValidators.validateBody);
router.use(['/', '/:id'], todosMiddlewareValidators.validateAttributes);


router.use( (err, req, res, next) => {
    if(!err.status){
        // Not a cusom error, a server error
        err.message = 'Something went wrong'
        err.status = 500;
    }

    res.status(err.status).send(err.message);
} )


/* ***************************************Listing*********************************** */
router.get('/', async function (req, res) {
    const items = await listTodoItem({})  //Empty filter to return all items 
    res.send(items);
})


router.get('/:id', async function (req, res) {
    const itemId = req.params.id;
    const items = await listTodoItem({id: itemId});
    let todoItem = items[0];
    
    //if todoItem is undefined (No crossponding item with same id, return {}
    //todoItem = todoItem || {};
    todoItem = todoItem ? todoItem : {};   
    res.send(todoItem);
})

/* ***************************************Adding*********************************** */
router.post('/', async (req, res) => {
    let item = req.body;
    
    //Normaliztion to lower case:
    item = normalizeObjectKeys(item);

    try{
        await addTodoItem(item); 
        return res.json({success: true});
    }catch(error){
        console.log(error);
        res.status(500);
        res.message = 'Internal Server Error';
        res.send();
    }
})


/* ***************************************Editig*********************************** */
router.put('/:id', async (req, res) => {
    const id = +req.params.id;
    let editedAttributes = req.body;
    
    //Normaliztion to lower case:
    editedAttributes = normalizeObjectKeys(editedAttributes);

    try{
        await editTodoItem(id, editedAttributes); 
        return res.json({success: true});
    }catch(error){
        res.status(500);
        res.message = 'Internal Server Error';
        res.send();
    }
})

/* ***************************************Deleting*********************************** */
router.delete('/:id', async (req, res) => {
    const id = +req.params.id;

    try{
        await deleteTodoItem(id); 
        return res.json({success: true});
    }catch(error){
        if(error.status){
            res.status(error.status).send(error.message);
        }else{
            res.status(500);
            res.message = 'Internal Server Error';
            res.send();
        }
    }
})

module.exports = router;