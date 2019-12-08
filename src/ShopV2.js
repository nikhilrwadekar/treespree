import { Card, Button, Badge, Jumbotron, Container } from "react-bootstrap";
import React from "react";
import "./ShopV2.css";

class ShopV2 extends React.Component {
  state = {
    products: [
      {
        name: "Half Sleeve Tee",
        description:
          "This cool looking tee is made of out 100% eco-friendly cloth.",
        subtitle: "for Men",
        price: 22,
        ratings: 4.5,
        imageName: "mens_tshirt.PNG",
        isNew: false
      },
      {
        name: "White Tee",
        description: "This cool looking tee comes with a large TreeSpree logo.",
        subtitle: "for Women",
        price: 22,
        ratings: 4.5,
        imageName: "womens_tshirt.PNG",
        isNew: false
      },
      {
        name: "Brown Hoodie",
        description: "This brown hoodie emcompasses the TreeSpree vibe.",
        subtitle: "for Women",
        price: 22,
        ratings: 4.5,
        imageName: "womens_hoodie_brown.PNG",
        isNew: true
      }
    ]
  };

  render() {
    return (
      <div className="ShopV2">
        <Jumbotron fluid>
          <Container>
            <h1>The TreeSpree Eco-Friendly Store</h1>
            <p>
              All our merch is made with special care and eco-friendly material!
            </p>
            <p>
              Profits and proceeds go towards maintaining the website and
              planting trees.
            </p>
          </Container>
        </Jumbotron>
        <Container className="shopProducts">
          {this.state.products.map(product => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{
                  width: "18rem",
                  height: "20rem",
                  objectFit: "cover",
                  objectPosition: "top"
                }}
                variant="top"
                src={`../images/shop-v2-imgs/${product.imageName}`}
              />
              <Card.Body>
                <Card.Title>
                  {product.name}{" "}
                  {product.isNew && <Badge variant="secondary">New</Badge>}
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {product.subtitle}
                </Card.Subtitle>

                <Card.Text>{product.description}</Card.Text>

                <Button variant="outline-primary">Buy Now</Button>
                <div style={{ paddingBottom: "1rem" }}></div>
                <Card.Link href="#">Add To Cart</Card.Link>
              </Card.Body>
            </Card>
          ))}
          ;
        </Container>
      </div>
    );
  }
}

export default ShopV2;
