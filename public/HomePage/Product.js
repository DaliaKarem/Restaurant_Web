const Name=document.getElementById("Name");
Name.textContent=localStorage.getItem("name");

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch categories
        const categoryResponse = await fetch("/Category",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('admin')}`
            }
        });
        const categoryData = await categoryResponse.json();

        // Fetch products
        const productsResponse = await fetch("/Products",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('admin')}`
            }
        });
        const productsData = await productsResponse.json();

        // Render categories
        renderCategories(categoryData.data);

        // Render products
        renderProducts(productsData.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
});

function renderCategories(categories) {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = ''; // Clear previous content

    categories.forEach((category, i) => {
        const listItem = document.createElement('li');
        listItem.textContent = category.name;
        categoryList.appendChild(listItem);
    });
}

function createProductHTML(product) {
    return `
        <div class="contain" onclick="productDetails(${product._id})">
            <div class="product-det">
                <div class="product-imag">
                  <img src="${product.img}" alt="${product._id}">
                </div>
                <div class="product-titl">${product.name}</div>
                <div class="product-desc">${product.category ? product.category.name : 'No Category'}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-pri">${product.price}</div>
                <div class="Edit"><button>Edit</button></div>
            </div>
        </div>
    `;
}
async function productDetails(ID){
    console.log(ID);   
    console.log(localStorage.getItem('admin')),
    console.log("Product Details"); 
    const productsResponse = await fetch("/Products/${ID}");
    const productsData = await productsResponse.json();
    window.location.href = `../ProductDetails/productDetails.html?id=${clickedProduct.id}&title=${encodeURIComponent(clickedProduct.title)}&description=${encodeURIComponent(clickedProduct.description)}&price=${encodeURIComponent(clickedProduct.price)}&image=${encodeURIComponent(clickedProduct.image)}`;    myFunc();
 }
function renderProducts(products) {
    //console.log("product Details "+product._id);
    const productListContainer = document.getElementById("productList");
    productListContainer.innerHTML = ''; // Clear previous content

    let productsHTML = '';
    let productsInRow = 0;

    products.forEach((product, index) => {
        if (productsInRow === 0) {
            productsHTML += '<div class="product-row">';
        }
        productsHTML += createProductHTML(product);
        productsInRow++;
        if (productsInRow === 3 || index === products.length - 1) {
            productsHTML += '</div>';
            productsInRow = 0;
        }
    });

    productListContainer.innerHTML = productsHTML;
}

renderProducts();

