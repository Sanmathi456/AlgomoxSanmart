// let favoriteStatus = [false, false, false];
// function toggleFavorite(productId) {
//   favoriteStatus[productId] = !favoriteStatus[productId];
//   const favoriteIcon = document.querySelectorAll(".favorite-icon")[productId];
//   if (favoriteStatus[productId]) {
//     favoriteIcon.src = "./img/heart-filled.jpg";
//   } else {
//     favoriteIcon.src = "./img/heart.jpg";
//   }
// }

// const urlParams = new URLSearchParams(window.location.search);
// const productName = urlParams.get("product");
// if (productName) {
//   document.getElementById("product-name").innerText =
//     productName.charAt(0).toUpperCase() + productName.slice(1);
//   document.getElementById("product-image").src = `./img/${productName}.jpg`;
//   document.getElementById("product-price").innerText = `$${
//     Math.floor(Math.random() * 50) + 20
//   }.99`; // Randomize price for now
//   document.getElementById(
//     "product-description"
//   ).innerText = `Delicious and fresh ${productName}s to boost your health!`;
// }

// // WhatsApp share button functionality
// document.getElementById("whatsapp-btn").addEventListener("click", function () {
//   const productName = document.getElementById("product-name").innerText;
//   const productPrice = document.getElementById("product-price").innerText;
//   const productUrl = window.location.href;
//   const whatsappUrl = `https://wa.me/?text=Check%20out%20this%20product:%20${productName}%20at%20${productPrice}%20${productUrl}`;
//   window.open(whatsappUrl, "_blank");
// });

// // Review submission
// document.getElementById("submit-review").addEventListener("click", function () {
//   const name = document.getElementById("review-name").value;
//   const comment = document.getElementById("review-comment").value;
//   if (name && comment) {
//     const reviewList = document.getElementById("reviews-list");
//     const newReview = document.createElement("div");
//     newReview.classList.add("review");
//     newReview.innerHTML = `<h4>${name}</h4><p>${comment}</p>`;
//     reviewList.appendChild(newReview);
//   }
// });
