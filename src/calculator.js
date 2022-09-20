class Calculator {
    constructor() {
        this.equationString = "";
        this.result = 0;
        this.history = [];
    }

    addToEquation(value) {
        this.equationString += value;
    }

    addEquation(equation) {
        this.equationString = equation;
    }

    getEquation() {
        return this.equationString;
    }

    getResult() {
        return this.result;
    }

    setResult(result) {
        this.result = result;
    }

    calculate(equation) {
        // if last character in equation is not a number, remove it
        if (isNaN(equation[equation.length - 1])) {
            equation = equation.slice(0, -1);
        }
        this.setResult(eval(equation));
    }

    cleanEquation() {
        this.equationString = "";
        this.setResult(0)
    }

    setHistory(history) {
        this.history.push(history)
    }

}

class CalculatorGUI {
    constructor(calculator) {
        this.calculator = calculator;
        this.updateDisplay();
        this.updateHistoryView("Welcome to Malaks calculator!💕");
    }

    updateDisplay() {
        document.getElementById("display_equation").value = this.calculator.getEquation();
    }

    updateEquation() {
        this.calculator.addEquation(document.getElementById("display_equation").value);
        this.calculator.calculate(this.calculator.getEquation());
        this.updateDisplay()
    }

    updateHistoryView(information) {
        let history = document.getElementById("history_view");
        let historyElement = document.createElement("div");
        historyElement.innerHTML = information;
        historyElement.innerHTML += `<hr class="divider">`;
        history.appendChild(historyElement);
        historyElement.scrollIntoView();
    }


    key_pressed(key) {
        this.playsound();
        if (key == "clean") {
           calculator.cleanEquation();
           this.updateDisplay()
        }
        if (Number.isInteger(key) || key == "+" || key == "-" || key == "*" || key == "/") {
            this.calculator.addToEquation(key);
            document.getElementById("display_equation").value = this.calculator.getEquation();

        }

        if (key == "calculate") {
            this.calculator.calculate(this.calculator.getEquation());
            this.updateDisplay();
            this.updateHistoryView(`${this.calculator.getEquation()} = ${this.calculator.getResult()}`);

        }
    }
    
    playsound() {
        const audio = document.getElementById("audio");
        audio.play();
    }
}

