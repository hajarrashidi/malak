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
        let result = math.evaluate(equation);
        navigator.clipboard.writeText(result);
        this.setResult(result);
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
        this.addItemToHistoryView("Mini Malak!");
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
        historyElement.innerHTML += "<div class='remove_history_item' onclick='removeItem(this)'>x</div>";
        historyElement.innerHTML += "<div class='history_item_equation'>" + information + "</div>";
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
            let equation = this.calculator.getEquation();
            if (this.calculator.getEquation() != "") {
                this.addItemToHistoryView(equation);
                this.calculator.setHistory(equation);
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

        setTimeout(() => {
            let history = document.querySelector(".history_item:last-child");
            history.scrollIntoView();
        }, 500);

    }

}

