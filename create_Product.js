export const create_Product=(products,parentElemnet,findProduct,pageType)=>{
for(let product of products){
    const cardContainer=document.createElement("div");
    cardContainer.classList.add("card", "card-vertical", "d-flex", "direction-column", "relative", "shadow","hover1");

//image container
const imageContainer=document.createElement("div");
imageContainer.classList.add("card-image-container");

const image=document.createElement("img");
image.classList.add("card-image");
image.setAttribute("src",product.img);
image.setAttribute("alt",product.name);
imageContainer.appendChild(image);


//wishListButton
const buttonimg=document.createElement("button");
buttonimg.classList.add("badge-close", "cursor", "absolute","add-to-wishlist");
imageContainer.appendChild(buttonimg);

const imgheart=document.createElement("span");
imgheart.classList.add("material-icons-outlined","add-to-wishlist")
imgheart.setAttribute("data-id",product._id);  

const isProductInWishlist = findProduct(
  JSON.parse(localStorage.getItem("wishArr")),
  product._id
);
imgheart.innerText =pageType==="WishList"?"close": isProductInWishlist ? "favorite" : "favorite_border";
buttonimg.appendChild(imgheart);


//card detail container
  const cardDetail=document.createElement("div");
  cardDetail.classList.add("card-details");

  //brand_Container
  const brandContainer=document.createElement("div");
    brandContainer.classList.add("card-title");
    brandContainer.innerText=product.brand;
  cardDetail.appendChild(brandContainer);

  //cardDescription 
  const descriptionContainer=document.createElement("div");
  descriptionContainer.classList.add("card-description");

  //product name
  const name=document.createElement("p");
  name.classList.add("card-des");
  name.innerText=product.name;
  descriptionContainer.appendChild(name);

  //price details
  const price=document.createElement("p");
  price.classList.add("card-price","d-flex","align-end","gap-sm");
  price.innerText=`Rs.${product.newPrice}`;

  const oldPrice=document.createElement("span");
  oldPrice.classList.add("price-strike-through");
  oldPrice.innerText=` Rs.${product.oldPrice}`;
  price.appendChild(oldPrice);


  //discount
  const discount=document.createElement("span");
  discount.classList.add("discount");
  discount.innerText=` (${product.discount})% OFF`;
  price.appendChild(discount);

  descriptionContainer.appendChild(price);

  //Rating Container\
  const ratings=document.createElement("p");
  ratings.classList.add("d-flex","align-center");

  const rating =document.createElement("span");
  rating.innerText=product.rating;
  ratings.appendChild(rating);

  const star =document.createElement("span");
  star.classList.add("material-icons-outlined","star")
  star.innerText="star";
  ratings.appendChild(star);

  descriptionContainer.appendChild(ratings);
  cardDetail.appendChild(descriptionContainer)

  //card button container
  const ctaButton=document.createElement("div");
  ctaButton.classList.add("cta-btn");

   const cartButton=document.createElement("button");
   cartButton.classList.add("button", "btn-primary", "btn-icon", "cart-btn", "d-flex", "align-center", "justify-center", "gap", "cursor", "btn-margin","add-to-cart");
   cartButton.setAttribute("data-id",product._id)

   const cart=document.createElement("span");
   cart.classList.add("material-icons-outlined");
   cart.innerText="shopping_cart";
   cartButton.appendChild(cart);

   const buttonText=document.createElement("span");
   const isProductInCart = findProduct(
    JSON.parse(localStorage.getItem("cartArr")),
    product._id
  );
      buttonText.innerText =
    pageType ===  "cart"
      ? "Remove"
      : pageType === "products" && isProductInCart 
      ?  "Go To Cart"
      : "Add To Cart"
   
cartButton.appendChild(buttonText);
  
   ctaButton.appendChild(cartButton);
   cardDetail.appendChild(ctaButton);
 
 cardContainer.appendChild(imageContainer);
 cardContainer.appendChild(cardDetail);



parentElemnet.appendChild(cardContainer)

} 
}