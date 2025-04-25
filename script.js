"use strict";

// DOM Element References
const billInput = document.getElementById("bill-input-space");
const peopleInput = document.getElementById("people-input-space");
const tipInputBtns = document.querySelectorAll(".select-tip-button");
const customTipPercent = document.getElementById("custom-tip");
const tipAmountElement = document.querySelector(".total-amount");
const totalAmountElement = document.querySelector(".total-amount-person");
const errorContainer = document.querySelector(".error");
const resetButton = document.querySelector(".reset");

// Update display with calculated values
function updateResults(tipAmount, totalAmountValue) {
  tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountElement.textContent = `$${totalAmountValue.toFixed(2)}`;
}

// Validate inputs and return validated values or null
function validateInputs(bill, people, tipPercentage) {
  // Convert inputs to numbers
  const billValue = parseFloat(bill);
  const peopleValue = parseInt(people, 10);
  const tipValue = parseFloat(tipPercentage);
  
  // Check if all inputs are valid numbers
  if (isNaN(billValue) || isNaN(peopleValue) || isNaN(tipValue)) {
    return null;
  }
  
  // Validate people count
  if (peopleValue <= 0) {
    errorContainer.classList.add("active");
    peopleInput.classList.add("error-active");
    return null;
  }
  
  // Clear any error states if validation passes
  errorContainer.classList.remove("active");
  peopleInput.classList.remove("error-active");
  
  return { bill: billValue, people: peopleValue, tipPercentage: tipValue };
}

// Calculate tip and total per person
function calculateTip(bill, people, tipPercentage) {
  // Calculate tip amount (total, not per person)
  const tipAmount = (bill * tipPercentage) / 100;
  
  // Calculate total per person (bill share + tip share)
  const tipPerPerson = tipAmount / people;
  const billPerPerson = bill / people;
  const totalPerPerson = billPerPerson + tipPerPerson;
  
  return { tipPerPerson, totalPerPerson };
}

// Process the calculation and update UI
function processTipCalculation(billValue, peopleValue, tipPercentage) {
  // Validate inputs
  const validInputs = validateInputs(billValue, peopleValue, tipPercentage);
  
  if (!validInputs) {
    // Reset results if inputs are invalid
    updateResults(0, 0);
    return;
  }
  
  // Calculate values
  const { tipPerPerson, totalPerPerson } = calculateTip(
    validInputs.bill, 
    validInputs.people, 
    validInputs.tipPercentage
  );
  
  // Update UI
  updateResults(tipPerPerson, totalPerPerson);
}

// Event listener for tip percentage buttons
tipInputBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Extract percentage value (remove % symbol)
    const tipPercentage = parseFloat(button.innerText.replace("%", ""));
    processTipCalculation(billInput.value, peopleInput.value, tipPercentage);
  });
});

// Event listener for custom tip input
customTipPercent.addEventListener("input", () => {
  processTipCalculation(billInput.value, peopleInput.value, customTipPercent.value);
});

// Event listeners for bill and people inputs to recalculate on change
billInput.addEventListener("input", () => {
  // Find active tip percentage (from buttons or custom)
  const activeButton = document.querySelector(".select-tip-button.active");
  const tipPercentage = activeButton 
    ? parseFloat(activeButton.innerText.replace("%", ""))
    : customTipPercent.value;
    
  processTipCalculation(billInput.value, peopleInput.value, tipPercentage);
});

peopleInput.addEventListener("input", () => {
  // Find active tip percentage (from buttons or custom)
  const activeButton = document.querySelector(".select-tip-button.active");
  const tipPercentage = activeButton 
    ? parseFloat(activeButton.innerText.replace("%", ""))
    : customTipPercent.value;
    
  processTipCalculation(billInput.value, peopleInput.value, tipPercentage);
});

// Reset functionality
resetButton.addEventListener("click", () => {
  // Reset display
  updateResults(0, 0);
  
  // Clear inputs
  billInput.value = "";
  peopleInput.value = "";
  customTipPercent.value = "";
  
  // Clear error states
  errorContainer.classList.remove("active");
  peopleInput.classList.remove("error-active");
  
  // Remove active state from buttons
  tipInputBtns.forEach(button => button.classList.remove("active"));
});

// Add functionality to track active button
tipInputBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tipInputBtns.forEach(btn => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
    // Clear custom tip input
    customTipPercent.value = "";
  });
});

// Clear active button state when custom tip is used
customTipPercent.addEventListener("focus", () => {
  tipInputBtns.forEach(btn => btn.classList.remove("active"));
});
