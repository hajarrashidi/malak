let calculator = new Calculator();
let calculatorGUI = new CalculatorGUI(calculator);

function getKey(key) {
    calculatorGUI.key_pressed(key);
}

function updateEquation() {
    calculatorGUI.updateEquation();
}

function removeItem(element) {
    element.parentNode.remove();

}
