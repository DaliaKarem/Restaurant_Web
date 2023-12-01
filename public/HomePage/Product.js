/*const products = [
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
    
];*/

//function for get all categories

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),  
  });
    let datas= await response.json(); 
console.log("Data is");
    console.log(datas);  // Add this line to see the response in the console

    return datas;
  }

document.addEventListener('DOMContentLoaded', async () =>{
    // Sample categories (you can fetch these dynamically from your backend)
    
    const CategoryResponse = await postData("/getCategory");
    console.log("Category :"+CategoryResponse);
    //const categories = ['All Product','Category 2','Category 2', 'Category 2', 'Category 3', 'Category 4'];

    // Get the category list container
    const categoryList = document.getElementById('categoryList');

    // Add each category to the list
    CategoryResponse.categorys.forEach((category,i) => {
        const listItem = document.createElement('li');
        listItem.textContent = category.name;
        categoryList.appendChild(listItem);
    });
});
//return `

function createProductHTML(product) {
    return `
        <div class="contain" onclick="productDetails(${product.id})">
            <div class="product-det">
                <div class="product-imag">
                    <img src="${product.img}" alt="${product.id}">
                </div>
                <div class="product-titl">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-pri">${product.price}</div>
            </div>
        </div>
    `;
  
}
  async function renderProducts() {
    const productListContainer = document.getElementById("productList");
    let productsHTML = '';
    let productsInRow = 0;

    const productsResponse = await postData("/getProducts");

    productsResponse.Products.forEach((product, index) => {
        if (productsInRow === 0) {
            productsHTML += '<div class="product-row">';
        }
        productsHTML += createProductHTML(product);
        productsInRow++;
        if (productsInRow === 3 || index === productsResponse.Products.length - 1) {
            productsHTML += '</div>';
            productsInRow = 0;
        }
    });

    productListContainer.innerHTML = productsHTML;
}

renderProducts();
/*
function productDetails(ID){
    console.log(ID);    
    const clickedProduct = products.find(product => product.id === ID);
    console.log(clickedProduct);
    // Display product details in a specific section of your HTML
    const productDetailsContainer = document.getElementById("productDetails");   
   
    console.log("Product Details");
    window.location.href = `../ProductDetails/productDetails.html?id=${clickedProduct.id}&title=${encodeURIComponent(clickedProduct.title)}&description=${encodeURIComponent(clickedProduct.description)}&price=${encodeURIComponent(clickedProduct.price)}&image=${encodeURIComponent(clickedProduct.image)}`;    myFunc();
 }
 productDetails();*/
