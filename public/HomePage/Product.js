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
        const userId = localStorage.getItem("userId");
        const productsResponse = await fetch(`/Products/${userId}`,{
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

    categories.forEach((category, i) => {
        const listItem = document.createElement('li');
        listItem.textContent = category.name;
        listItem.setAttribute('id', category['_id']);

        listItem.addEventListener('click', async () => {
            // When a category is clicked, render products of that category
            const categoryId = category['_id'];
            const userId = localStorage.getItem("userId");
            await renderProductsByCategory(userId, categoryId);
        });

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
                <div class="product-rating">Rating: ${product.ratings !== undefined ? product.ratings : 0}</div>
                <div class="product-desc">${product.category ? product.category.name : 'No Category'}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-pri">${product.price}</div>
                <div class="Edit"><button>Edit</button></div>
            </div>
        </div>
    `;
}
async function productDetails(userId,ID) {
    console.log(ID);
    console.log(localStorage.getItem('admin'));
    console.log("Product Details");
    const productsResponse = await fetch(`/Products/${userId}/${ID}`);
    const productData = await productsResponse.json();
    const product = productData.data;  // Assuming the product data is in a 'data' property

    window.location.href = `../ProductDetails/productDetails.html?id=${product._id}&title=${encodeURIComponent(product.name)}&description=${encodeURIComponent(product.desc)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.img)}`;
    // myFunc(); // Commented out as 'myFunc()' is not defined in the provided code
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
async function renderProductsByCategory(userId, categoryId) {
    try {
        const productsResponse = await fetch(`/Products/${userId}/Cate/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('admin')}`
            }
        });
        const productsData = await productsResponse.json();

        // Render products
        renderProducts(productsData.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}
renderProducts();
