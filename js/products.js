document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart.length);
    displayCartProducts();
});

document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.card');
        const productName = productCard.querySelector('.card-title').textContent.trim();
        const productPrice = productCard.querySelector('.card-text').textContent.split(':')[1].trim();

        const product = { name: productName, price: productPrice };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });
});

function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(product => product.name.trim() !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartUI();
}

function updateCartCount(count) {
    document.getElementById('cartCount').textContent = count;
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart.length);
    displayCartProducts();
}

function displayCartProducts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-product');
            productElement.innerHTML = `
                <h5 class="cart-product-title">${product.name}</h5>
                <p class="cart-product-price">Price: ${product.price}</p>
                <span class="removeFromCartBtn" style="position: absolute; top: 5px; right: 5px; font-size: 18px; cursor: pointer;">x</span>
            `;
            cartContainer.appendChild(productElement);
        });
    }

    // Add event listeners to the "x" buttons after rendering products
    addRemoveButtons();
}

function addRemoveButtons() {
    document.querySelectorAll('.removeFromCartBtn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cart-product');
            const productName = productCard.querySelector('.cart-product-title').textContent;
            removeFromCart(productName);
        });
    });
}

// Call the function to display products on page load
document.addEventListener('DOMContentLoaded', displayCartProducts);
