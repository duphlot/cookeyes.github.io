document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Bánh ngọt A", price: 30000, image: "images/product1.jpg" },
        { id: 2, name: "Vòng tay B", price: 40000, image: "images/product2.jpg" }
    ];
    
    const productList = document.querySelector('.product-list');
    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Giá: ${product.price} VND</p>
                <button onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
            </div>
        `;
    });
});

function addToCart(productId) {
    alert(`Đã thêm sản phẩm ${productId} vào giỏ hàng!`);
    // Có thể thêm logic để lưu vào localStorage hoặc kết nối với Firebase
}
