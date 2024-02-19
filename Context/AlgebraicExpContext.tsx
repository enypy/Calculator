import React, { createContext, useReducer } from "react";
import Toast from "react-native-root-toast";

const AlgebraicExpContext = createContext(null)

function manageAlgebraicExp(state, action) {

    const payload = action.payload

    const arithmeticOperators = ['÷', '×', '−', '+', '=']
    const specialSymbols = ['AC', '±', '%', '.', '⌫']
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


    if (!arithmeticOperators.includes(payload)
        && !specialSymbols.includes(payload)
        && !numbers.includes(payload)) {
        Toast.show('Something went wrong...\nmanageAlgebraicExp: Unexpected payload', {
            duration: Toast.durations.LONG,
        })
        state.currentExp = ''
        state.exp = ''
        state.equalPreviouslyPressed = false
        return { ...state }
    }

    const cleanCurrExp = () => {
        let currExp = state.currentExp
        const currExpLastChar = currExp.substring(currExp.length - 1)

        if (currExpLastChar === '.' || currExpLastChar === '-') {
            currExp = currExp.replace(currExpLastChar, '')
        }

        return currExp
    }

    const cleanExp = () => {
        let exp = state.exp
        const expLastChar = exp.substring(exp.length - 1)
        if (state.currentExp.length === 0 && isNaN(Number(expLastChar))) {
            exp = exp.slice(0, exp.length - 1)
        }
        return exp
    }

    const handleZeroAtCurrExpStart = (payload) => {
        let currExp = state.currentExp

        if ((currExp.startsWith('0') || currExp.startsWith('-0')) && (!currExp.includes('0.') && !currExp.includes('-0.'))) {
            if (payload === 0) {
                return currExp
            }
            return currExp.replace('0', '') + String(payload)
        }
        return currExp + String(payload)
    }

    const minusMinusToPlusOnExp = () => {
        let exp = state.exp

        return exp.replace('--', '+')
    }

    const plusMinusToMinusOnExp = () => {
        let exp = state.exp

        return exp.replace('+-', '-')
    }

    const checkForDivisionByZero = () => {
        const expArr = state.exp.split(/([\+\-\*\%\/])/)

        for (let i = 0; i < expArr.length; i++) {
            if (expArr[i] === '/') {
                const dividend = Number(expArr[i + 1])
                if (dividend == 0) {
                    Toast.show('Division by zero', {
                        duration: Toast.durations.LONG,
                    })
                    return true
                }
            }
        }
        return false
    }



    if (arithmeticOperators.includes(payload)) {
        if (state.exp.length <= 0 && state.currentExp.length <= 0) {
            state.currentExp = '0'
        }

        state.currentExp = cleanCurrExp()
        state.exp = cleanExp()
        if (payload !== '=' && state.equalPreviouslyPressed) {
            state.equalPreviouslyPressed = false
        }


    }

    if (typeof payload === 'number') {
        if (state.equalPreviouslyPressed) {
            state.currentExp = ''
            state.equalPreviouslyPressed = false
        }
        state.currentExp = handleZeroAtCurrExpStart(payload)
    }

    if (payload === '.' && !state.currentExp.includes('.') && !(state.currentExp.startsWith('-') && state.currentExp.length === 1)
    ) {
        state.currentExp.length > 0 ? state.currentExp += payload : state.currentExp += '0' + payload
    }

    if (payload === 'AC') {
        state.currentExp = ''
        state.exp = ''
    }

    if (payload === '±') {
        if (state.currentExp.includes('-')) {
            state.currentExp = state.currentExp.replace('-', '')
        } else {
            state.currentExp.length > 0 ? state.currentExp = '-' + state.currentExp : state.currentExp = '-0'
        }
    }

    if (payload === '%') {
        if(state.currentExp !== '' && !isNaN(Number(state.currentExp))) {
            state.currentExp = (state.currentExp / 100).toString()
        }
    }

    if(payload === '⌫') {
        state.currentExp = state.currentExp.slice(0, -1)
        if(state.currentExp === '-') {
            state.currentExp = state.currentExp.slice(0, -1)
        }
    }

    if (payload === '÷') {
        state.exp += state.currentExp + '/'
        state.currentExp = ''
    }

    if (payload === '×') {
        state.exp += state.currentExp + '*'
        state.currentExp = ''
    }

    if (payload === '−') {
        state.exp += state.currentExp + '-'
        state.currentExp = ''
    }

    if (payload === '+') {

        state.exp += state.currentExp + '+'
        state.currentExp = ''
    }

    if (payload === '=') {
        state.exp += state.currentExp
        state.exp = minusMinusToPlusOnExp()
        state.exp = plusMinusToMinusOnExp()

        if (checkForDivisionByZero()) {
            state.currentExp = ''
        } else {
            state.currentExp = eval(state.exp).toString()
            state.equalPreviouslyPressed = true
        }

        state.exp = ''
    }

    console.log(state)
    return { ...state }
}

function AlgebraicExpProvider({ children }) {
    const [algebraicExp, dispatch] = useReducer(manageAlgebraicExp, { currentExp: '', exp: '', equalPreviouslyPressed: false })
    return (
        <AlgebraicExpContext.Provider value={{ algebraicExp, dispatch }}>
            {children}
        </AlgebraicExpContext.Provider>
    )
}

export { AlgebraicExpProvider, AlgebraicExpContext }