
import React from 'react';
import Todolist from './Todolist';

class UserToDoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`App ${this.props.texture} ${this.props.font}`} style={{ fontSize: this.props.fontSize }}>
                <div className="todobox">
                    <div className="title">
                        <h1 style={{ fontWeight: "bold" }}>To-Do List</h1>
                        <p>
                            <em><small>To add items, simply type in an item and click "Add Item"</small></em>
                        </p>
                    </div>
                    <div className="buttonContainer">
                        <div className="btn-group" role="group">

                            <button className="btn btn-primary btn-sm dropShadow " type='submit' onClick={this.props.addItem}>Add Item</button>
                            <button className="btn btn-warning btn-sm dropShadow " type='button' onClick={this.props.deleteItem}>Delete Item</button>
                            <button className="btn btn-danger btn-sm dropShadow " type='button' onClick={this.props.clearList}>Clear List</button>

                        </div>

                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle dropShadow " type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Textures</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item Button texture1" id="texture1" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture2" id="texture2" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture3" id="texture3" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture4" id="texture4" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture5" id="texture5" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture6" id="texture6" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture7" id="texture7" type="button" onClick={this.props.changeTexture} />
                                <button className="dropdown-item Button texture8" id="texture8" type="button" onClick={this.props.changeTexture} />
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle dropShadow " type="button" id="fonts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Fonts</button>

                            <div className="dropdown-menu" aria-labelledby="fonts">
                                <div className="btn-group" role="group" style={{ display: "Flex", justifyContent: "center" }} aria-label="Font Size">
                                    <button type="button" id="smaller" onClick={this.props.changeFontSize} className="btn btn-link">Smaller</button>
                                    <button type="button" id="bigger" onClick={this.props.changeFontSize} className="btn btn-link">Bigger</button>
                                </div>
                                <button className="dropdown-item Button Quicksand" id="Quicksand" type="button" onClick={this.props.changeFont}>Quicksand</button>
                                <button className="dropdown-item Button Josefin_Sans" id="Josefin_Sans" type="button" onClick={this.props.changeFont}>Josefin Sans</button>
                                <button className="dropdown-item Button Anton" id="Anton" type="button" onClick={this.props.changeFont}>Anton</button>
                                <button className="dropdown-item Button Averia_Gruesa_Libre" id="Averia_Gruesa_Libre" type="button" onClick={this.props.changeFont}>Averia Gruesa Libre</button>
                                <button className="dropdown-item Button Indie_Flower" id="Indie_Flower" type="button" onClick={this.props.changeFont}>Indie Flower</button>
                                <button className="dropdown-item Button Raleway" id="Raleway" type="button" onClick={this.props.changeFont}>Raleway</button>
                                <button className="dropdown-item Button Lato" id="Lato" type="button" onClick={this.props.changeFont}>Lato</button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button className="logOut" type="button" id="logout" onClick={this.props.reset}>Reset Style</button>
                        <button className="logOut" type="button" id="logout" onClick={this.props.logOut}>Logout</button></div>
                    <div className="itemlist" >
                        <form onSubmit={this.props.submitHandler} style={{ width: "100%" }}>
                            <input id="userInput" style={{ borderRadius: "8px" }} name="userInput" className="userInput" value={this.props.userInput} onChange={this.props.handleChange} placeholder=" Enter New Item" type="text"></input>
                        </form>
                        <Todolist
                            token={this.props.token}
                            email={this.props.email}
                            updateState={this.props.updateState}
                            fontSize={this.props.fontSize}
                            todo={this.props.todo}
                            toggleDone={this.props.toggleDone}
                        />
                        <div className="errorMessage">{this.props.errorMessage}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserToDoList;
