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
                this.addHistoryItem(value.id, value.equation, value.result);
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

        // Create history item
        let historyView = document.createElement("div");
        historyView.className = "history_item";
        historyView.dataset.historyId = id;

        let historyEquation = document.createElement("div");
        historyEquation.className = "history_equation";
        historyEquation.innerHTML += `<div id="item_${id}" class='history_item_equation'>` + `${equation} = ${result}` + "</div>";

        let historyRemoveButton = document.createElement("div");
        historyRemoveButton.className = "remove_history_item";
        historyRemoveButton.innerHTML = "X";
        historyRemoveButton.addEventListener("click", () => {
            this.removeHistoryItem(id);
        });


        historyView.appendChild(historyRemoveButton);
        historyView.appendChild(historyEquation);


        let history = document.getElementById("history_view");
        history.appendChild(historyView);

        historyView.scrollIntoView();
    }
    removeHistoryItem (historyId) {
        console.log("Removed history item with id: " + historyId);
        document.getElementById("history_view").removeChild(document.querySelector(`[data-history-id="${historyId}"]`));

        // Remove from history array
        this.calculator.history = this.calculator.history.filter((history) => {
            return history.id != historyId;
        });

        this.calculator.updateLocalstorage_history();
    }

}

