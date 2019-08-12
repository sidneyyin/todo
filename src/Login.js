
import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'loginBackground App'}>
                <div className="title" style={{ margin: 'auto' }}>
                    <h1 style={{ fontWeight: "bold" }}>Sticky</h1>
                </div>
                <div className={`login-container`}> Welcome!  Please Log In:
        <form method="post" onSubmit={this.props.handleSubmit}>
                        <div style={{ left: "0", marginTop: "35px" }}>

                            <input className="login-email" id="email" name="email" value={this.props.email} onChange={this.props.handleChange} type="email" placeholder="Email address" required /> <br /></div>
                        <div>

                            <input className="login-password" id="password" name="password" value={this.props.password} type="password" onChange={this.props.handleChange} placeholder="Password" required /><br /></div>
                        <button className="loginButtons" value="Login" name="Login" type="submit"> Login </button>
                        <button className="loginButtons" value="Register" name="Register" type="button" onClick={this.props.handleRegister}> Register </button>
                        <button className="loginButtons" value="Clear" onClick={this.props.handleClear} >Clear</button>
                        <div className="errorMessage">{this.props.errorMessage}</div>
                    </form> </div>

            </div>
        )
    }
}

export default Login;
