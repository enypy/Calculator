import React, { createContext, useReducer } from "react";

const AlgebraicExpContext = createContext(null)

function manageAlgebraicExp(state, action) {

    //TODO: handle the case when exp ends with .
    //TODO: handle the case when [+, -, ...] called with empty string
    //TODO: handle the case when = is called after [+, -, ...]

    const payload = action.payload

    const endCurrendExp = (char) => {
        const authorizedChars = ['0', '1', '2', '3', '4', ]
    }

    if (typeof payload === 'number') {
        state.currentExp += String(payload)
    }
    if (payload === '.' 
    && state.currentExp.length > 0 
    && !state.currentExp.includes('.')
    && !(state.currentExp.startsWith('-') && state.currentExp.length === 1)
    ) {
        state.currentExp += payload
    }
    if (payload === 'AC') {
        state.currentExp = ''
        state.exp = ''
    }
    if (payload === '±') {
        if(state.currentExp.includes('-')) {
            console.log(true)
            state.currentExp = state.currentExp.replace('-', '')
        } else {
            state.currentExp = '-' + state.currentExp 
        }
    }
    if(payload === '%') {
        state.currentExp = (Number(state.currentExp) / 100).toString()
    }
    if(payload === '÷') {
        state.exp += state.currentExp + '/'
        state.currentExp = ''
    }
    if(payload === '×') {
        state.exp += state.currentExp + '*'
        state.currentExp = ''
    }
    if(payload === '+') {
        state.exp += state.currentExp + '+'
        state.currentExp = ''
    }
    if(payload === '=') {
        state.exp += state.currentExp
        state.currentExp = eval(state.exp)
        state.exp = ''
    }
    return {...state}
}

function AlgebraicExpProvider({ children }) {
    const [algebraicExp, dispatch] = useReducer(manageAlgebraicExp, { currentExp: '', exp: '' })
    return (
        <AlgebraicExpContext.Provider value={{algebraicExp, dispatch}}>
            {children}
        </AlgebraicExpContext.Provider>
    )
}

export { AlgebraicExpProvider, AlgebraicExpContext }