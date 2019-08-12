const express = require('express');
const auth = require('./middleware/auth');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Error: ', err));

app.use(express.json());
var ObjectId = mongoose.Types.ObjectId;

//define user login schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    todos: [{
        _id: { type: String, required: true },
        item: { type: String, required: true },
        done: { type: Boolean, required: true }
    }],
    texture: String,
    font: String
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'secretkey');
    return token;
}
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');
    if (req.body.password.length < 5) return res.status(400).send('Password too short. Must be 5 or more characters long.');

    user = new User(_.pick(req.body, ['email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = await user.generateAuthToken();
    return res.header('x-auth-token', token).send(token);
});

app.post('/login', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(token);
})

app.post('/reset', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    user.texture = "";
    user.font = "";
    user = await user.save();
    res.send(user);
})

app.post('/texture', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    user.texture = req.body.texture;
    user = await user.save();
    res.send(user);
})

app.post('/font', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    user.font = req.body.font;
    user = await user.save();
    res.send(user);
})

app.post('/', auth, (req, res) => {

    User.findOne({ email: req.body.email })
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log(error);
            res.send("Something went wrong.")
        });
});

app.post('/add', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    const newId = new ObjectId;
    const newItem = { _id: newId, item: req.body.item, done: req.body.done };
    user.todos.push(newItem);
    user = await user.save();
    res.send(user);
});

app.put('/:id', async (req, res) => {
    let doc = await User.findOne({ email: req.body.email });
    let toDoArray = doc.todos;
    toDoArray.forEach((item) => { if (item._id === req.params.id) { item.done = !item.done } });
    doc.todos = toDoArray;
    doc.save();
    res.send(doc.todos);
})

app.put('/', async (req, res) => {
    let doc = await User.findOne({ email: req.body.email });
    let newArray = doc.todos.filter((item) => item.done !== true);
    doc.todos = newArray;
    doc.save();
    res.send(doc.todos);
})

app.post('/clear', async (req, res) => {
    let doc = await User.findOne({ email: req.body.email });
    let newArray = [];
    doc.todos = newArray;
    doc.save();
    res.send(doc.todos);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
