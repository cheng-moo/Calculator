//Select Calculator to add listeners to btns
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        if(!action) {
            console.log('number key!');
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!');
        }
       if (action === 'decimal') {
           console.log('decimal key!');
       } 
       if (action === 'clear') {
           console.log('clear key!');
       }
       if (action === 'calculate') {
           console.log('equal key!');
       }
    }
})
//When the user hits a number key
// Needed info : num of the key that was clicked
// And the current displayed number
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        console.log(key, action, keyContent, displayedNum);
        const previousKeyType = calculator.dataset.previousKeyType;
        //When the user hits a number key after an operator key
        //remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
        const createResultString = (key, displayedNum, state) => {
            //Variables required are:
            //1. keyContent
            //2. displayedNum
            //3. previousKeyType
            //4. action
            //5. calculator.dataset.firstValue
            //6. calculator.dataset.operator
            //7. calculator.dataset.modValue
            const keyContent = key.textContent;
            const action = key.dataset.action;
            const firstValue = state.firstValue;
            const modValue = state.modValue;
            const operator = state.operator;
            const previousKeyType = state.previousKeyType;
            //... Refactor as necessary
            
            if (!action) {
                return displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ? keyContent
                : displayedNum + keyContent;
                
                calculator.dataset.previousKeyType = 'number';
            }
            //When the user hits the decimal key
            if (action === 'decimal') {
                if(!displayedNum.includes('.')) return displayedNum + '.'
                if (
                    previousKeyType === 'operator' ||
                    previousKeyType === 'calculate'
                    ) return '0.';
                    return displayedNum;
                    
                    calculator.dataset.previousKeyType = 'decimal';
                }
                //When the user hits an operator key
                if (
                    action === 'add' ||
                    action === 'subtract' ||
                    action === 'multiply' ||
                    action === 'divide'
                    ) {
                        const firstValue = calculator.dataset.firstValue;
                        const operator = calculator.dataset.operator;
                        
                        return firstValue &&
                        operator &&
                        previousKeyType !== 'operator' &&
                        previousKeyType !== 'calculate'
                        ? calculate(firstValue, operator, displayedNum)
                        : displayedNum;
                    }
                    if (action === 'clear') return 0;
                    if (action === 'calculate') {
                    let firstValue = calculator.dataset.firstValue;
                    const operator = calculator.dataset.operator;
                    let modValue = calculator.dataset.modValue;
        
                     return firstValue
                     ? previousKeyType === 'calculate'
                        ? calculate(displayedNum, operator, modValue)
                        : calculate(firstValue, operator, displayedNum) 
                     : displayedNum;
                    
                 }
                }

                //Using createResultString function
                keys.addEventListener('click', e => {
                    if (e.target.matches('button')) return
                    const displayedNum = display.textContent;
                    const resultString = createResultString(e.target, displayedNum, calculator.dataset)
                })
                if (
                    action === 'add' ||
                    action === 'subtract' ||
                    action === 'multiply' ||
                    action === 'divide'
                    ) {
                        key.classList.add('is-depressed');
                        //Add custom attribute
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
            }
            if (action !== 'clear') {
                const clearButton = calculator.querySelector('[data-action = clear]');
                clearButton.textContent = 'CE';
            }
            if (action === 'clear') {
                //clear has two uses
                //AC to clear all and resets initial state (default)
                //CE clears current entry and keeps prev numbers in memory
                if (key.textContent === 'AC') {
                    calculator.dataset.firstValue = '';
                    calculator.dataset.modValue = '';
                    calculator.dataset.operator = '';
                    calculator.dataset.previousKeyType = '';
                } else {
                    key.textContent = 'AC';
                }
                calculator.dataset.previousKeyType = 'clear'
            }
            //When the user hits the equals key
            //info needed: first num, operator, second num
            if (action === 'calculate') {
                if (
                    firstValue &&
                     operator &&
                     previousKeyType !== 'operator' &&
                     previousKeyType !== 'calculate'
                  ) {
                    const calcValue = calculate(firstValue, operator, secondValue);
                    display.textContent = calcValue;

                    //Update calculated value as firstValue
                    calculator.dataset.firstValue = calcValue;
                } else {
                    //if there are no calculations, set displayedNum as the firstValue
                    calculator.dataset.firstValue = displayedNum;
                }
                //set modValue attribute
                calculator.dataset.modValue = secondValue;
                calculator.dataset.previousKeyType = 'calculate'
            }
        }
    })
    
    const calculate = (n1, operator, n2) => {
        const firstNum = parseFloat(n1);
        const secondNum = parseFloat(n2);

        if (operator === 'add') return firstNum + secondNum;
        
        if (operator === 'subtract') return firstNum - secondNum;
        
        if (operator === 'multiply') return firstNum * secondNum;
        
        if (operator === 'divide') return firstNum / secondNum;
        
    }