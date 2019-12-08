import React from "react";
import "./Shop.css";

class Shop extends React.Component {
  //Array to create Products
state={
  products: [
    {
      // image resource https://pixabay.com/images/search/book/
      img:"/images/shop-imgs/book.jpg",
      link:"https://www.amazon.ca/",
      name: "Book - 'The hidden life of trees'",
      Description: "This book explains how trees feel, and communicate ",
      review: "/images/shop-imgs/stars.jpg",
      price: "CDN $14.74",
      shipping:" & Free Shipping",
    },  
    {
        // image resource https://unsplash.com/s/photos/bonsai
        img:"/images/shop-imgs/bonsai.jpg",
        link:"https://www.amazon.ca/",
        name: "Bonsai Seeds",
        Description: "Pine tree bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $30.20",
        shipping:" & $5.00 Shipping",
      },  
      {
        // image resource https://pixabay.com/images/search/bonsai/
        img:"/images/shop-imgs/bonsai_1.jpg",
        link:"https://www.amazon.ca/",
        name: "Bonsai Seeds",
        Description: "Japanese bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $67.90",
        shipping:" & $9.90 Shipping",
      },  
      {
        // image resource https://unsplash.com/s/photos/bonsai
        img:"/images/shop-imgs/bonsai_2.jpg",
        link:"https://www.amazon.ca/",
        name: "Bonsai Seeds",
        Description: "flower bonsai",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $29.50",
        shipping:" & Free Shipping",
      },  
      {
        // image resource https://unsplash.com/s/photos/cherry-blossom
        img:"/images/shop-imgs/cherry.jpg",
        link:"https://www.amazon.ca/",
        name: "Artificial cherry blossom",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $42.70",
        shipping:" & $10.00 Shipping",
      },  
      {
        //image resource https://unsplash.com/s/photos/flowers
        img:"/images/shop-imgs/flowers.jpg",
        link:"https://www.amazon.ca/",
        name: "Artificial flowers",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $39.00",
        shipping:" & Free Shipping",
      },  
      {
        //image resource https://unsplash.com/s/photos/cactus
        img:"/images/shop-imgs/cactus_1.jpg",
        link:"https://www.amazon.ca/",
        name: "Artificial cactus with pot",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $22.90",
        shipping:" & $2.80 Shipping",
      },  
      {
        //image resource https://pixabay.com/images/search/mini%20cactus/
        img:"/images/shop-imgs/miniplant.jpg",
        link:"https://www.amazon.ca/",
        name: "Artificial mini cactus",
        Description: "House Decoration",
        review: "/images/shop-imgs/stars.jpg",
        price: "CDN $12.70",
        shipping:" & Free Shipping",
      },  
  ]
}
// Resource from: https://flaviocopes.com/react-how-to-loop/.
// Function to loop trough the array products and push the properties into
// a new array product including the html tags.
createProduct = () => {
  let product = []

  for (let i = 0; i < 8; i++) {

    let children=[]
    children.push(<a href={this.state.products[i].link}><img src={this.state.products[i].img} alt={this.state.products[i].img} className="img_product" /></a>)
  
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
                  {/*  Call to our funtion createProduct */}
           {this.createProduct()}                         
      </div>
        </div>
  );}
}

export default Shop;
