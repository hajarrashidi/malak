class Calculator {

    constructor() {
        this.history = [];
        this.result = 0;
        this.equation = "";
        this.getHistoryFromBrowser();
    }

    addToEquation(value) {
        this.equation += value;
    }

    addEquation(equation) {
        this.equation = equation;
    }

    getEquation() {
        return this.equation;
    }

    setResult(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    calculate(equation) {
        // if last character in equation is not a number, remove it
        if (isNaN(equation[equation.length - 1])) {
            equation = equation.slice(0, -1);
        }
        this.setResult(eval(equation));
    }

    cleanEquation() {
        this.equation = "";
        this.setResult(0)
    }

    setHistory(equation) {
        this.history.push(equation);
        this.saveHistoryToBrowser()
    }

    saveHistoryToBrowser() {
        localStorage.setItem("calculator_history", JSON.stringify(this.history));
    }

    getHistoryFromBrowser() {
        if(localStorage.getItem("calculator_history") !== null) {
            this.history = JSON.parse(localStorage.getItem("calculator_history"));
        }
    }

}

class CalculatorGUI {
    constructor(calculator) {
        this.calculator = calculator;
        this.updateDisplay();
        this.addItemToHistoryView("Welcome to Malaks calculator!💕");
        this.loadHistory();
    }

    updateDisplay() {
        document.getElementById("display_equation").value = this.calculator.getEquation();
    }

    updateEquation() {
        this.calculator.addEquation(document.getElementById("display_equation").value);
        this.calculator.calculate(this.calculator.getEquation());
        this.updateDisplay()
    }

    addItemToHistoryView(information) {
        let history = document.getElementById("history_view");
        let historyElement = document.createElement("div");
        historyElement.className = "history_item";
        historyElement.innerHTML = information;
        history.appendChild(historyElement);
        historyElement.scrollIntoView();
    }

    key_pressed(key) {
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
            if (this.calculator.getEquation() != "") {
                this.addItemToHistoryView(`${this.calculator.getEquation()} = ${this.calculator.getResult()}`);
                this.calculator.setHistory(`${this.calculator.getEquation()} = ${this.calculator.getResult()}`);
            }
        }

        if(key == "open_settings") {
           alert("Settings are not available yet!");
        }
    }

    loadHistory() {
        if (this.calculator.history != null) {
            this.calculator.history.forEach(item => {
                this.addItemToHistoryView(item);
            });
        }
    }

}

