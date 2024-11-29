// selected menu
function redirectToPage() {
  const selectElement = document.getElementById("category");
  const selectedValue = selectElement.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}
//added to cart
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}
function addToCart(productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productExists = cart.find((item) => item.name === productName);
  if (!productExists) {
    cart.push({ name: productName, price: productPrice, image: productImage });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let productCard = button.closest(".product-card");
      let productName = productCard.querySelector(".product-name").textContent;
      let productPrice =
        productCard.querySelector(".product-price").textContent;
      let productImage = productCard.querySelector(".product-image").src;
      productPrice = parseFloat(productPrice.replace("$", ""));

      addToCart(productName, productPrice, productImage);
    });
  });
  updateCartCount();
});
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  // Display all items in the cart
  cart.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
          <div class="product-name">${item.name}</div>
          <div class="product-price">$${item.price}</div>
          <button class="remove-from-cart-btn" data-name="${item.name}">Remove</button>
      `;
    cartContainer.appendChild(cartItem);
  });
  // Handle remove button click
  const removeFromCartButtons = document.querySelectorAll(
    ".remove-from-cart-btn"
  );
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let productName = button.getAttribute("data-name");
      removeFromCart(productName);
      button.closest(".cart-item").remove();
    });
  });
});
// Function to remove item from the cart
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Update the cart count after removing
}

//favourite button added
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
updateFavCount();
document.querySelectorAll(".favorite-icon").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    const product = {
      name: productCard.querySelector(".product-name").textContent,
      price: productCard.querySelector(".product-price").textContent,
      image: productCard.querySelector(".product-image").src,
    };
    // Check if product is already in favorites
    const isFavorite = favorites.some((fav) => fav.name === product.name);
    if (!isFavorite) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavCount();
      alert(`${product.name} has been added to your favorites.`);
      event.target.src = "./img/redheart.png";
    } else {
      alert(`${product.name} is already in your favorites.`);
    }
  });
});
// Render favorite products on the favorites page
if (window.location.pathname.includes("favourite.html")) {
  const favoriteProductsContainer =
    document.getElementById("favorite-products");

  if (favorites.length === 0) {
    favoriteProductsContainer.innerHTML = "<p>No favorite products yet.</p>";
  } else {
    favorites.forEach((product, index) => {
      const productHTML = `
        <div class="product-card">
          <img src="${product.image}" class="product-image" alt="${product.name}" />
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <button class="remove-btn" onclick="removeFromFavorites(${index})">Remove</button>
        </div>
      `;
      favoriteProductsContainer.innerHTML += productHTML;
    });
  }
}
// Function to remove a product from favorites
function removeFromFavorites(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavCount();
  location.reload();
}
// Update the favorite count display
function updateFavCount() {
  const favCount = document.getElementById("fav-count");
  if (favCount) {
    favCount.textContent = favorites.length;
  }
}

// Dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const icon = document.getElementById("theme-toggle-icon");
  if (body.classList.contains("dark-mode")) {
    icon.src = "./img/moon.png";
    localStorage.setItem("dark-mode", "enabled");
  } else {
    icon.src = "./img/sun1.png";
    localStorage.setItem("dark-mode", "disabled");
  }
  const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navbarLinks.forEach((link) => {
    link.classList.toggle("dark-mode");
  });
  const searchInput = document.querySelector(".search-input");
  searchInput.classList.toggle("dark-mode");

  const signupButton = document.querySelector(".create-signup-btn");
  signupButton.classList.toggle("dark-mode");
}

// On page load, check if dark mode is enabled
window.onload = () => {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    const icon = document.getElementById("theme-toggle-icon");
    icon.src = "./img/moon.png";
    const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navbarLinks.forEach((link) => {
      link.classList.add("dark-mode");
    });
    const searchInput = document.querySelector(".search-input");
    searchInput.classList.add("dark-mode");

    const signupButton = document.querySelector(".create-signup-btn");
    signupButton.classList.add("dark-mode");
  }
};

// Function to toggle dark mode
function toggleDarkMode() {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
}
window.onload = function () {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

// searchbar products array
const products = [
  {
    name: "Chocos",
    price: "$10.99",
    image: "./readytoeatimg/chocos.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Kiwi",
    price: "$38.50",
    image: "./img/kiwi.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Onion",
    price: "$19.50",
    image: "./img/onion.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Mango",
    price: "$15.50",
    image: "./img/mango.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Pumpkin",
    price: "$19.50",
    image: "./img/pumpkin.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Lettuce",
    price: "$16.50",
    image: "./img/lettuce.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Sweet Corn",
    price: "$17.50",
    image: "./img/sweet corn.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Strawberry",
    price: "$58.50",
    image: "./img/strawberry.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Star Fruit",
    price: "$17.50",
    image: "./img/star fruit.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Sapota",
    price: "$15.50",
    image: "./img/sapota.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Apple",
    price: "$1.99",
    image: "./img/apple.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Orange",
    price: "$0.99",
    image: "./img/orange.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Banana",
    price: "$0.69",
    image: "./img/banana.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Grapes",
    price: "$2.49",
    image: "./img/grapes.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Carrot",
    price: "$31.50",
    image: "./img/carrot.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Broccoli",
    price: "$28.00",
    image: "./img/broccoli.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Tomato",
    price: "$61.20",
    image: "./img/tomato.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Potato",
    price: "$40.80",
    image: "./img/potato.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cucumber",
    price: "$12.75",
    image: "./img/cucumber.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Pineapple",
    price: "$25.50",
    image: "./img/pine apple.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Peach",
    price: "$29.00",
    image: "./img/peach.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Lemon",
    price: "$45.10",
    image: "./img/lemon.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Bell Pepper",
    price: "$16.80",
    image: "./img/bell-pepper.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ladies Finger",
    price: "$18.40",
    image: "./img/ladies finger.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Melon",
    price: "$32.00",
    image: "./img/melon.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Avocado",
    price: "$20.20",
    image: "./img/avacado.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Pear",
    price: "$21.60",
    image: "./img/pear.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cherry",
    price: "$38.50",
    image: "./img/cherry.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Beetroot",
    price: "$18.50",
    image: "./img/beetroot.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Blueberry",
    price: "$12.50",
    image: "./img/Blue berry.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Brinjal",
    price: "$10.50",
    image: "./img/brinjal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cabbage",
    price: "$15.50",
    image: "./img/cabbage.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cauliflower",
    price: "$16.50",
    image: "./img/cauliflower.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Green Peas",
    price: "$18.50",
    image: "./img/green peas.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Pomegranates",
    price: "$48.50",
    image: "./img/pomegranates.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ridge Gourd",
    price: "$38.50",
    image: "./img/ridge gourd.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Snack Gourd",
    price: "$38.50",
    image: "./img/snack-gourd.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fig",
    price: "$9.50",
    image: "./img/fig.jpg",
    favoriteImage: "./img/heart.jpg",
  },

  {
    name: "Apsara Extra Dark",
    price: "$6.99",
    image: "./stationaryimg/Apsara Extra Dark.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Classmate Notebook",
    price: "$10.50",
    image: "./stationaryimg/classmate notebook.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "DOMS Sketch",
    price: "$12.00",
    image: "./stationaryimg/DOMS sketch.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevi Stick",
    price: "$11.20",
    image: "./stationaryimg/fevi stick.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevicol",
    price: "$5.80",
    image: "./stationaryimg/fevicol.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevigum Glue",
    price: "$7.60",
    image: "./stationaryimg/fevigum Glue.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Apsara Eraser",
    price: "$5.80",
    image: "./stationaryimg/Apsara eraser.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ballpoint Pen",
    price: "$10.80",
    image: "./stationaryimg/Ballpoint pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Button File Folder",
    price: "$15.80",
    image: "./stationaryimg/Button File folder.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cello Paper Soft Pen",
    price: "$25.80",
    image: "./stationaryimg/Cello papersoft pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Envelope",
    price: "$5.60",
    image: "./stationaryimg/envelope.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "File",
    price: "$10.80",
    image: "./stationaryimg/File.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fountain Pen",
    price: "$35.80",
    image: "./stationaryimg/Fountain pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fourruled Note",
    price: "$15.80",
    image: "./stationaryimg/four ruled note.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Hero Pen",
    price: "$50.90",
    image: "./stationaryimg/hero pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ink Pen",
    price: "$45.60",
    image: "./stationaryimg/Ink pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "LongSize Note",
    price: "$12.70",
    image: "./stationaryimg/longsize note.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Marker",
    price: "$9.80",
    image: "./stationaryimg/marker.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Mongol",
    price: "$12.80",
    image: "./stationaryimg/mongal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Nataraj",
    price: "$4.80",
    image: "./stationaryimg/nataraj.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Office Folder",
    price: "$50.40",
    image: "./stationaryimg/Office folder.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Papermate Eraser",
    price: "$3.80",
    image: "./stationaryimg/paper mate eraser.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Permanent Marker",
    price: "$20.80",
    image: "./stationaryimg/permanenet marker.png",
    favoriteImage: "./img/heart.jpg",
  },

  {
    name: "Classmate Notebook",
    price: "$10.50",
    image: "./stationaryimg/classmate notebook.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "DOMS Sketch",
    price: "$12.00",
    image: "./stationaryimg/DOMS sketch.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevi Stick",
    price: "$11.20",
    image: "./stationaryimg/fevi stick.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevicol",
    price: "$5.80",
    image: "./stationaryimg/fevicol.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fevigum Glue",
    price: "$7.60",
    image: "./stationaryimg/fevigum Glue.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Apsara Eraser",
    price: "$5.80",
    image: "./stationaryimg/Apsara eraser.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ballpoint Pen",
    price: "$10.80",
    image: "./stationaryimg/Ballpoint pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Button File Folder",
    price: "$15.80",
    image: "./stationaryimg/Button File folder.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cello Paper Soft Pen",
    price: "$25.80",
    image: "./stationaryimg/Cello papersoft pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Envelope",
    price: "$5.60",
    image: "./stationaryimg/envelope.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "File",
    price: "$10.80",
    image: "./stationaryimg/File.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fountain Pen",
    price: "$35.80",
    image: "./stationaryimg/Fountain pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fourruled Note",
    price: "$15.80",
    image: "./stationaryimg/four ruled note.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Hero Pen",
    price: "$50.90",
    image: "./stationaryimg/hero pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ink Pen",
    price: "$45.60",
    image: "./stationaryimg/Ink pen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "LongSize Note",
    price: "$12.70",
    image: "./stationaryimg/longsize note.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Marker",
    price: "$9.80",
    image: "./stationaryimg/marker.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Mongol",
    price: "$12.80",
    image: "./stationaryimg/mongal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Nataraj",
    price: "$4.80",
    image: "./stationaryimg/nataraj.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Office Folder",
    price: "$50.40",
    image: "./stationaryimg/Office folder.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Papermate Eraser",
    price: "$3.80",
    image: "./stationaryimg/paper mate eraser.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Permanent Marker",
    price: "$20.80",
    image: "./stationaryimg/permanenet marker.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Bourbon",
    price: "$10.99",
    image: "./img/bourbon.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Britania",
    price: "$20.99",
    image: "./img/britania.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cadbury",
    price: "$11.50",
    image: "./img/cadbury.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Darkfantacy",
    price: "$20.00",
    image: "./img/darkfantacy.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Kissan",
    price: "$11.20",
    image: "./img/kissan.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Milk Bikis",
    price: "$10.80",
    image: "./img/milkbikis.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Parle Rusk",
    price: "$11.60",
    image: "./img/parle rusk.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Snickers",
    price: "$05.75",
    image: "./img/snickers.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Yippee",
    price: "$11.30",
    image: "./img/yippees.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Bingo Mad Angles",
    price: "$5.30",
    image: "./img/Bingo Mad Angles.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Bingo",
    price: "$5.30",
    image: "./img/Bingo.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Biscafe",
    price: "$11.30",
    image: "./img/Biscafe.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cadbury",
    price: "$20.30",
    image: "./img/cadbury.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Britania",
    price: "$9.30",
    image: "./img/britania.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Caramilk",
    price: "$14.30",
    image: "./img/Caramilk.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cocoa Dark Chocolate",
    price: "$10.30",
    image: "./img/Cocoa Dark Chocolate.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Dark Chocolate",
    price: "$16.30",
    image: "./img/Dark Chocolate.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Dark Fantacy",
    price: "$16.30",
    image: "./img/Dark Fantacy.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Dream Cream",
    price: "$30.30",
    image: "./img/Dream cream.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Dukesmasala Nibbles",
    price: "$20.30",
    image: "./img/Dukes Masala Nibbles.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Elite Dates Pudding Cake",
    price: "$39.30",
    image: "./img/elite dates pudding cake.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Elite Milkrusk",
    price: "$15.30",
    image: "./img/Elite Milk Rusk.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "50-50",
    price: "$10.30",
    image: "./img/fifty -50.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "5 Star",
    price: "$10.30",
    image: "./img/five star.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Cinthol",
    price: "$11.99",
    image: "./skincare/cinthol.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Dove",
    price: "$10.99",
    image: "./skincare/Dove.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Gokul Sandal",
    price: "$11.50",
    image: "./skincare/Gokul Sandal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Himalaya",
    price: "$20.00",
    image: "./skincare/Himalaya.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Mama Earth FaceWash",
    price: "$21.20",
    image: "./skincare/Mama Earth FaceWash.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Mysore Sandal Soap",
    price: "$10.80",
    image: "./skincare/mysore sandal aoap.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Pear",
    price: "$12.60",
    image: "./skincare/Pears.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Ponds Dream Flower Powder",
    price: "$20.75",
    image: "./skincare/ponds dream flower powder.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Yardely",
    price: "$21.30",
    image: "./skincare/Yardely.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Bulgarian Valley Rose Water Toner",
    price: "$50.30",
    image: "./skincare/Bulgarian Valley Rose Water Toner.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Derma SunScreen",
    price: "$100.30",
    image: "./skincare/Derma Sunscreen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Eye Cream",
    price: "$21.30",
    image: "./skincare/Eye Cream.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Facial oil",
    price: "$31.30",
    image: "./skincare/Facial Oil.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Fash Wash",
    price: "$30.30",
    image: "./skincare/Fash Wash.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "GokulRed Sandal",
    price: "$39.30",
    image: "./skincare/Gokul Red Sandal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "GokulRose and Sandal",
    price: "$31.30",
    image: "./skincare/Gokul Rose and Sandal.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Gokul Secret Garden",
    price: "$41.30",
    image: "./skincare/Gokul Secret Garden.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Rumba Shower Gel",
    price: "$19.30",
    image: "./skincare/Hawaiian Rumba Shower Gel.png",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Herbodaya Rose Water",
    price: "$60.08",
    image: "./skincare/Herbodaya Rose Water.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Himalaya Sunscreen",
    price: "$90.30",
    image: "./skincare/Himalaya Sunscreen.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Kashthuri Manjal",
    price: "$49.30",
    image: "./skincare/kashthuri manja.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Lip Balm",
    price: "$19.30",
    image: "./skincare/Lip balm.jpg",
    favoriteImage: "./img/heart.jpg",
  },
  {
    name: "Lovin Shower Gel",
    price: "$25.30",
    image: "./skincare/Lovin Shower Gel.png",
    favoriteImage: "./img/heart.jpg",
  },
];

// Function to render product cards dynamically
function renderProducts(products) {
  const productRow = document.getElementById("productRow");
  productRow.innerHTML = "";

  products.forEach((product) => {
    const productCard = `
      <div class="product-card">
        <img src="${product.favoriteImage}" class="favorite-icon" alt="Favorite" />
        <img src="${product.image}" class="product-image" alt="${product.name}" />
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
    productRow.innerHTML += productCard;
  });
}

// Function to filter products based on search input
function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  if (query === "") {
    productCards.forEach((card) => (card.style.display = "none"));
  } else {
    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (productName.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}

// Initially render all products when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderProducts(products);
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => (card.style.display = "none"));
});
function addToCarts(productName) {
  alert(`${productName} has been added to the cart!`);
}

// page serchbar
function filterProducts() {
  var searchQuery = document.querySelector(".search-input").value.toLowerCase();
  var products = document.querySelectorAll(".product-card");

  products.forEach(function (product) {
    var productName = product
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (productName.includes(searchQuery)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

window.onload = function () {
  if (!localStorage.getItem("tutorial-seen")) {
    // Show the tutorial modal
    var myModal = new bootstrap.Modal(
      document.getElementById("tutorial-modal"),
      {
        keyboard: false,
      }
    );
    myModal.show();
  }
};

// tutorial
document
  .getElementById("complete-tutorial")
  .addEventListener("click", function () {
    localStorage.setItem("tutorial-seen", "true");
    var myModal = bootstrap.Modal.getInstance(
      document.getElementById("tutorial-modal")
    );
    myModal.hide();
  });
