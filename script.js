"use strict";

// GET INPUT ELEMENTS
const billInput = document.getElementById("bill-input-space");
const peopleInput = document.getElementById("people-input-space");
const tipInputBtns = document.querySelectorAll(".select-tip-button");
const customTipPercent = document.getElementById("custom-tip");
const totalAmount = document.querySelector(".total-amount");
const totalAmountPerPerson = document.querySelector(".total-amount-person");
const errorContainer = document.querySelector(".error-container");

// funtion to update results
function updateResults(tipAmount, totalAmountValue) {
  totalAmount.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountPerPerson.textContent = `$${totalAmountValue.toFixed(2)}`;
}

// calculate tip as the user enters the percentage
tipInputBtns.forEach((inputButton) => {
  inputButton.addEventListener("click", (e) => {
    e.preventDefault();

    let tipPercentage =
      parseFloat(inputButton.innerText.replace("%", "")) / 100;
    let amount = parseFloat(billInput.value);
    let people = Number(peopleInput.value);

    if (people <= 0) {
      document.querySelector(".error").classList.toggle("active");
      peopleInput.classList.toggle("error-active");
      return;
    }
    // const tottalTip (amount * tipPercentage) / 100
    const tipAmount = (amount * tipPercentage) / 100;
    const totalBill = amount + tipAmount;
    // const totalAmountValue = amount / people + tipAmount;

    updateResults(tipAmount, totalBill);
  });
});

// calculate tip as the user enters the custom percentage
customTipPercent.addEventListener("input", () => {
  let amount = parseFloat(billInput.value);
  let people = Number(peopleInput.value);
  let customTipPercentage = parseFloat(customTipPercent.value) / 100;

  if (
    !isNaN(amount) &&
    !isNaN(people) &&
    people > 0 &&
    !isNaN(customTipPercentage)
  ) {
    const tipAmount = (amount * customTipPercentage) / 100;
    const totalBill = amount + tipAmount;
    // const customTip = (amount * customTipPercentage) / people;
    // const totalAmountValue = amount / people + customTip;
    updateResults(tipAmount, totalBill);
    // updateResults(customTip, totalAmountValue);
  } else {
    // Optional: reset display if inputs are invalid
    updateResults(0, 0);
  }
});
// clear results
document.querySelector(".reset").addEventListener("click", () => {
  totalAmount.innerHTML = "$0.00";
  totalAmountPerPerson.innerHTML = "$0.00";
  billInput.value = "";
  peopleInput.value = "";
  customTipPercent.value = "";
  errorContainer.textContent = "";
});
