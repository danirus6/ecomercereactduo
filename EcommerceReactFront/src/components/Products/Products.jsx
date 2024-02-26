import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsState";
import { Card, Col } from 'antd'
import '../Products/Products.styles.scss'

const Products = () => {
    const { getProducts, products, addCart } = useContext(ProductsContext);
    useEffect(() => {
        getProducts();
    }, []);

    return(
        <>
        <h1>Products</h1>
            <section className="products">
                {products.map((product) => (
                    <Col span={16} key={product.id}>
                        <Card title={product.productName} bordered={false}>
                            <p>price: {product.price}€</p>
                            <button onClick={() => addCart(product)}>addCart</button>
                        </Card>
                    </Col>
                ))}
            </section>
        </>
    )

};

export default Products;