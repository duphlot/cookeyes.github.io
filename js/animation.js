document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function(event) {
        const cart = document.querySelector('#cartBtn');
        const productImage = event.target.closest('.card').querySelector('.carousel-item.active img');
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

document.querySelectorAll('.carousel').forEach(function(carousel) {
    let touchstartX = 0;
    let touchendX = 0;

    // Xử lý sự kiện bắt đầu vuốt
    carousel.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    });

    // Xử lý sự kiện kết thúc vuốt
    carousel.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    // Kiểm tra hướng vuốt và điều khiển carousel
    function handleSwipe() {
        if (touchendX < touchstartX) {
            // Vuốt sang trái, chuyển tới slide tiếp theo
            carousel.querySelector('.carousel-control-next').click();
        }
        if (touchendX > touchstartX) {
            // Vuốt sang phải, quay lại slide trước đó
            carousel.querySelector('.carousel-control-prev').click();
        }
    }
});
