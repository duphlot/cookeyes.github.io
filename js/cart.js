let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartModal();
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const productStyle = this.closest('.product-category').classList.contains('cookies');
        const card = this.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const productPrice = parseInt(card.querySelector('.card-text').textContent.replace('Price: ', '').replace(' VND', ''));

        cart.push({ name: productName, price: productPrice, style: productStyle });
        updateCartUI();
        updateCartModal();
    });
});

function updateCartUI() {
    cartCount.textContent = cart.length;
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `
            <span>${item.style} - ${item.name} - ${item.price} VND</span>
            <button class="btn btn-danger btn-sm remove-item-btn" data-index="${index}">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        subtotal += item.price;
    });
    subtotalElement.textContent = subtotal;
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartUI();
            updateCartModal();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    updateCartModal();
});
