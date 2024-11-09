const products = [
    {
        imgSrc: "images/productImg/1.png",
        altText: "Bánh Ngọt",
        title: "Bánh Ngọt A",
        price: "30,000 VND"
    },
    {
        imgSrc: "images/product2.jpg",
        altText: "Vòng Tay B",
        title: "Vòng Tay B",
        price: "40,000 VND"
    }
    // Add more products as needed
];

function displayProducts() {
    const productContainer = document.querySelector('.row');
    products.forEach(product => {
        const productHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${product.imgSrc}" class="card-img-top" alt="${product.altText}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Giá: ${product.price}</p>
                        <a href="#" class="btn btn-primary">Thêm vào giỏ hàng</a>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);