import React from "react";
import "./Shop.css";

class Shop extends React.Component {
state={
  products: [
    {
      img:"/images/shop-imgs/book.jpg",
      name: "Book - 'The hidden life of trees'",
      Description: "This book explains how trees feel, and communicate ",
      review: "/images/shop-imgs/stars.jpg",
      price: "CDN $14.74",
      shipping:" & Free Shipping",
    },  
    {
        img:"/images/shop-imgs/bonsai.jpg",
        name: "Bonsai Seeds",
        Description: "Pine tree bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $30.20",
        shipping:" & $5.00 Shipping",
      },  
      {
        img:"/images/shop-imgs/bonsai_1.jpg",
        name: "Bonsai Seeds",
        Description: "Japanese bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $67.90",
        shipping:" & $9.90 Shipping",
      },  
      {
        img:"/images/shop-imgs/bonsai_2.jpg",
        name: "Bonsai Seeds",
        Description: "flower bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $29.50",
        shipping:" & Free Shipping",
      },  
      {
        img:"/images/shop-imgs/cherry.jpg",
        name: "Artificial cherry blossom",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $42.70",
        shipping:" & $10.00 Shipping",
      },  
      {
        img:"/images/shop-imgs/flowers.jpg",
        name: "Artificial flowers",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $39.00",
        shipping:" & Free Shipping",
      },  
      {
        img:"/images/shop-imgs/cactus_1.jpg",
        name: "Artificial cactus with pot",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $22.90",
        shipping:" & $2.80 Shipping",
      },  
      {
        img:"/images/shop-imgs/miniplant.jpg",
        name: "Artificial mini cactus",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $12.70",
        shipping:" & Free Shipping",
      },  
  ]
}

createProduct = () => {
  let product = []

  for (let i = 0; i < 8; i++) {

    let children=[]
    children.push(<img src={this.state.products[i].img} alt={this.state.products[i].img} className="img_product" />)
  
    let name = []
    name.push(this.state.products[i].name)

    let description = []
    description.push(this.state.products[i].Description)

    let review=[]
    review.push(<img src={this.state.products[i].review} alt={this.state.products[i].review} className="img_review" />)

    let price =[]
    price.push(this.state.products[i].price)
    
    let shipping =[]
    shipping.push(this.state.products[i].shipping)
  
   product.push(<div className="product-holder"><div className="product-img-holder">{children}</div>
   <div className="product-txt-holder"> <h5>{name}</h5>
    <p>{description}</p>
    <div className="review-img-holder">{review}<p>20 reviews</p></div>
    <span class="price">{price}</span>
    <span class="shipping">{shipping}</span></div></div>)
  }
  return product
}



  render(){
  return (
    <div className="teamPage">
      <div className="shop-header">
        <h1>Shop</h1>
        <p>
          Discover our wide variety of products.
        </p>
      </div>
      <div className="shop-products">         
           {this.createProduct()}                         
      </div>
        </div>
  );}
}

export default Shop;
