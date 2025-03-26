import { Link } from "react-router-dom";
import { Carousel, Image, Row, Col, ListGroup } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Custom styles for carousel arrows
  const arrowStyle = {
    filter: "invert(1)", // Makes the arrows black instead of white
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adds a semi-transparent background
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-white mb-4"
      prevIcon={
        <span className="carousel-control-prev-icon" style={arrowStyle} />
      }
      nextIcon={
        <span className="carousel-control-next-icon" style={arrowStyle} />
      }
    >
      {products.map((product) => (
        <Carousel.Item key={product._id} style={{ padding: "20px" }}>
          <Link to={`/product/${product._id}`} className="text-decoration-none">
            <Row>
              <Col>
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxHeight: "280px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>${product.price}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item className="product-description">
                    {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
