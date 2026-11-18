
const display = document.getElementById("display");

// Add a number or operator
function appendToDisplay(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

// Clear everything
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        const expression = display.value;

        if (expression.trim() === "") {
            return;
        }

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = result;

    } catch {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers and mathematical operators
    if ("0123456789+-*/.".includes(key)) {
        appendToDisplay(key);
    }

    // Enter or = calculates
    else if (key === "Enter" || key === "=") {
        calculateResult();
    }

    // Backspace deletes last character
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape clears display
    else if (key === "Escape") {
        clearDisplay();
    }

});
