document.querySelectorAll('#product-filters button').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.textContent.toLowerCase();
        document.querySelectorAll('.product-category').forEach(product => {
            if (category === 'evil eye' && product.classList.contains('evileye')) {
                product.style.display = 'none';
                product.style.display = 'block';
            }
            else if (category === 'cookies' && product.classList.contains('cookies')) {
                product.style.display = 'none';
                product.style.display = 'block';
            }
            else if (category === 'bracelets' && product.classList.contains('bracelets')) {
                product.style.display = 'block';
            }
            else {
                product.style.display = 'none';
            }
        });
        document.querySelectorAll('#product-filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const defaultCategory = 'bracelets';
    document.querySelectorAll('.product-category').forEach(product => {
        if (product.classList.contains(defaultCategory)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    document.querySelectorAll('#product-filters button').forEach(button => {
        if (button.textContent.toLowerCase() === defaultCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    displayCartProducts();
});

document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const productStyle = this.closest('.product-category').classList.contains('cookies');
        const productCard = this.closest('.card');
        const productName = productCard.querySelector('.card-title').textContent.trim();
        const productPrice = productCard.querySelector('.card-text').textContent.split(':')[1].trim();
        const productImage = productCard.querySelector('img').getAttribute('src');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(product => product.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            const product = { name: productName, price: productPrice,style: productStyle, image: productImage, quantity: 1 };
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });
});

function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.name === productName);
    cart.splice(productIndex, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cartCount').textContent = totalQuantity;
}

function updateCartUI() {
    updateCartCount();
    displayCartProducts();
}

function displayCartProducts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-product', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');
            itemDiv.innerHTML = `
            <div class="item-details d-flex align-items-center w-100">
                <div class="flex-grow-1">
                    <h4 class="cart-product-title mb-1" style="font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h4>
                </div>
                <div class="d-flex align-items-center justify-content-center flex-grow-1">
                    <div class="item-price-quantity d-flex flex-column align-items-center">
                        <p class="cart-product-price mb-1" style="font-size: 1rem;">${item.price}</p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-secondary btn-sm adjust-quantity decreaseQuantityBtn me-2 d-flex align-items-center justify-content-center" style="font-size:1.2rem; width: 30px; height: 30px;">-</button>
                            <span class="quantity me-2" style="font-size: 1.2rem;">${item.quantity}</span>
                            <button class="btn btn-secondary btn-sm adjust-quantity increaseQuantityBtn d-flex align-items-center justify-content-center" style="font-size:1.2rem; width: 30px; height: 30px;">+</button>
                        </div>
                    </div>
                </div>
                <span class="trash-icon ms-3" onclick="removeFromCart('${item.name}')">&#128465;</span>
            </div>
            `;
            cartContainer.appendChild(itemDiv);
        });
        addCartButtonsEvents();
    }
}

function addCartButtonsEvents() {
    document.querySelectorAll('.removeFromCartBtn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cart-product');
            const productName = productCard.querySelector('.cart-product-title').textContent;
            removeFromCart(productName);
        });
    });

    document.querySelectorAll('.increaseQuantityBtn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cart-product');
            const productName = productCard.querySelector('.cart-product-title').textContent;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(product => product.name === productName);
            if (product) product.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        });
    });

    document.querySelectorAll('.decreaseQuantityBtn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cart-product');
            const productName = productCard.querySelector('.cart-product-title').textContent;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productIndex = cart.findIndex(product => product.name === productName);
            if (productIndex !== -1) {
                if (cart[productIndex].quantity > 1) {
                    cart[productIndex].quantity -= 1; 
                } else {
                    cart.splice(productIndex, 1); 
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        });
    });
}
