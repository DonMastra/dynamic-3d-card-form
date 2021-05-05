const card = document.querySelector('#card'),
    btnOpenForm = document.querySelector('#btn-open-form'),
    form = document.querySelector('#form-card'),
    cardNum = document.querySelector('#card .num'),
    cardName = document.querySelector('#card .name'),
    brandLogo = document.querySelector('#brand-logo'),
    sign = document.querySelector('#card .sign p'),
    ExpirationMonth = document.querySelector('#card .month'),
    expirationYear = document.querySelector('#card .year');
ccv = document.querySelector('#card .ccv');

// Turn around card to show front
const showFront = () => {
    if (card.classList.contains('active')) {
        card.classList.remove('active');
    }
}

// Card rotation
card.addEventListener('click', () => {
    card.classList.toggle('active');
});

// Open form button
btnOpenForm.addEventListener('click', () => {
    btnOpenForm.classList.toggle('active');
    form.classList.toggle('active');
});

// * Selected month option.
for (let i = 1; i <= 12; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectMonth.appendChild(option);
}

// * Selected year option.
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectYear.appendChild(option);
}

// * Input card number
form.inputNum.addEventListener('keyup', (e) => {
    let valueInput = e.target.value;

    form.inputNum.value = valueInput
        // Delete blank spaces
        .replace(/\s/g, '')
        // Delete letters
        .replace(/\D/g, '')
        // Space between every four numbers
        .replace(/([0-9]{4})/g, '$1 ')
        // Deletes last space
        .trim();

    cardNum.textContent = valueInput;

    if (valueInput == '') {
        cardNum.textContent = '#### #### #### ####';

        brandLogo.innerHTML = '';
    }

    if (valueInput[0] == 4) {
        brandLogo.innerHTML = '';
        const image = document.createElement('img');
        image.src = 'img/logos/visa.png';
        brandLogo.appendChild(image);
    } else if (valueInput[0] == 5) {
        brandLogo.innerHTML = '';
        const image = document.createElement('img');
        image.src = 'img/logos/mastercard.png';
        brandLogo.appendChild(image);
    }

    // Turn around card to see front face.
    showFront();
});

// * Input card name
form.inputName.addEventListener('keyup', (e) => {
    let valueInput = e.target.value;

    form.inputName.value = valueInput.replace(/[0-9]/g, '');
    cardName.textContent = valueInput;
    sign.textContent = valueInput;

    if (valueInput == '') {
        cardName.textContent = 'Jhon Doe';
    }

    showFront();
});

// * Select month
form.selectMonth.addEventListener('change', (e) => {
    ExpirationMonth.textContent = e.target.value;
    showFront();
});

// * Select year
form.selectYear.addEventListener('change', (e) => {
    expirationYear.textContent = e.target.value.slice(2);
    showFront();
});

// * CCV
form.inputCcv.addEventListener('keyup', () => {
    if (!card.classList.contains('active')) {
        card.classList.toggle('active');
    }

    form.inputCcv.value = form.inputCcv.value
        // Delete blank spaces
        .replace(/\s/g, '')
        // Delete letters
        .replace(/\D/g, '');

    ccv.textContent = form.inputCcv.value;
});