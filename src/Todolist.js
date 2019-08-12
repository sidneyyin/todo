import axios from 'axios';
import React from 'react';

class Todolist extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        try {

            const config = {
                method: 'post',
                url: '/',
                headers: { 'x-auth-token': this.props.token },
                data: { email: this.props.email }
            }

            const user = await axios(config)
            this.props.updateState(user.data);
        }
        catch (err) { console.log("error occured!"); console.log(err) }
    }
    render() {

        let newArray = this.props.todo.map(x =>
            <div className="input-group" key={x._id}>
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input type="checkbox" id={x._id} defaultChecked={x.done} onClick={this.props.toggleDone} aria-label="Checkbox for following text input" />
                    </div>
                </div>
                <input type="text" style={{ fontSize: this.props.fontSize }} key={x._id} readOnly value={x.item} className={x.done ? "form-control strikethrough" : "form-control"} aria-label="Text input with checkbox" />
            </div>);
        return newArray;
    }
}

export default Todolist;
