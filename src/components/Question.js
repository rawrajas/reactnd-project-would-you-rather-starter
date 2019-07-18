import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Avatar, Col, Row, Progress } from 'antd';
import { handleAnswer } from '../actions/answers';

class Question extends Component {
    handleAnswer = (authedUser, qid, answer) => {
        this.props.dispatch(handleAnswer(authedUser, qid, answer));
    }
    render() {
        const { authedUser, question, answer, authorAvatar, percentage, answerNoOfVotes } = this.props;
        return (
            question ?
                <div>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Avatar shape="square" size="large" src={authorAvatar} />
                        <h3> Would You Rather </h3>
                    </div>
                    <Row>
                        <Col span={6} offset={6}>
                            <div style={{ cursor: 'pointer' }} onClick={!answer ? () => this.handleAnswer(authedUser, question.id, 'optionOne') : ()=>{}}>{question.optionOne.text}</div>
                            { answer === 'Option One' &&
                            <React.Fragment>
                                <div>Percentage: {`${percentage}%`}</div>
                                <div>Total Votes: {answerNoOfVotes}</div>
                            </React.Fragment>
                            }
                        </Col>
                        <Col span={6} offset={3}>
                            <div style={{ cursor: 'pointer' }} onClick={!answer ? () => this.handleAnswer(authedUser, question.id, 'optionTwo') : ()=>{}}>{question.optionTwo.text}</div>
                            { answer === 'Option Two' &&
                            <React.Fragment>
                                <div>Percentage: {`${percentage}%`}</div>
                                <div>Total Votes: {answerNoOfVotes}</div>
                            </React.Fragment>
                            }
                        </Col>
                    </Row>
                </div> : <Redirect to="/404" />
        )
    }
}

function mapStateToProps({ authedUser, questions, users}, { match }) {
    const { id } = match.params;
    const question = questions[id];
    if (!question) {
        return {
            question: null
        };
    };

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    let answer = null;
    let answerNoOfVotes = 0;
    let percentage = 0;
    if (question.optionOne.votes.includes(authedUser)) {
        answer = 'Option One';
        answerNoOfVotes = question.optionOne.votes.length;
        percentage = (answerNoOfVotes/totalVotes) * 100;
    } else if (question.optionTwo.votes.includes(authedUser)) {
        answer = 'Option Two';
        answerNoOfVotes = question.optionTwo.votes.length;
        percentage = (answerNoOfVotes/totalVotes) * 100;
    }
    return {
        authedUser,
        question,
        answer,
        authorAvatar: users[question.author].avatarURL,
        answerNoOfVotes,
        percentage
    }
}

export default connect(mapStateToProps)(Question);