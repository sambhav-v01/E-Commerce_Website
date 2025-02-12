// import { cart } from "./cart.js";
import { create_Product } from "./create_Product.js";
import { findProduct } from "./utils/findProduct.js";

const wishContainer=document.getElementById("WishList");
let wishArr=JSON.parse(localStorage.getItem("wishArr"))||[];
let cartArr=JSON.parse(localStorage.getItem("cartArr"))||[];

wishContainer.addEventListener(("click"),(event)=>{
    if(event.target.classList.contains("add-to-wishlist")){
    wishArr=wishArr.filter(({_id})=> _id!==event.target.dataset.id);
    wishContainer.innerHTML="";
    create_Product(wishArr,wishContainer,findProduct,"WishList")
    localStorage.setItem("wishArr",JSON.stringify(wishArr));
}
    if(event.target.classList.contains("add-to-cart")){
        const isInCart=findProduct(cartArr,event.target.dataset.id);
        if(!isInCart){
            const isProductInCart=wishArr.filter(({_id})=> _id===event.target.dataset.id);
            cartArr=[...cartArr,...isProductInCart];
            localStorage.setItem("cartArr",JSON.stringify(cartArr));
           wishArr=wishArr.filter(({_id})=> _id!==event.target.dataset.id);
           wishContainer.innerHTML="";
           create_Product(wishArr,wishContainer,findProduct,"WishList");
           localStorage.setItem("wishArr",JSON.stringify(wishArr));
        }
        else{
            alert("Already There");
        }
    }
}

)

create_Product(wishArr,wishContainer,findProduct,"WishList");