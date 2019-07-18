import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Select } from 'antd';
import { Button } from 'antd';
import { setAuthedUser } from '../actions/authedUser';
const Option = Select.Option;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { value: undefined };
    }
    handleChange = (value) => {
        this.setState({ value: value });
    }

    handleSubmit = () => {
        this.props.dispatch(setAuthedUser(this.state.value));
    }
    render() {
        const { users, isLoggedIn } = this.props;
        return (
            isLoggedIn ? <Redirect to={this.props.location.state ? this.props.location.state.referrer : '/'}/> :
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Select value={this.state.value} placeholder="Select a user" style={{ width: 200 }} onChange={this.handleChange}>
                        { users.map((user) => <Option key={user} value={user}>{user}</Option>)}
                    </Select>
                    <div style={{ marginTop: '10px' }}>
                        <Button type="primary" onClick={this.handleSubmit}>Log In</Button>
                    </div>
                </div>
        )
    }
}
function mapStateToProps({authedUser, users}) {
    return {
        isLoggedIn: authedUser !== null,
        users: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login);