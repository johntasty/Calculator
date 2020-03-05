const buttons = document.querySelectorAll('button');
const backspaceBtn = document.querySelector('#backspace');
const equalBtn = document.querySelector('#equal');
const equationLog = document.querySelector('#equation-log');
const output = document.querySelector('#output');
const pointBtn = document.querySelector('#point');
const operators = ['*', '/', '-', '+']
let equation = [];
let result = 0;
let i = 0;

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a / b;
}

function buttonsInput(buttons){
    if (!isNaN(parseInt(buttons.textContent))) {
        output.textContent += buttons.textContent;
    }else if (buttons.textContent === '.'){
        output.textContent += buttons.textContent;
        pointBtn.disabled = true;
    }else if (buttons.textContent === 'AC'){
        clearOutPut();
        equationLog.textContent ='';
        equation =[];
        result = 0;
    }
    else if (buttons.textContent === '<--'){
        backspaceBtnAction();
    }else if (buttons.textContent === '='){
        equalBtnA();
    }else if (operators.includes(buttons.textContent)){
        operatorsBtn(buttons);
    }
    
}
function clearOutPut(){
    output.textContent = '';
    pointBtn.disabled = false;
}
function backspaceBtnAction(){
    output.textContent = output.textContent.slice(-output.textContent.length, -1);
    if (output.textContent.slice(-1) === '.'){
        pointBtn.disabled = false;
    }
}
function equalBtnA(){
    if (equationLog.textContent.includes('=')){
        equationLog.textContent =equationLog.textContent.slice(equationLog.textContent.search('=') +1);
    }
    equationLog.textContent += output.textContent + '=';
    equation[equation.length] = Number(output.textContent);
    operate();
    output.textContent = Math.round((result + Number.EPSILON) *1000) / 1000;
}
function operatorsBtn(button){
    if(equationLog.textContent.includes('=')){
        equationLog.textContent = equationLog.textContent.slice(equationLog.textContent.search('=') +1);
        equation[equation.length] = Number(output.textContent);
        equation[equation.length] = button.textContent;
        equationLog.textContent += output.textContent;
        equationLog.textContent += button.textContent;
        clearOutPut();
    }else if (output.textContent === ''){
        equation[equation.length - 1] = button.textContent;
        equationLog.textContent = equationLog.textContent.slice(-output.textContent.length, -1) + button.textContent;

    }else {
        equation[equation.length] =Number(output.textContent);
        equation[equation.length] = button.textContent;
        equationLog.textContent += output.textContent;
        equationLog.textContent += button.textContent;
        clearOutPut();
    }
}
function operate(){
    operators.forEach((x) => {
        while (equation.includes(x)){
            i = equation.indexOf(x);
            if ( x === '*'){
                result = multiply(equation[i - 1], equation[i + 1]);
            }else if ( x === '/'){
                result = divide(equation[i - 1], equation[i + 1]);
            }else if (x === '-'){
                result = subtract(equation[i - 1], equation[i + 1]);
            }else if(x === '+'){
                result = add(equation[i - 1], equation[i + 1]);
            }
            equation.splice(i -1, 3, result);

        }
    })
}
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        buttonsInput(button);        
    })
})
document.addEventListener('keydown', (e) => {
    buttons.forEach((button) => {
        if (button.textContent === e.key){
            button.classList.toggle('pressed');
            buttonsInput(button);
        }
    })
    if (e.key === 'Backspace') {
        backspaceBtn.classList.toggle('pressed');
        backspaceBtn();
    }else if (e.key === 'Enter') {
        equalBtn.classList.toggle('pressed');
        equalBtnA();
    }
})
document.addEventListener('keyup', (e) => {
    buttons.forEach((button) => {
        if (button.textContent == e.key){
            button.classList.toggle('pressed');
        }
    })
    if (e.key === 'Backspace'){
        backspaceBtn.classList.toggle('pressed');
    }else if (e.key === 'Enter'){
        equalBtn.classList.toggle('pressed');
    }
})