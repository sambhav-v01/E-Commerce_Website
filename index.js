import { products } from "./db/products.js";
import { create_Product } from "./create_Product.js";
import { findProduct } from "./utils/findProduct.js";
 

const productContainer=document.getElementById("products");
let cartArr=JSON.parse(localStorage.getItem("cartArr")) || [];
let wishArr=JSON.parse(localStorage.getItem("wishArr"))|| [];
const filterContainer = document.querySelector(".side-bar");


productContainer.addEventListener("click", (event) => {
  const target = event.target;
  const productId = target.dataset.id; // Product ID

  // **Handle Add to Cart**
  if (target.classList.contains("add-to-cart")) {
      const isProductInCart = findProduct(cartArr, productId);
      if (!isProductInCart) {
          const productAddToCart = products.filter(({ _id }) => _id === productId);
             cartArr=[...cartArr,...productAddToCart];
              localStorage.setItem("cartArr", JSON.stringify(cartArr));
              target.innerHTML = "Go To Cart <span class='material-icons-outlined'>shopping_cart</span>";
          
      }
       else {
          location.href = "cart.html"; // Redirect to cart if already added
      }
  }

  // **Handle Add to Wishlist**
  if (target.classList.contains("add-to-wishlist")) {
      const isProductInWishList = findProduct(wishArr, productId);
      if (!isProductInWishList) {
          const productAddToWishList = products.filter(({ _id }) => _id === productId);
        wishArr=[...wishArr,...productAddToWishList];
              localStorage.setItem("wishArr", JSON.stringify(wishArr));
              target.innerHTML = "<span class='material-icons'>favorite</span>";  
      }
      else{
       location.href="wish_list.html"
      }
  }
});
filterContainer.addEventListener("click", (event) => {
    const target = event.target;
    const selectedRating = document.querySelector("input[name='rating']:checked");
    const selectedDiscount = document.querySelector("input[name='discount']:checked");

    // Get selected rating and discount values
    const ratingValue = selectedRating ? Number(selectedRating.dataset.rating) : 0;
    const discountValue = selectedDiscount ? Number(selectedDiscount.dataset.discount) : 0;

    // Filter products based on rating and discount
    const updatedProducts = products.filter(({ rating, discount }) => {
        return rating >= ratingValue && discount >= discountValue;
    });

    // Clear existing products and render filtered products
    productContainer.innerHTML = "";
    create_Product(updatedProducts, productContainer, findProduct, "products");
});

create_Product(products,productContainer,findProduct,"products");