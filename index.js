
document.addEventListener("DOMContentLoaded", function() {
    const validateButton = document.querySelector("#validate");
    const form = document.querySelector("#credit-card");

    const cardNumber = document.querySelector("#card-number");
    const cardExpiration = document.querySelector("#valid-thru-text");
    const cardCVV = document.querySelector("#cvv-text");

    const cardNumberText = document.querySelector(".number-vl");
    const cardExpirationText = document.querySelector(".expiration-vl");
    const cardCVVText = document.querySelector(".cvv-vl");

    const cardHolder = document.querySelector("#name-text");
    const cardHolderText = document.querySelector(".name-vl");

    // Existing validation functions remain unchanged
    function validateCardNumber(cardNum) {
        const cardNumberValue = cardNum.replaceAll(' ', '');
        const digits = cardNumberValue.split('').map(Number);
        let sum = 0;
        let double = false;
    
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = digits[i];
            if (double) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            double = !double;
        }
        return sum % 10 === 0;
    }
    
    function validateExpiration(expiration) {
        const [month, year] = expiration.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
        const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed
    
        return (
            Number(year) >= currentYear &&
            (Number(year) !== currentYear || Number(month) >= currentMonth)
        );
    }
    
    function validateCVV(cvv) {
        const cvvLength = cvv.length;
        return cvvLength === 3;
    }

    cardNumber.addEventListener("keyup", (e) => {
        if (!e.target.value) {
            cardNumberText.innerText = "1234 5678 9101 1121";
        } else {
            // Validation logic here
            const valuesOfInput = e.target.value.replaceAll(" ", "");

            if (e.target.value.length > 14) {
                e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
                cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            } else if (e.target.value.length > 9) {
                e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
                cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            } else if (e.target.value.length > 4) {
                e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
                cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            } else {
                cardNumberText.innerHTML = valuesOfInput
            }
        }
    });

    cardHolder.addEventListener("input", (e) => {
        cardHolderText.innerText = e.target.value.toUpperCase();
    });

    cardExpiration.addEventListener("keyup", (e) => {
        if (!e.target.value) {
            cardExpirationText.innerHTML = "02/40";
        } else {
            // Validation logic here
            const valuesOfInput = e.target.value.replace("/", "");

            if (e.target.value.length > 2) {
                e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
                cardExpirationText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            } else {
                cardExpirationText.innerHTML = valuesOfInput;
            }
        }
    });

    cardCVV.addEventListener("keyup", (e) => {
        if (!e.target.value) {
            cardCVVText.innerHTML = "123";
        } else {
            // Validation logic here
            cardCVVText.innerHTML = e.target.value;
        }
        const isCVVValid = validateCVV(e.target.value);

    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // This part should include proper validation if you want to alert the user
        alert("Form submission prevented. Perform validation before submission.");
    });

    validateButton.addEventListener("click", (e) => {
        e.preventDefault();

        const isCardValid = validateCardNumber(cardNumber.value);
        const isExpirationValid = validateExpiration(cardExpiration.value);
        const isCVVValid = validateCVV(cardCVV.value);


        let message = "Invalid Credit Card details. Please check and try again."; // Default error message

        if (isCardValid && isExpirationValid && isCVVValid) {
            message = "Credit Card is valid!"; // Change the message if the card is valid
        }

        // Use SweetAlert2 for a more visually appealing pop-up
        Swal.fire({
            icon: isCardValid && isExpirationValid && isCVVValid ? 'success' : 'error', // Icon based on validation result
            title: message,
            showConfirmButton: false, // Hides the confirm button
            timer: 3000 
        });
    });
});
