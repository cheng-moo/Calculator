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

        if (!action) {
            if (displayedNum === '0') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }
        //When the user hits the decimal key
        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }
        //When the user hits an operator key
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
                key.classList.add('is-depressed');
            }
        }
    })
    //When the user hits a number key after an operator key
    keys.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.dataset.action;
            
            //remove .is-depressed class from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'));
        }
    })
    