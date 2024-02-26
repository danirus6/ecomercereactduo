import './Cart.styles.scss'
import { useContext, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductsContext/ProductsState'
import { OrdersContext } from '../../context/OrdersContext/OrdersState'
import { Card, Col} from 'antd'

const Cart = () => {
    const { cart, clearCart } = useContext(ProductsContext)
    const { createOrder } = useContext(OrdersContext)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

const productsIdsToOrder = cart.map((cardItem) => cardItem)
    const createNewOrder = () => {
        createOrder(productsIdsToOrder)
        clearCart()
    }

    const cartItem = cart.map((cartItem) => (
        <Col span={16} key={cartItem.id}>
            <Card title={cartItem.ProductName} className= 'cart'>
                <span>{cartItem.price} €</span>
            </Card>
        </Col>
    ))
    return(
        <>
            <h1>Cart</h1>
            <section className='cart'>
                {cart && cart.length > 0 ? (cartItem) : (<span>Tu cesta está vacía</span>)}
            </section>
            <button onClick={() => clearCart()}>Clear cart</button>
            <button onClick={() => createNewOrder()}>Create Order</button>
        </>
    )
} 

export default Cart