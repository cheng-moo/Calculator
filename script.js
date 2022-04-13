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
        if (!action) {
            if (displayedNum === '0' ||
             previousKeyType === 'operator' ||
             previousKeyType === 'calculate'
             ) {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        //When the user hits the decimal key
        if (action === 'decimal') {
            if(!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        //When the user hits an operator key
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
            if (action === 'clear') {
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
                if (firstValue && operator && previousKeyType !== 'operator') {
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
        let result = '';

        if (operator === 'add') {
            result = parseFloat(n1) + parseFloat(n2);
        } else if (operator === 'subtract') {
            result = parseFloat(n1) - parseFloat(n2);
        } else if (operator === 'multiply') {
            result = parseFloat(n1) * parseFloat(n2);
        } else if (operator === 'divide') {
            result = parseFloat(n1) / parseFloat(n2);
        }
        return result;
    }