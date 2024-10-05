const apiKey = 'YOUR_API_KEY';  // Replace this with your API key from https://www.exchangerate-api.com/

// Fetch the list of currencies and populate the dropdowns
fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
    .then(response => response.json())
    .then(data => {
        const currencyCodes = data.supported_codes;
        let fromCurrency = document.getElementById('fromCurrency');
        let toCurrency = document.getElementById('toCurrency');

        // Populate both dropdowns with currency codes
        currencyCodes.forEach(currency => {
            let option1 = document.createElement('option');
            option1.value = currency[0];
            option1.innerText = `${currency[1]} (${currency[0]})`;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement('option');
            option2.value = currency[0];
            option2.innerText = `${currency[1]} (${currency[0]})`;
            toCurrency.appendChild(option2);
        });

        // Set default currencies (e.g., USD to EUR)
        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    })
    .catch(error => console.error('Error fetching currency codes:', error));

// Function to convert currency
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || amount <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid amount';
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
        .then(response => response.json())
        .then(data => {
            const result = data.conversion_result;
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            document.getElementById('result').innerText = 'Error fetching exchange rate. Please try again later.';
        });
}
