/*
*this is theodinproject exercise
*Work that is not done
***Disabling user to input more than one decimal in single number
***Rounding the decimal place of calculation
***Adding keyboard support
*/

////////////////////////////////////////////////////////
/////////////////////Function Section//////////////////
//////////////////////////////////////////////////////

function add(x, y) {
	return x + y;
}
function subtract(x, y) {
	return x - y;
}
function multiply(x, y) {
	return x * y;
}
function divide(x, y) {
	if (parseFloat(y) === 0){
		return 'OOPs';
	}
	return x / y;
}
function modulus(x, y) {
	return x % y;
}

function operate(x, operator, y) {
	switch(operator) {
		case '+':
			return add(x, y);
		case '-':
			return subtract(x, y);
		case '*':
			return multiply(x, y);
		case '/':
			return divide(x, y);
		case '%':
			return modulus(x, y);
	}
}


function backspace() {
	input.pop();
	if(input.slice(-1)[0] == ' ') {
		input.pop();
	}
	let output = display.textContent.split('');
	output.pop();
	updateDisplay(output.join(''), true);
}

function clear() {
	updateDisplay('', true)
	input= [];
	renderMsg('');
}

function error(msg) {
	input = [];
	renderMsg(msg);
}

function updateDisplay(msg, clear=false) {
	if(clear) {
		display.textContent = msg;
	}
	else {
		display.textContent += msg;
		renderMsg('');
	}
}

function renderMsg(msg) {
	message.textContent = msg;
}

function solve() {
	//if parsed for first time without input
	if(input[0] !== undefined){
		renderMsg('');

		//solving the equation inputed using badmas rule

		let operators = ['/', '*', '%', '+', '-'];
		let equation = input.join('').split(' ').map(elem => parseFloat(elem) ? parseFloat(elem) : elem);

		let firstNumber, secondNumber, operator, result, indexOfOperator;
		for (let i = 0; i < operators.length; i++) {
			while(equation.includes(operators[i])) {
				indexOfOperator = equation.indexOf(operators[i]);
				firstNumber = parseFloat(equation[indexOfOperator-1]);
				operator = equation[indexOfOperator];
				secondNumber = parseFloat(equation[indexOfOperator+1]);

				//Don't perfor calculation if equation is invalid
				if (isNaN(firstNumber) || isNaN(secondNumber)) {
					clear();
					renderMsg('OOPs');
					return;
				}
				result = operate(firstNumber, operator, secondNumber);

				//if the equation has number divide by zero
				if (result === 'OOPs') {
					clear();
					renderMsg('OOPs');
					return;
				}
				equation.splice(indexOfOperator-1, 3, result);
			}
		}

		clear();
		updateDisplay(equation.join(''), true);
		input = equation.join('').split('');
	}
	else{
		renderMsg('No Input');
	}
}


///////////////////////////////////////////////////////////////
/////////////////Main Section/////////////////////////////////
/////////////////////////////////////////////////////////////

let input = [];
let display = document.querySelector('#output');
let message = document.querySelector('#message')

let buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
	let arrayOfButtonClass = Object.values(button.classList);

	if (arrayOfButtonClass.indexOf('number') !== -1) {
		button.addEventListener('click', () => {
			input.push(event.target.innerHTML);
			updateDisplay(button.textContent);
		});
	}
	else if (arrayOfButtonClass.indexOf('operator') !== -1) {
		button.addEventListener('click', () => {
			input.push(' ');
			input.push(event.target.innerHTML);
			input.push(' ')
			updateDisplay(button.textContent);
		});
	}
	else if (arrayOfButtonClass.indexOf('equal') !== -1) {
		button.addEventListener('click', () => {
			solve();
		});
	}
	else if (arrayOfButtonClass.indexOf('backspace') !== -1) {
		button.addEventListener('click', (event) => {
			backspace();
		});
	}
	else if (arrayOfButtonClass.indexOf('clear') !== -1) {
		button.addEventListener('click', (event) => {
			clear();
		});
	}
});