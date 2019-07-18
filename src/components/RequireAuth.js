import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export default function requireAuth(Component) {
    class Authentication extends Component {
        render() {
            const { isLoggedIn } = this.props;
            return (
                isLoggedIn ? <Component {...this.props} /> : <Redirect to={{ pathname: '/login', state: { referrer: window.location.pathname }}} />
            )
        }
    }
    function mapStateToProps({ authedUser }) {
        return {
            isLoggedIn: authedUser !== null
        }
    }

    return connect(mapStateToProps)(Authentication);
}