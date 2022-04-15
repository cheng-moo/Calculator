//calc function
function calculate (n1, operator, n2) {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return Math.round(firstNum + secondNum);
    if (operator === 'subtract') return Math.round(firstNum - secondNum);
    if (operator === 'multiply') return Math.round(firstNum * secondNum);
    if (operator === 'divide' && secondNum !== 0) { 
        return Math.round(firstNum / secondNum);
    } else {
        return 'Math Error';
    }
}

//getKeyType function

function getKeyType (key) {
    const { action } = key.dataset;
    if (!action) return 'number'
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
        ) {
            return 'operator'
        }
        return action;
    }
    
const createResultString = (key, onScreen, state) => {
//needed
//keyType - onScreen - prevKeyType - keyContent -
//calculator.dataset.firstValue - calculator.dataset.operator
//calculator.dataset.modValue
const keyContent = key.textContent;
const keyType = getKeyType(key);
const {
    prevKeyType,
    firstValue,
    modValue,
    operator,
} = state;
if (keyType === 'number') { 
    return onScreen === '0' ||
    prevKeyType === 'operator' ||
    prevKeyType === 'calculate'
    ? keyContent
    : onScreen + keyContent; 
}
if (keyType === 'decimal') {
    return !onScreen.includes('.') 
    ? onScreen + '.'
    : prevKeyType === 'operator' ||
    prevKeyType === 'calculate'
    ? '0.'
    : onScreen;
    
}
if (keyType === 'operator') {
    
    return firstValue &&
            operator &&
            prevKeyType !== 'operator' &&
            prevKeyType !== 'calculate'
            ? calculate(firstValue, operator, onScreen)
            : onScreen;
        
    }
    if(keyType === 'clear') {
        return 0;
    }
    if (keyType === 'calculate') {
        return firstValue
        ? prevKeyType === 'calculate'
        ? calculate(onScreen, operator, modValue)
        : calculate(firstValue, operator, onScreen)
        : onScreen;
        
    }
    if(keyType === 'del') {
        if(onScreen === '0') return 0;
        if (prevKeyType !== 'calculate' && (prevKeyType === 'number' || prevKeyType === 'del')) {
            if(onScreen !== '0') {
            let num = onScreen.split('');
            if (num.length > 1) {
            return num.slice(0, num.length - 1).join('');
            } else {
                return 0;
            }
        }
        } else if (prevKeyType === 'calculate') {
            return onScreen;
        }
    
            
    }
}
const updateCalculatorState = (key, calculator, calcValue, onScreen) => {
    //needed
    //key - calculator - calcValue - onScreen - modValue
    const keyType = getKeyType(key);
    const {
        firstValue,
        operator,
        prevKeyType,
        modValue,
    } = calculator.dataset;
    calculator.dataset.prevKeyType = keyType;
    if (keyType === 'operator') {
        calculator.dataset.operator = key.dataset.action;
        calculator.dataset.firstValue = 
        firstValue &&
        operator &&
        prevKeyType !== 'operator' &&
        prevKeyType !== 'calculate'
        ? calcValue
        : onScreen;
        
    }
    if (keyType === 'clear') {
        if (key.textContent = 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.prevKeyType = '';
        }     
    }
    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue &&
        prevKeyType === 'calculate'
        ? modValue
        : onScreen;
    }
}
const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key);
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    
    if(keyType === 'operator') key.classList.add('is-depressed')
    if(keyType === 'clear' && key.textContent !== 'AC') {
        key.textContent = 'AC'
    } 
    if(keyType !== 'clear') {
        const clearKey = calculator.querySelector('[data-action = clear]')
        clearKey.textContent = 'CE';
    }
}
    // Listener to keys to get the numbers and operator
    const calculator = document.querySelector('.calculator')
    const keys = calculator.querySelector('.calculator__keys');
    const display = calculator.querySelector('.calculator__display');
    const delKey = calculator.querySelector('[data-action = del]')
    keys.addEventListener('click', key)
    function key (e) {
        if (!e.target.matches('button')) return;
        const key = e.target;
        const onScreen = display.textContent;
        //pure function
        const resultString = createResultString(key, onScreen, calculator.dataset)

        
        //Update state (impure functions)
        display.textContent = resultString; 
        updateCalculatorState(key, calculator, resultString, onScreen);
        updateVisualState(key, calculator);
    }

    window.addEventListener('keydown', e => {
        const keyboardKey = document.querySelector(`button[data-key="${e.keyCode}"]`)
        if (!keyboardKey.matches('button')) return;
        if (!keyboardKey) return;
        console.log(keyboardKey);
        
        const onScreen = display.textContent;
        //pure function
        const resultString = createResultString(keyboardKey, onScreen, calculator.dataset)

        
        //Update state (impure functions)
        display.textContent = resultString; 
        updateCalculatorState(keyboardKey, calculator, resultString, onScreen);
        updateVisualState(keyboardKey, calculator);
    }
)
