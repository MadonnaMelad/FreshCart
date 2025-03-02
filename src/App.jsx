import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Products from "./components/Products/Products"
import Cart from "./components/Cart/Cart"
import Brands from "./components/Brands/Brands"
import Categories from "./components/Categories/Categories"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Notfound from "./components/Notfound/Notfound"
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext' 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'


let query =new QueryClient()

let x = createBrowserRouter([
  {path:"",element:<Layout/>,
    children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:":otionalPath?productdetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"login",element:<Login/>},
      {path:"forgetpassword",element:<ForgetPassword/>},
      {path:"updatepassword",element:<UpdatePassword/>},
      {path:"register",element:<Register/>},
      {path:"checkout",element:<Checkout/>},
      {path:"allorders",element:<Allorders/>},
      {path:"*",element:<Notfound/>}
    ]
  }
])

function App() {
  return<>

<UserContextProvider> 
  <CounterContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishlistContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster/>
        </WishlistContextProvider>
      </CartContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>   
  </CounterContextProvider>
</UserContextProvider> 

  </>
}

export default App
