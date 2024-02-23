import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import TheHeader from './components/Header/TheHeader'
import TheFooter from './components/Footer/TheFooter'
import TheForm from './components/Form/TheForm'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login'
import UserProfile from './components/UserProfile/UserProfile'
import { ProductsProvider } from './context/ProductsContext/ProductsState'
import { UsersProvider} from './context/UsersContext/UsersState'
import { OrdersProvider } from './context/OrdersContext/OrdersState'
import './App.css'

// import { GlobalProvider} from './context/GlobalState'


function App() {

  return (
    <>
      {/* <GlobalProvider> */}
      <UsersProvider> 
      <ProductsProvider>
        <OrdersProvider>
            <Router>
                <TheHeader />
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/register" element={<TheForm />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <TheFooter />
            </Router>
        </OrdersProvider>
    </ProductsProvider>
</UsersProvider> 
      {/* </GlobalProvider> */}
    </>
  )
}

export default App
