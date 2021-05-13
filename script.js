function add(x, y) {
	return x + y;
}
function subtract(x, y) {
	return x - y;
}
function multiply(x, y) {
	let numX = Number(x);
	let numY = Number(y);

	if(typeof numX !== 'number' || typeof numY !== 'number') {
		error('Invalid Input');
		return;
	}
	return numX * numY;
}
function divide(x, y) {
	return x / y;
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
	}
}

function updateDisplay(button) {
	let input = button.innerHTML;
	display.innerHTML += input;
}

function backspace() {
	input.pop();
	if(input.slice(-1)[0] == ' ') {
		input.pop();
	}
	let output = display.innerHTML.split('');
	output.pop();
	display.innerHTML = output.join('');
	console.log(input);
}

function clear() {
	display.innerHTML = '';
	input= [];
	renderMsg('');
}

function error(msg) {
	input = [];
	renderMsg(msg);
}

function renderMsg(msg) {
	message.innerHTML = msg;
}

function solve() {
	if(input[0] !== undefined){
		renderMsg('');
		let expression = input.join('').split(' ').map(elem => Number(elem) ? Number(elem) : elem);
		if(expression.length >= 3) {
			for (let i = 0; i < expression.length; i++) {
				let iDiv = expression.indexOf('/');
				let iMul = expression.indexOf('*'); 
				let iAdd = expression.indexOf('+'); 
				let iSub = expression.indexOf('-'); 
				if(iDiv !== -1){
					let operatingResult = operate(expression[iDiv-1], expression[iDiv], expression[iDiv+1]);
					expression.splice(iDiv-1, 3, operatingResult);
				}
				else if(iMul !== -1){
					console.log(input);
					let operatingResult = operate(expression[iMul-1], expression[iMul], expression[iMul+1]);
					console.log(expression[iMul-1], expression[iMul], expression[iMul+1]);
					expression.splice(iMul-1, 3, operatingResult);
				}
				else if(iAdd !== -1){
					let operatingResult = operate(expression[iAdd-1], expression[iAdd], expression[iAdd+1]);
					expression.splice(iAdd-1, 3, operatingResult);
				}
				else if(iSub !== -1){
					let operatingResult = operate(expression[iSub-1], expression[iSub], expression[iSub+1]);
					expression.splice(iSub-1, 3, operatingResult);
				}
			}
		}
		clear();
		renderMsg(expression);
		input = expression.join('').split('');
		console.log(expression, input);
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
			updateDisplay(button);
		});
	}
	else if (arrayOfButtonClass.indexOf('operator') !== -1) {
		button.addEventListener('click', () => {
			input.push(' ');
			input.push(event.target.innerHTML);
			input.push(' ')
			updateDisplay(button);
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