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
        const createResultString = () => {
            //Variables required are:
            //1. keyContent
            //2. displayedNum
            //3. previousKeyType
            //4. action
            //5. calculator.dataset.firstValue
            //6. calculator.dataset.operator

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
        }
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
                display.textContent = 0;
                calculator.dataset.previousKeyType = 'clear'
            }
            //When the user hits the equals key
            //info needed: first num, operator, second num
            if (action === 'calculate') {
                let firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                let secondValue = displayedNum;

                if (firstValue) {
                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum;
                        secondValue = calculator.dataset.modValue;
                    }
                    display.textContent = calculate(firstValue, operator, secondValue);
                    
                }
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