class CalculatorGUI {
    constructor(calculator) {
        this.calculator = calculator;
        this.updateDisplay();
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
                this.addHistoryItem((this.calculator.history.length + 1),equation, this.calculator.getResult());
                this.calculator.addHistory(equation);
            }
        }

        if(key == "open_settings") {
            alert("Settings are not available yet!");
        }
    }

    loadHistory() {
        if (this.calculator.history != null) {
            this.calculator.history.forEach((value, index) => {
                this.addHistoryItem((this.calculator.history.length), value.equation, value.result);
            });
        }

        setTimeout(() => {
            let history = document.querySelector(".history_item:last-child");
            history.scrollIntoView();
        }, 500);

    }

    // History Item
    addHistoryItem(id, equation, result) {
        console.log("Added item with id: " + id);
        let history = document.getElementById("history_view");
        let historyElement = document.createElement("div");
        historyElement.className = "history_item";
        historyElement.innerHTML += `<div class='remove_history_item'>x</div>`;

        historyElement.onclick = () => {this.removeHistoryItem(id)};

        console.log(id)
        historyElement.innerHTML += `<div id="item_${id}" class='history_item_equation'>` + `${equation} = ${result}` + "</div>";
        history.appendChild(historyElement);
        historyElement.scrollIntoView();
    }
    removeHistoryItem (itemIndex) {
        console.log("Removed history item with id: " + itemIndex);
        // Update DOM
        document.getElementById("item_" + itemIndex).parentElement.remove();
        // Update history
        // this.calculator.history.
        // update localstorage
        const indexOfObject = this.calculator.history.findIndex((object) => object.id === itemIndex);
        this.calculator.history.splice(indexOfObject, 1);
        this.calculator.updateLocalstorage_history();
    }

}

