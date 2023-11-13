const products = [
    {
        title: "Product 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Product 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Product 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Product 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Product 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    
];

function createProductHTML(product) {
    return `
        <div class="container">
            <div class="product-details">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-title">${product.title}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `;
}

function renderProducts() {
    const productListContainer = document.getElementById("productList");
    let productsHTML = '';
    let productsInRow = 0;

    products.forEach((product, index) => {
        if (productsInRow === 0) {
            productsHTML += '<div class="product-row">';
        }
       // console.log(productsHTML);
        productsHTML += createProductHTML(product);

        productsInRow++;
        //console.log(productsInRow)
        if (productsInRow === 3 || index === products.length - 1) {
            productsHTML += '</div>'; // Close the row after three products or at the end
            productsInRow = 0;
        }
    });

    productListContainer.innerHTML = productsHTML;
    console.log(productsHTML);
}

renderProducts();