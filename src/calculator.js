class Calculator {
    constructor() {
        this.equationString = "";
        this.result = 0;
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

}

class CalculatorGUI {
    constructor(calculator) {
        this.calculator = calculator;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById("display_result").innerText = "= " + this.calculator.getResult();
        document.getElementById("display_equation").value = this.calculator.getEquation();
    }

    updateEquation() {
        this.calculator.addEquation(document.getElementById("display_equation").value);
        this.calculator.calculate(this.calculator.getEquation());
        this.updateDisplay()
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
            this.updateDisplay()
        }
    }
}

