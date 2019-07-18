import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Question from './components/Question';
import Login from './components/Login';
import requireAuth from './components/RequireAuth';
import NotFoundPage from './components/404';
import './App.css';
import { setAuthedUser } from './actions/authedUser';
import CreatePoll from './components/CreatePoll';

const { Header, Footer, Content } = Layout;

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    handleLogOut = () => {
        this.props.dispatch(setAuthedUser(null));
    }

    render() {
        const { authedUser } = this.props;
        return (
            <Router>
                <Layout style={{height:"100vh"}}>
                    <Header>
                        <div style={{ marginLeft: '10px', float: 'right', height: '30px', color: 'rgba(255, 255, 255, 0.65)' }}>{authedUser && <Link to="/login" onClick={this.handleLogOut}>Logout</Link>}</div>
                        <div style={{ float: 'right', height: '30px', color: 'rgba(255, 255, 255, 0.65)' }}>{authedUser && authedUser}</div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[`${window.location.pathname}`]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                            <Menu.Item key="/leaderboard"><Link to="/leaderboard">Leaderboard</Link></Menu.Item>
                            <Menu.Item key="/add"><Link to="/add">Create Poll</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Route path="/login" component={Login} />
                        <React.Fragment>
                            <Route exact path="/" component={requireAuth(Dashboard)} />
                            <Route path="/leaderboard" component={Leaderboard} />
                            <Route path="/add" component={requireAuth(CreatePoll)} />
                            <Route path="/questions/:id" component={requireAuth(Question)} />
                            <Route path="/404" component={NotFoundPage} />
                        </React.Fragment>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Would You Rather ©2019 Jaime A. Araujo
                    </Footer>
                </Layout>
            </Router>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    };
};

export default connect(mapStateToProps)(App);
