function toggleOtherAddress(select) {
    var otherAddressInput = document.getElementById('other-address');
    if (select.value === 'other') {
        otherAddressInput.style.display = 'block';
        otherAddressInput.required = true;
    } else {
        otherAddressInput.style.display = 'none';
        otherAddressInput.required = false;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const discountCombosContainer = document.getElementById('discountCombos');
    let subtotal = 0;
    let cookiesCount = 0;
    let braceletsCount = 0;

    cart.forEach(item => {
        if (item.style) {
            cookiesCount++;
        } else {
            braceletsCount++;
        }
        subtotal += parseInt(item.price.replace(/\D/g, ''));
    });

    let discount = 0;
    const discountCombos = [];

    while (cookiesCount >= 10) {
        discount += 25000;
        cookiesCount -= 10;
        discountCombos.push("Combo 10 cookies - Discount 25,000 VND");
    }

    while (cookiesCount >= 5) {
        discount += 10000;
        cookiesCount -= 5;
        discountCombos.push("Combo 5 cookies - Discount 10,000 VND");
    }

    while (cookiesCount >= 2 && braceletsCount >= 1) {
        discount += 5000;
        cookiesCount -= 2;
        braceletsCount -= 1;
        discountCombos.push("Combo 2 cookies + 1 bracelet - Discount 5,000 VND");
    }

    while (braceletsCount >= 2) {
        discount += 5000;
        braceletsCount -= 2;
        discountCombos.push("Combo 2 bracelets - Discount 5,000 VND");
    }

    while (cookiesCount >= 2) {
        discount += 2000;
        cookiesCount -= 2;
        discountCombos.push("Combo 2 cookies - Discount 2,000 VND");
    }

    const total = subtotal - discount;

    cartItemsContainer.innerHTML = ''; 
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="item-details">
                <p class="item-name"><strong>${item.name}</strong> - ${item.price}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    discountCombosContainer.innerHTML = '<h3>Discounted Combos:</h3>';
    discountCombos.forEach(combo => {
        const comboDiv = document.createElement('div');
        comboDiv.classList.add('discount-combo');
        comboDiv.textContent = combo;
        discountCombosContainer.appendChild(comboDiv);
    });

    subtotalElement.textContent = `${total} VND`;
    subtotalElement.style.marginTop = '10px';

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('billing-name').value;
        const email = document.getElementById('billing-email').value;
        const address = document.getElementById('billing-address').value;
        const zip = document.getElementById('billing-number').value;
        const day = document.getElementById('delivery-day').value;
        const time = document.getElementById('delivery-time').value;
        const otheraddress = document.getElementById('other-address').value;

        const orderData = {
            fullName: fullName,
            email: email,
            address: address + ' - ' + otheraddress,
            city: day + ' - ' + time,
            zip: zip,
            cartItems: JSON.stringify(cart),
            subtotal: subtotal
        };

        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbxOxB3-Zdt8GKdcjMBs1A2IoPEClKI4vuCgJol8P6c8pKt9kfo7FYVCKiNk92RjhI4x0Q/exec';
        fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
            mode: 'no-cors'
        })
        .then(response => {
            console.log('Order submitted successfully');

            localStorage.removeItem('cart');

            cartItemsContainer.innerHTML = '';
            subtotalElement.textContent = '0 VND';

            checkoutForm.reset();
        })
        .catch(error => {
            console.error('Error submitting order:', error);
            alert('There was an error processing your order. Please try again.');
        });        
    });
});
