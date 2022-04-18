
const Express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = Express();
const todosRouter = require('./todosRouter');


//We use path.join to create a path independent of the OS, (the path in linux is like: /home/user, while in windows: D:\home\user)
const homeFilePath = path.join(__dirname, 'home', 'home.html')


//Morgan is a middleware for logging requests
app.use(morgan('combined'))

app.use('/todos', todosRouter)


app.get('/', (req, res) => {
    res.sendFile(homeFilePath);
})

app.listen(3000)

console.log("Server is up.");