document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function(event) {
        const cart = document.querySelector('#cartBtn');
        const productImage = event.target.closest('.card').querySelector('img');
        const productImageClone = productImage.cloneNode(true);

        const rect = productImage.getBoundingClientRect();
        productImageClone.style.position = 'fixed';
        productImageClone.style.top = `${rect.top}px`;
        productImageClone.style.left = `${rect.left}px`;
        productImageClone.style.width = `${rect.width}px`;
        productImageClone.style.height = `${rect.height}px`;
        productImageClone.style.transition = 'all 1s ease-in-out';
        productImageClone.style.zIndex = '1000';

        document.body.appendChild(productImageClone);

        const cartRect = cart.getBoundingClientRect();
        setTimeout(() => {
        productImageClone.style.top = `${cartRect.top}px`;
        productImageClone.style.left = `${cartRect.left}px`;
        productImageClone.style.width = '0px';
        productImageClone.style.height = '0px';
        productImageClone.style.opacity = '0';
        }, 100);

        productImageClone.addEventListener('transitionend', () => {
        productImageClone.remove();
        });
    });
});