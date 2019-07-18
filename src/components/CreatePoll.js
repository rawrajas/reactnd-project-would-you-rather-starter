import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Input, Button } from 'antd';
import { handleAddQuestion } from '../actions/questions';
const InputGroup = Input.Group;

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionOneText: '',
            optionTwoText: '',
            hasSubmitted: false
        };
    }

    onPollSave = () => {
        const { optionOneText, optionTwoText } = this.state;
        this.props.dispatch(handleAddQuestion({
            optionOneText,
            optionTwoText,
            author: this.props.authedUser
        }));
        this.setState({ hasSubmitted: true });
    }

    handleChange = (optionKey, e) => {
        this.setState({
            [optionKey]: e.target.value
        });
    }

    render() {
        const { optionOneText, optionTwoText, hasSubmitted } = this.state;
        return (
            hasSubmitted ? <Redirect to={{ pathname: '/', state: { referrer: '/add' }}} /> :
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <span>Would you rather?</span>
                    <InputGroup compact>
                        <Input style={{ width: '50%' }} value={optionOneText} onChange={(e)=>{this.handleChange('optionOneText', e)}} placeholder="Option One" />
                        <Input style={{ width: '50%' }} value={optionTwoText} onChange={(e)=>{this.handleChange('optionTwoText', e)}} placeholder="Option Two" />
                    </InputGroup>
                    <Button style={{ marginTop: '50px' }}type="primary" onClick={this.onPollSave}>Save</Button>
                </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(CreatePoll);