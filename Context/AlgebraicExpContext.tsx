import React, { createContext, useReducer } from "react";
import Toast from "react-native-root-toast";

const AlgebraicExpContext = createContext(null)

function manageAlgebraicExp(state, action) {

    //---TODO: handle the case when exp ends with .
    //---TODO: handle the case when [+, -, ...] called with empty string
    //---TODO: handle the case when = is called after [+, -, ...]
    //---TODO: handle 0 spam
    //---TODO: handle -0
    //---TODO: handle empty =
    //---TODO: reuse the value after =
    //---TODO: handle -''
    //---TODO: handle --
    //---TODO: Percentage Calculation: If the calculator interprets the "%" key as a percentage calculation, it will treat 545 as a percentage of 4854585. The calculation would be 4854585 + (4854585 * (545 / 100)), which results in 5116860.825. This would represent adding 545% of 4854585 to the original number.
    //---TODO: handle / by %
    //---TODO: Test % on empty string and '-'
    //---TODO: handle [+, -, ...] calls with empty exp
    //---TODO: handle * by %
    //---TODO: division by 0 (and %)
    //---TODO: case Unexpected payload show error msg
    //---TODO: handle -% 
    //---TODO: handle -.00% 
    //---TODO: handle -0.% 
    //TODO: expEval doit être remplacé par expResult dans exp ((%&*) case) 

    const payload = action.payload

    const arithmeticOperators = ['÷', '×', '−', '+', '=']
    const specialSymbols = ['AC', '±', '%', '.']
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
        let currExpLastChar = currExp.substring(currExp.length - 1)
        if(currExpLastChar === '%') {
            currExpLastChar = currExp.substring(currExp.length - 2, currExp.length -1)
        }
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

    const handlePercentInCurrExp = () => {
        if (state.currentExp.includes('%')) {
            state.currentExp = state.currentExp.replace('%', '')
            return state.currentExp + '%'
        }

        return state.currentExp
    }

    const makePercentCalc = () => {

        let test = "-33*-33/-0.550%-88+*66%+"
        const expArr = state.exp.split(/([\%])/)
        console.log(expArr)
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

    function saveForLater() {
        const operator = state.exp.substring(state.exp.length - 1)
        if (state.exp === '' || operator === '/') {
            state.currentExp = (Number(state.currentExp) / 100).toString()
        } else if (operator === '*') {
            const expWithoutOperator = minusMinusToPlusOnExp().slice(0, state.exp.length - 1)
            if (expWithoutOperator.includes('-') || expWithoutOperator.includes('+')) {
                const expArrReversed = [...expWithoutOperator.split('')].reverse()
                const evalExpArrReversed = []
                let minusFound = false
                console.log(Array.isArray(expArrReversed))
                console.log(expArrReversed)

                for (let i = 0; i < expArrReversed.length; i++) {

                    if (minusFound && (expArrReversed[i] !== '/' && expArrReversed[i] !== '*')) {
                        console.log("(minusFound && (expArrReversed[i] !== '/' && expArrReversed[i] !== '*'))")
                        break
                    } else if (minusFound) {
                        minusFound = false
                    }

                    if (expArrReversed[i] === '+') {
                        console.log("(expArrReversed[i] === '+')")
                        break
                    }
                    if (expArrReversed[i] === '-' && i === (expArrReversed.length - 1)) {
                        console.log("(expArrReversed[i] === '-' && i === (expArrReversed.length - 1))")
                        evalExpArrReversed.push(expArrReversed[i])
                        break
                    } else if (expArrReversed[i] === '-' && i !== (expArrReversed.length - 1)) {
                        console.log('else')
                        minusFound = true
                    } else {
                        console.log('ok')
                        evalExpArrReversed.push(expArrReversed[i])
                    }
                }

                const evalExpArr = [...evalExpArrReversed].reverse()
                const evalExp = evalExpArr.join('')
                console.log('1', evalExp)
                const expResult = eval(evalExp)
                state.currentExp = (expResult * (state.currentExp / 100)).toString()
            } else {
                console.log('2', expWithoutOperator)
                const expResult = eval(expWithoutOperator)

                state.currentExp = (expResult * (state.currentExp / 100)).toString()
            }

        } else {
            const expWithoutOperator = minusMinusToPlusOnExp().slice(0, state.exp.length - 1)
            const expResult = eval(expWithoutOperator)
            state.currentExp = (expResult * (state.currentExp / 100)).toString()
        }
    }



    if (arithmeticOperators.includes(payload)) {
        if (state.exp.length <= 0 && state.currentExp.length <= 0) {
            return { ...state }
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
        if (state.currentExp.includes(payload)) {
            state.currentExp = state.currentExp.replace(payload, '')
        } else if (state.currentExp.length === 0) {
            state.currentExp += '0' + payload
        } else {
            state.currentExp += payload
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
    state.currentExp = handlePercentInCurrExp()
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