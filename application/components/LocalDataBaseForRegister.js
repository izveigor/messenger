import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

//
function StoreRegister(state = {}, action){
    switch(action.type){
        case 'ADD_FIELD':
            return [
                ...state,
                {
                    value: action.value,
                    text: action.text
                }
            ];
        case 'CHANGE_FIELD':
            return state.map(item => {
                if(item.value == action.value) {
                    return { ...item, text: action.text }
                }
                return item;
            });
        default:
            return state;
    }
}

const registerDataBase = createStore(StoreRegister, []);
const singInDataBase = createStore(StoreRegister, []);

export {
    registerDataBase,
    singInDataBase,
};
