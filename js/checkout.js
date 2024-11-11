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
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the element where we will display the cart items
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');

    let subtotal = 0;

    // Loop through the cart items and create HTML for each
    cartItemsContainer.innerHTML = ''; // Clear the existing cart content
    cart.forEach(item => {
        // Create a new div for each product in the cart
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong> - ${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);

        // Update subtotal
        subtotal += parseInt(item.price.replace(/\D/g, '')); // Remove non-numeric characters
    });

    // Display subtotal
    subtotalElement.textContent = `${subtotal} VND`;

    // Form submission handling
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the values from the form
        const fullName = document.getElementById('billing-name').value;
        const email = document.getElementById('billing-email').value;
        const address = document.getElementById('billing-address').value;
        const zip = document.getElementById('billing-number').value;
        const day = document.getElementById('delivery-day').value;
        const time = document.getElementById('delivery-time').value;
        const otheraddress = document.getElementById('other-address').value;
        // Prepare data to send to the Google Sheets API
        const orderData = {
            fullName: fullName,
            email: email,
            address: address + ' - ' + otheraddress,
            city: day+' - '+time,
            zip: zip,
            cartItems: JSON.stringify(cart), // Convert cart items array to string
            subtotal: subtotal
        };

        // Replace this with the URL of your deployed Google Apps Script web app
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbxOxB3-Zdt8GKdcjMBs1A2IoPEClKI4vuCgJol8P6c8pKt9kfo7FYVCKiNk92RjhI4x0Q/exec';
        fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
            mode: 'no-cors'  // Chế độ no-cors để thử nghiệm
        })
        .then(response => {
            console.log('Order submitted successfully');

            // Clear local storage
            localStorage.removeItem('cart');

            // Clear cart display
            cartItemsContainer.innerHTML = '';
            subtotalElement.textContent = '0 VND';

            // Reset form fields
            checkoutForm.reset();
        })
        .catch(error => {
            console.error('Error submitting order:', error);
            alert('There was an error processing your order. Please try again.');
        });        
    });
});