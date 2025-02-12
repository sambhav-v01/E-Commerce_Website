// import { create_Product } from "./create_Product.js";
import { createHorizontalProductCard } from "./createHorizontalProductCard.js";
import { findProduct } from "./utils/findProduct.js";
 let cartContainer=document.getElementById("cart");
let cartArr=JSON.parse(localStorage.getItem("cartArr"))||[];
let wishArr=JSON.parse(localStorage.getItem("wishArr"))||[];
console.log(cartArr);

cartContainer.addEventListener(("click"),(event)=>{
    if(event.target.classList.contains("add-to-cart")){
    cartArr=cartArr.filter(({_id})=> _id!==event.target.dataset.id);
    cartContainer.innerHTML="";
    createHorizontalProductCard(cartArr,cartContainer)
    localStorage.setItem("cartArr",JSON.stringify(cartArr));
}
   if(event.target.classList.contains("add-to-wishlist")){
    const isInWishList=findProduct(wishArr,event.target.dataset.id);
    if(!isInWishList){
        const productInwish=cartArr.filter(({_id})=> _id===event.target.dataset.id);
    wishArr=[...wishArr,...productInwish];
    localStorage.setItem("wishArr",JSON.stringify(wishArr));
    cartArr=cartArr.filter(({_id})=> _id!==event.target.dataset.id);
    cartContainer.innerHTML="";
    createHorizontalProductCard(cartArr,cartContainer)
    localStorage.setItem("cartArr",JSON.stringify(cartArr));
}
else{
    alert("Already There");
}
}
}
)

const cartLength = document.querySelector(".item-count");
cartLength.innerText = JSON.parse(localStorage.getItem("cartArr")).length;

const productPrice = document.querySelector(".product-price");
const priceAfterDiscount = JSON.parse(localStorage.getItem("cartArr")).reduce(
  (acc, cur) => acc + cur.newPrice,
  0
);
productPrice.innerText = priceAfterDiscount;

const discount = document.querySelectorAll(".discounted-amount");

const priceBeforeDiscount = JSON.parse(localStorage.getItem("cartArr")).reduce(
  (acc, cur) => acc + cur.oldPrice,
  0
);

const discountedAmount = priceBeforeDiscount - priceAfterDiscount;
for (let element of discount) {
  element.innerText = discountedAmount;
}

const totalAmount = document.querySelector(".total-amount");
totalAmount.innerText = priceAfterDiscount - discountedAmount + 100;

createHorizontalProductCard(cartArr,cartContainer)
// create_Product(cartArr,cartContainer,findProduct,"cart");