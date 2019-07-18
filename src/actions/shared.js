import { _getUsers, _getQuestions } from '../_DATA';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';

function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]);
};

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(([ users, questions ]) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            });
    }
};