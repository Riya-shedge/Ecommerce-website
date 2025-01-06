// Initialize the cart as an empty array
let cart = [];

// Select DOM elements
const cartCount = document.querySelector('.cart'); // To update cart count
const cartIcon = document.querySelector('.navcart'); // The cart icon in the navbar
const cartPopup = document.createElement('div'); // Create a div for the cart popup
document.body.appendChild(cartPopup); // Append the popup div to the body
cartPopup.style.display = 'none'; // Hide the popup initially
cartPopup.style.position = 'fixed';
cartPopup.style.top = '0';
cartPopup.style.left = '0';
cartPopup.style.width = '100vw';
cartPopup.style.height = '100vh';
cartPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
cartPopup.style.color = 'white';
cartPopup.style.padding = '20px';
cartPopup.style.overflowY = 'scroll';

// Function to update the cart count
function updateCartCount() {
    cartCount.textContent = `Cart (${cart.length})`; // Show number of items in the cart
}

// Function to update the cart popup with cart items
function updateCartPopup() {
    // Clear previous content
    cartPopup.innerHTML = '';
    
    if (cart.length === 0) {
        cartPopup.innerHTML = '<h2>Your cart is empty!</h2>';
    } else {
        let totalAmount = 0;
        cartPopup.innerHTML = '<h2>Your Cart</h2>';
        cart.forEach(item => {
            cartPopup.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;">
                    <p>${item.name}</p>
                    <p>Price: Rs.${item.price}</p>
                </div>
            `;
            totalAmount += item.price;
        });
        
        // Show the total
        cartPopup.innerHTML += `<p><strong>Total: Rs.${totalAmount}</strong></p>`;
        
        // Add Buy Now button
        const buyNowButton = document.createElement('button');
        buyNowButton.textContent = 'Buy Now';
        buyNowButton.style.padding = '10px 20px';
        buyNowButton.style.backgroundColor = 'green';
        buyNowButton.style.color = 'white';
        buyNowButton.style.fontSize = '16px';
        buyNowButton.style.border = 'none';
        buyNowButton.style.cursor = 'pointer';
        cartPopup.appendChild(buyNowButton);

        // Buy Now Button Click Event
        buyNowButton.addEventListener('click', function() {
            alert('Your order is submitted!');
            cart = []; // Clear the cart
            updateCartCount(); // Update cart count
            cartPopup.style.display = 'none'; // Close the cart popup
        });
    }
}

// Function to toggle the cart popup
cartIcon.addEventListener('click', function() {
    cartPopup.style.display = (cartPopup.style.display === 'none') ? 'block' : 'none';
    updateCartPopup();
});

// Add to Cart function for each product
const addToCartButtons = document.querySelectorAll('.mycart p');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const productBox = button.closest('.box-content');
        const productName = productBox.querySelector('.names').textContent.split('Rs.')[0].trim(); // Get product name
        const productPrice = parseInt(productBox.querySelector('.names').textContent.split('Rs.')[1].trim()); // Get product price
        const productImage = productBox.querySelector('.box-img').style.backgroundImage.slice(5, -2); // Get product image URL

        // Add product to the cart
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage
        });

        updateCartCount(); // Update cart count
    });
});
