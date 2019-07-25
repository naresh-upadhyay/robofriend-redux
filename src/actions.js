import { Apicall } from './Apies/Apicall';
import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOT_PENDING,
    REQUEST_ROBOT_SUCCESS,
    REQUEST_ROBOT_FAILED
} from './constants';

export const setSearchField = (text) => ({
    type:
        CHANGE_SEARCH_FIELD, payload: text
})

export const requestRobots = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOT_PENDING })
    Apicall('https://jsonplaceholder.typicode.com/users')
        .then(data => dispatch({ type: REQUEST_ROBOT_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ROBOT_FAILED, payload: error }))
}