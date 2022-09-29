class Calculator {

    constructor() {
        this.history = [];

        this.equation = "";
        this.result = "";
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

    addHistory(equation) {
        this.history.push(
            {
                id: this.history.length + 1,
                title: "",
                equation: equation,
                result: this.getResult()
            }
        );
        this.updateLocalstorage_history()
    }

    updateLocalstorage_history() {
        localStorage.setItem("calculator_history", JSON.stringify(this.history));
    }

    getHistoryFromBrowser() {
        if(localStorage.getItem("calculator_history") !== null) {
            this.history = JSON.parse(localStorage.getItem("calculator_history"));
        }
    }

}



