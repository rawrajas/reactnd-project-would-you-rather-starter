import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions';
import { ADD_ANSWER } from '../actions/answers';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case ADD_ANSWER :
            const { answer, qid, authedUser } = action;
            const question = state[qid];

            return {
                ...state,
                [qid]: {
                    ...question,
                    optionOne: {
                        ...question.optionOne,
                        votes: answer === 'optionOne' ? question.optionOne.votes.concat(authedUser) : question.optionOne.votes
                    },
                    optionTwo: {
                        ...question.optionTwo,
                        votes: answer === 'optionTwo' ? question.optionTwo.votes.concat(authedUser) : question.optionTwo.votes
                    }
                }
            }
        default :
            return state;
    }
};