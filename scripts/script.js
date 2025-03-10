document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    themeToggle.addEventListener('input', () => {
        let themeState = parseInt(themeToggle.value, 10); // Get slider value

        if (themeState === 0) {
            body.classList.remove('dark-mode', 'jian-yang-mode');
            themeIcon.innerHTML = '🌞'; // Light Mode
        } else if (themeState === 1) {
            body.classList.add('dark-mode');
            body.classList.remove('jian-yang-mode');
            themeIcon.innerHTML = '🌙'; // Dark Mode
        } else {
            body.classList.add('jian-yang-mode');
            body.classList.remove('dark-mode');
            themeIcon.innerHTML = `<img src="assets/jian.png" alt="Jian Yang" class="jian-icon">`; // Jian Yang Mode
        }
    });
});
// Menu Items & Prices (Now referencing `assets/` for images)
let menu = {
    "hotdog": { price: 4.00, image: "assets/hotdog.png" },
    "fries": { price: 3.50, image: "assets/fries.png" },
    "soda": { price: 1.50, image: "assets/soda.png" },
    "sauerkraut": { price: 1.00, image: "assets/sauerkraut.png" }
};

// Cart
let cart = { "hotdog": 0, "fries": 0, "soda": 0, "sauerkraut": 0 };

// Display Menu with Clickable Items
function displayMenu() {
    let menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";
    for (let item in menu) {
        let capitalized = item.charAt(0).toUpperCase() + item.slice(1);
        menuDiv.innerHTML += `<li onclick="selectItem('${capitalized}')" onmouseover="updateImage('${menu[item].image}', '${capitalized}')">${capitalized}: $${menu[item].price.toFixed(2)}</li>`;
    }
}

// Update Image on Hover
function updateImage(imageSrc, itemName) {
    const previewImage = document.getElementById("previewImage");
    const body = document.body;

    if (body.classList.contains("jian-yang-mode")) {
        if (itemName.toLowerCase() === "hotdog") {
            previewImage.src = "assets/hotdog.png";  // Show actual hotdog image
        } else {
            previewImage.src = "assets/nothotdog.png";  // Force nothotdog image for everything else
        }
    } else {
        previewImage.src = imageSrc; // Normal behavior for Light/Dark mode
    }
}

// Select Menu Item to Input Field
function selectItem(itemName) {
    document.getElementById("orderInput").value = itemName;
}

// Add to Cart
function addToCart() {
    let itemInput = document.getElementById("orderInput").value.trim().toLowerCase();
    let formattedInput = itemInput.toLowerCase();

    if (menu[formattedInput]) {
        cart[formattedInput]++;
        updateCart();

    } else {
        alert("Invalid item. Please select a menu item.");
    }
    document.getElementById("orderInput").value = "";
}

// Update Cart
function updateCart() {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    for (let item in cart) {
        if (cart[item] > 0) {
            cartDiv.innerHTML += `<div>${item.charAt(0).toUpperCase() + item.slice(1)}: ${cart[item]}</div>`;
        }
    }
}

// Checkout
function checkout() {
    let totalCost = 0;
    let orderSummary = "Order Summary:\n";

    for (let item in cart) {
        if (cart[item] > 0) {
            let itemCost = cart[item] * menu[item].price;
            totalCost += itemCost;
            orderSummary += `${cart[item]} x ${item.charAt(0).toUpperCase() + item.slice(1)} - $${itemCost.toFixed(2)}\n`;
        }
    }

    if (totalCost > 0) {
        orderSummary += `\nTotal: $${totalCost.toFixed(2)}`;
        alert(orderSummary);
    } else {
        alert("Your cart is empty.");
    }

    // Reset cart after checkout
    for (let item in cart) {
        cart[item] = 0;
    }
    updateCart();
}

displayMenu();