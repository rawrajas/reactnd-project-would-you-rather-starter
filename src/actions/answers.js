import { _saveQuestionAnswer } from '../_DATA';
export const ADD_ANSWER = 'ADD_ANSWER';

function addAnswer(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer
    }
};

export function handleAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then((() => dispatch(addAnswer(authedUser, qid, answer))));
    }
}