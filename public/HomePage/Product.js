const products = [
    {   id:1, 
        title: "Product 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {   id:2, 
        title: "Product 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {   id:3, 
        title: "Product 3",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {   id:4, 
        title: "Product 4",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {   id:5, 
        title: "Product 5",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    
];

function createProductHTML(product) {
    return `
        <div class="contain" onclick="productDetails(${product.id})">
            <div class="product-det">
                <div class="product-imag">
                    <img src="${product.image}" alt="${product.id}">
                </div>
                <div class="product-titl">${product.title}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-pri">${product.price}</div>
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
}
renderProducts();
function productDetails(ID){
    console.log(ID);    
    const clickedProduct = products.find(product => product.id === ID);
    console.log(clickedProduct);
    // Display product details in a specific section of your HTML
    const productDetailsContainer = document.getElementById("productDetails");   
/*
    productDetailsContainer.innerHTML = 
    `
        <h2>${clickedProduct.title}</h2>
        <p>${clickedProduct.description}</p>
        <p>Price: ${clickedProduct.price}</p>
        <img src="${clickedProduct.image}" alt="${clickedProduct.title}">
    `;*/
    console.log("Product Details");
    window.location.href = `../ProductDetails/productDetails.html?id=${clickedProduct.id}&title=${encodeURIComponent(clickedProduct.title)}&description=${encodeURIComponent(clickedProduct.description)}&price=${encodeURIComponent(clickedProduct.price)}&image=${encodeURIComponent(clickedProduct.image)}`;    myFunc();
 }
 productDetails();