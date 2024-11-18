function adjustQuantity(action, index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let quantity = cart[index].quantity || 1;
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    cart[index].quantity = quantity; 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    renderCart(); 
}

function updateSubtotal() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('.item-total-price').textContent.replace(' VND', '').replace(',', ''));
        subtotal += quantity * price;
    });
    
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
}

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

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const discountCombosContainer = document.getElementById('discountCombos');

    let subtotal = 0;
    let cookiesCount = 0;
    let braceletsCount = 0;

    // Tính toán lại tổng tiền và số lượng của từng loại
    cart.forEach(item => {
        const quantity = item.quantity || 1;
        const itemPrice = parseInt(item.price.replace(/\D/g, ''));
        subtotal += itemPrice * quantity;

        if (item.style) {
            cookiesCount += quantity;
        } else {
            braceletsCount += quantity;
        }
    });
    let discount = 0;
    const discountCombos = [];
    let count = 0;
    //discountCombos.push(`Cookies: ${cookiesCount} - Bracelets: ${braceletsCount}`);

    // Tính toán các combo giảm giá
    while (cookiesCount >= 10) {
        discount += 25000;
        cookiesCount -= 10;
        count++;
    }
    if (count > 0) discountCombos.push("Combo 10 cookies - Discount 25,000 VND" + (count > 1 ? ` x${count}` : ''));
    
    count = 0;
    while (braceletsCount >= 2) {
        discount += 5000;
        braceletsCount -= 2;
        count++;
    }
    while (cookiesCount >= 3) {
        discount += 5000;
        cookiesCount -= 3;
        count++;
    }
    discountCombos.push(`Special Discount: -${discount} VND`);
    const total = subtotal - discount;

    // Cập nhật lại HTML giỏ hàng
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemPrice = parseInt(item.price.replace(/\D/g, ''));
        const totalItemPrice = itemPrice * quantity;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
        <div class="item-details">
            <span class="trash-icon" onclick="removeItem(${index})">&#128465;</span>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div>
                <p class="item-name">${item.name}</p>
                <p class="item-price-quantity">
                    <button class="btn btn-secondary btn-sm adjust-quantity" onclick="adjustQuantity('decrease', ${index})">-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="btn btn-secondary btn-sm adjust-quantity" onclick="adjustQuantity('increase', ${index})">+</button>
                </p>
            </div>
        </div>
        <p class="item-total-price">${totalItemPrice} VND</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Cập nhật combo giảm giá
    discountCombosContainer.innerHTML = '';
    discountCombos.forEach(combo => {
        const comboDiv = document.createElement('div');
        comboDiv.classList.add('discount-combo');
        comboDiv.textContent = combo;
        discountCombosContainer.appendChild(comboDiv);
    });
    subtotalElement.textContent = `${total} VND`;
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
            zip:zip,
            cartItems: JSON.stringify(cart),
            subtotal: total
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
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    renderCart();
}

window.addEventListener('DOMContentLoaded', renderCart);
