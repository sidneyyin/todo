import React from 'react';
import axios from 'axios';
import Login from './Login';
import UserToDoList from './UserToDoList';

class ToDoItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: [],
            userInput: "",
            fontSize: 16,
            token: "",
            email: "",
            password: "",
            errorMessage: "",
            texture: "",
            font: ""
        }
        this.updateState = this.updateState.bind(this);
        this.reset = this.reset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.clearList = this.clearList.bind(this);
        this.changeTexture = this.changeTexture.bind(this);
        this.changeFont = this.changeFont.bind(this);
        this.changeFontSize = this.changeFontSize.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.logOut = this.logOut.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        if (window.localStorage.token) this.setState({ token: localStorage.getItem('token') });
        if (window.localStorage.email) this.setState({ email: localStorage.getItem('email') });
    }

    updateState(user) {
        this.setState({ todo: user.todos, texture: user.texture, font: user.font })
    }

    async toggleDone(e) {
        let id = e.target.id;
        let response = await axios.put(`/${id}`, { email: this.state.email });
        this.setState({ todo: response.data, userInput: "" });
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleClear(e) {
        e.preventDefault();
        this.setState({ email: "", password: "", errorMessage: "" })
    }

    handleSubmit(e) {
        this.setState({ errorMessage: "" });
        e.preventDefault();
        axios.post('http://localhost:5000/login',
            {
                email: this.state.email,
                password: this.state.password
            })
            .then(result => {
                localStorage.setItem('token', result.data);
                localStorage.setItem('email', this.state.email);
                this.setState({ token: result.data })
            }).catch(err => {
                console.log(err.response.data);
                this.setState({ errorMessage: err.response.data })
            });
    }

    handleRegister(e) {
        e.preventDefault();
        if (!this.state.userInput) {
            this.setState({ errorMessage: "Please fill out email and password." })
        }
        axios.post('http://localhost:5000/register', {
            email: this.state.email,
            password: this.state.password
        })
            .then(result => {
                this.setState({ errorMessage: "Success!  Please log in." });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    this.setState({ errorMessage: error.response.data });
                };
            });
    }

    changeTexture(e) {
        const texture = e.target.id;
        axios.post('/texture', { email: this.state.email, texture: texture });
        this.setState({
            "texture": texture
        });
    }
    changeFont(e) {
        const font = e.target.id;
        axios.post('/font', { email: this.state.email, font: font })
        this.setState({
            "font": font
        });
    }

    changeFontSize(e) {
        if (e.target.id === "bigger") {
            this.setState({
                fontSize: this.state.fontSize + 4
            })
        }
        else {
            this.setState({
                fontSize: this.state.fontSize - 2
            })
        }
    }

    logOut() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        this.setState({ token: "", password: "" });
    }

    reset() {
        axios.post('/reset', { email: this.state.email });
        this.setState({ font: "", texture: "" });

    }

    async addItem() {

        if (!this.state.userInput) { this.setState({ errorMessage: "Please input an item." }) }
        if (this.state.userInput !== "") {
            this.setState({ errorMessage: "" });
            let newItem = this.state.userInput;
            let newDbItem = { email: this.state.email, "item": newItem, "done": false };
            const result = await axios.post('/add', newDbItem);
            this.setState({ todo: result.data.todos });
            this.setState({ userInput: "" })
        }
    }

    submitHandler(e) {
        e.preventDefault();
    }

    async deleteItem() {
        let response = await axios.put('/', { email: this.state.email });
        this.setState({ todo: response.data, userInput: "" });

    }

    async clearList() {
        let clearConfirm = window.confirm("Are you sure you want to clear list completely?");
        if (clearConfirm) {
            const clearResponse = await axios.post('/clear', { email: this.state.email });
            this.setState({ todo: clearResponse.data });
        }
    }

    render() {
        if (!this.state.token) {
            return <Login
                errorMessage={this.state.errorMessage}
                handleRegister={this.handleRegister}
                handleSubmit={this.handleSubmit}
                email={this.state.email}
                handleChange={this.handleChange}
                password={this.state.password}
                handleClear={this.handleClear}

            />
        }
        return <UserToDoList
            errorMessage={this.state.errorMessage}
            reset={this.reset}
            logOut={this.logOut}
            submitHandler={this.submitHandler}
            email={this.state.email}
            updateState={this.updateState}
            todo={this.state.todo}
            toggleDone={this.toggleDone}
            token={this.state.token}
            texture={this.state.texture}
            font={this.state.font}
            fontSize={this.state.fontSize}
            addItem={this.addItem}
            deleteItem={this.deleteItem}
            clearList={this.clearList}
            changeTexture={this.changeTexture}
            changeFont={this.changeFont}
            changeFontSize={this.changeFontSize}
            userInput={this.state.userInput}
            handleChange={this.handleChange}
        />

    }
}
export default ToDoItems;
