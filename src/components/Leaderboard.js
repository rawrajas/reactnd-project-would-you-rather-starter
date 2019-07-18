import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';

class Leaderboard extends Component {
    render() {
        const { users } = this.props;
        return (
            <div style={{ marginTop: '50px' }}>
                <List
                    bordered
                    dataSource={users}
                    renderItem={item =>
                        (<List.Item>
                            <Avatar style={{ marginRight: '5px' }} shape="square" size="small" src={item.avatarURL} />
                            {item.username} has {item.totalQuestions} questions and {item.totalAnswers} answers
                        </List.Item>)}
                />
            </div>
        )
    }
}
function mapStateToProps({ users, questions }) {
    const usersArray = Object.keys(users).map((username) => {
        const userObject = users[username];
        return {
            username: userObject.id,
            avatarURL: userObject.avatarURL,
            totalQuestions: Object.keys(userObject.answers).length,
            totalAnswers: Object.keys(userObject.questions).length
        }
    }).sort((a,b) => (b.totalQuestions + b.totalAnswers) - (a.totalQuestions + a.totalAnswers));;
    return {
        users: usersArray
    }
}

export default connect(mapStateToProps)(Leaderboard);