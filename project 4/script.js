// Geting DOM elements
const baseCurrency = document.getElementById('basecurrency');
const targetCurrency = document.getElementById('targetcurrency');
const baseAmount = document.getElementById('base-amount');
const targetAmount = document.getElementById('target-amount');
const exchangeRate = document.getElementById('xrate');
const flipBtn = document.getElementById('flip');

// Function to fetch exchnage rates from API and update DOM
function calculate() {
    // Get the cuurrency code for base and target currencies
    const baseCode = baseCurrency.value;
    const targetCode = targetCurrency.value
    // Execute fetch API
    fetch(`https://v6.exchangerate-api.com/v6/a43d02c063c1303f1c06c071/latest/${baseCode}`)
        .then( res => res.json() )
        .then( data => {
            // Get the exchnage rate for base currency to trget currency
            const rate = data.conversion_rates[targetCode];
            // Update DOM with exchange rate
            exchangeRate.innerText = `1 ${baseCode} = ${rate} ${targetCode}`;
            // Calculate amount of target currency based on exchange rate
            targetAmount.value = (baseAmount.value * rate).toFixed(2);
            })
}


// Event listeners
// 1. Listen for change to Base currency select box
baseCurrency.addEventListener('change',calculate);

// 2. Listen for input in base amount input field
baseAmount.addEventListener('input',calculate);

// 3. Listen for change to target currency select box
targetCurrency.addEventListener('change',calculate);

// 4. Listen for input in target amount input field
targetAmount.addEventListener('input',calculate);

// 5. Listen for click on the flip button
flipBtn.addEventListener('click', () => {
    // Save the value of the base currency in a temp currency
    const tempCurrency = baseCurrency.value;
    // Reassign base currency using target currency
    baseCurrency.value = targetCurrency.value;
    // Reassign target currency using the original base currency 
    targetCurrency.value = tempCurrency;
    // Recalculate exchange rate and update DOM
    calculate();
})

// Initial Calculation
calculate();