import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup=(authData,navigator)=>async (dispatch)=>{
    try {
        const {data}=await api.signUp(authData);
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigator('/')
    } catch (error) {
        console.log(error)
    }
};


export const login=(authData,navigator)=>async(dispatch)=>{
    try {
        const {data}=await api.logIn(authData);
        dispatch({type:'AUTH',data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigator('/');
    } catch (error) {
        console.log(error)
    }
}