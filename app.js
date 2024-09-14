let mainURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")

const flagSelect = document.querySelectorAll(".update-container img")

const btn = document.querySelector("button")

const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

let amount = document.querySelector("input")
console.log(amount);


let msg = document.querySelector(".msg")

window.addEventListener("load", () => {
  updateExchangeRate();
})



for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode; 
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


btn.addEventListener("click",(evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async() => {
let amount = document.querySelector(".amount input");
let amountVal = amount.value;
if (amountVal === "" || amountVal < 1) {
  amountVal = 1;
  amount.value = "1";
}
console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
let fromCurrency = fromCurr.value.toLowerCase();
let toCurrency = toCurr.value.toLowerCase();

const URL = `${mainURL}/${fromCurrency}.json`;
console.log(URL);
let response = await fetch(URL);
let fromData = await response.json();
let rate = await fromData[fromCurrency][toCurrency];
let finalAmount = amountVal * rate;
msg.innerText = `${amountVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;

}