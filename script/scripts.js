let billAmountField = document.querySelector("#bill-amount");
let tipPercentageField = document.querySelectorAll(".tip-percentage");
let headCountField = document.querySelector("#head-count");
let tipDisplayArea = document.querySelector(".tip-display");
let totalDisplayArea = document.querySelector(".total-display");
let customTipPercentage = document.getElementById("custom-input");
//-----
let amountErrorDisplay = document.querySelector(".amount-error");
let countErrorDisplay = document.querySelector(".count-error");
let tipErrorDisplay = document.querySelector(".tip-error");
let tipGridError = document.querySelector(".tip-grid-box");
//-----

let tipValueField;
let billAmount;
let tipValue;
let headCount;
let tipsAmountShare;
let totalAmountShare;

let resetButton = document.querySelector(".btn-reset");
let submitButton = document.querySelector(".btn-submit");

for (let i = 0; i < tipPercentageField.length; i++) {
  tipPercentageField[i].addEventListener("click", function (e) {
    tipValueField = tipPercentageField[i].id;
    for (let j = 0; j < tipPercentageField.length; j++) {
      tipPercentageField[j].classList.add("tip-percentage-active");
      if (tipPercentageField[j].id !== e.target.id) {
        tipPercentageField[j].classList.remove("tip-percentage-active");
      }
    }
  });
}

function getInputValues() {
  function calculateValues() {
    tipsAmountShare = (billAmount * tipValue) / (100 * headCount);
    totalAmountShare = billAmount / headCount + tipsAmountShare;

    if (
      typeof tipsAmountShare !== "number" ||
      isNaN(tipsAmountShare) ||
      typeof totalAmountShare !== "number" ||
      isNaN(totalAmountShare)
    ) {
      genericError();
      return;
    }

    tipDisplayArea.innerText = `$${tipsAmountShare.toFixed(2)}`;
    totalDisplayArea.innerText = `$${totalAmountShare.toFixed(2)}`;
    billAmountField.value = `${billAmount.toFixed(2)}`;
    headCountField.value = `${headCount.toFixed(0)}`;
    submitButton.classList.add("hide");
    resetButton.classList.remove("hide");

    if (tipValueField === "custom")
      customTipPercentage.value = `${tipValue.toFixed(0)}`;
  }

  amountErrorDisplay.classList.add("hide");
  billAmountField.classList.remove("error-field");
  tipErrorDisplay.classList.add("hide");
  tipGridError.classList.remove("error-field");
  countErrorDisplay.classList.add("hide");
  headCountField.classList.remove("error-field");

  if (billAmountField.value && billAmountField.value > 0) {
    billAmount = +billAmountField.value;
  } else {
    billAmountError();
    return;
  }

  if (!tipValueField) {
    tipPercentageError();
    return;
  }

  if (tipValueField === "custom") {
    if (customTipPercentage.value && customTipPercentage.value >= 0) {
      tipValue = +customTipPercentage.value;
    } else {
      tipPercentageError();
      return;
    }
  } else {
    tipValue = +tipValueField;
  }

  if (headCountField.value && headCountField.value > 0) {
    headCount = +headCountField.value;
  } else {
    headCountError();
    return;
  }

  calculateValues();
}

function billAmountError() {
  amountErrorDisplay.classList.remove("hide");
  billAmountField.classList.add("error-field");
}

function tipPercentageError() {
  tipErrorDisplay.classList.remove("hide");
  tipGridError.classList.add("error-field");
}

function headCountError() {
  countErrorDisplay.classList.remove("hide");
  headCountField.classList.add("error-field");
}

function genericError() {
  alert("Error in one / more of the input field");
}

function resetFunction() {
  tipValueField;
  billAmount;
  tipValue;
  headCount;
  billAmountField;
  tipPercentageField;
  headCountField;
  tipsAmountShare;
  totalAmountShare;
  tipDisplayArea.innerText = `$0.00`;
  totalDisplayArea.innerText = `$0.00`;
  billAmountField.value = "";
  headCountField.value = "";
  customTipPercentage.value = "";
  for (let i = 0; i < tipPercentageField.length; i++) {
    tipPercentageField[i].classList.remove("tip-percentage-active");
  }
  resetButton.classList.add("hide");
  submitButton.classList.remove("hide");
}

submitButton.addEventListener("click", getInputValues);
resetButton.addEventListener("click", resetFunction);
