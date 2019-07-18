import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, List } from 'antd';

const TabPane = Tabs.TabPane;

class Dashboard extends Component {
    render() {
        const { answered, unanswered } = this.props;
        return (
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="top"
                    size="large"
                >
                    <TabPane tab="Unanswered" key="1">
                        <List
                            bordered
                            dataSource={unanswered}
                            renderItem={item => (<List.Item><Link to={`questions/${item.id}`}>Would you rather {item.optionOne.text} or {item.optionTwo.text}.</Link></List.Item>)}
                        />
                    </TabPane>
                    <TabPane tab="Answered" key="2">
                        <List
                            bordered
                            dataSource={answered}
                            renderItem={item => (<List.Item><Link to={`questions/${item.id}`}>Would you rather {item.optionOne.text} or {item.optionTwo.text}.</Link></List.Item>)}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    const answers = Object.keys(users[authedUser].answers);
    const answered = answers.map((id) => questions[id]).sort((a,b) => b.timestamp - a.timestamp);
    const unanswered = Object.keys(questions)
        .filter((id) => !answers.includes(id))
        .map((id) => questions[id])
        .sort((a,b) => b.timestamp - a.timestamp);
    return {
        answered,
        unanswered
    };
}

export default connect(mapStateToProps)(Dashboard);