const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://everton:13509@omnistack-ncwan.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})
//usar o => ou function, é a mesma coisa
// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

/*
app.get('/', (req, res) => {
    return res.json({ message: 'Teste GET' });
});
*/

//app.post('/users', (req, res) => {
//    return res.json({ idade: req.query.idade });
//});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

/*
app.post('/users', (req, res) => {
    return res.json(req.body);
});

app.put('/users/:id', (req, res) => {
    return res.json({ id: req.params.id });
});
*/

server.listen(3333);