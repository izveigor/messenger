import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'


function MessageBase(state={}, action){
    switch(action.type){
        case 'ADD_MESSAGE':
            return[
                ...state,
                {
                    text: action.text
                }
            ]
    }
}

const createMessageDataBase = createStore(MessageBase, []);

export default createMessageDataBase;
