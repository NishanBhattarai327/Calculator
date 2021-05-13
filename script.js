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
	}
}

function renderMsg(msg) {
	message.textContent = msg;
}

function solve() {
	if(input[0] !== undefined){
		renderMsg('');
		let operators = ['/', '*', '%', '+', '-'];
		let equation = input.join('').split(' ').map(elem => parseFloat(elem) ? parseFloat(elem) : elem);

		let firstNumber, secondNumber, operator, result, indexOfOperator;
		for (let i = 0; i < operators.length; i++) {
			while(equation.includes(operators[i])) {
				indexOfOperator = equation.indexOf(operators[i]);
				firstNumber = equation[indexOfOperator-1];
				operator = equation[indexOfOperator];
				secondNumber = equation[indexOfOperator+1];
				result = operate(firstNumber, operator, secondNumber);
				equation.splice(indexOfOperator-1, 3, result);
			}
		}

		clear();
		updateDisplay(equation.join(''), true);
		input = equation.join('').split('');
		console.log(equation, input);
	}
	else{
		renderMsg('No Input');
	}
}


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