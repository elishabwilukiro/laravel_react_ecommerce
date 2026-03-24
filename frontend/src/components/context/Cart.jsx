import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
     const [cartData, setCartData] = useState(
          JSON.parse(localStorage.getItem('cart')) || []
     );

     const addToCart = (product, size=null) => {
          let updatedCart = [ ...cartData ];

          // Cart is empty
          if(cartData.length == 0){
               updatedCart.push({
                    id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
                    product_id: product.id,
                    size: size,
                    title: product.title,
                    price: product.price,
                    qty: 1, 
                    image_url: product.image_url
               })
          }else{

               // Size not empty
               if(size != null){
                    const isProductExist = updatedCart.find(item => item.product_id == product.id && item.size == size)

                    // If both product & size exist, increase qty.
                    if(isProductExist){
                         updatedCart = updatedCart.map(item => 
                              (item.product_id == product.id && item.size == size)
                              ? {...item, qty: item.qty + 1}
                              : item)
                         
                    }else{
                         // If both product & size not exist, add new item
                         updatedCart.push({
                              id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
                              product_id: product.id,
                              size: size,
                              title: product.title,
                              price: product.price,
                              qty: 1, 
                              image_url: product.image_url
                         })
                    }
               }else{

                    // Size is null
                    const isProductExist = updatedCart.find(item => item.product_id == product.id)

                    // If product exist, increase qty.
                    if(isProductExist){
                         updatedCart = updatedCart.map(item => 
                              (item.product_id == product.id)
                              ? {...item, qty: item.qty + 1}
                              : item)
                         
                    }else{
                         // If product not exist, add new item
                         updatedCart.push({
                              id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
                              product_id: product.id,
                              size: size,
                              title: product.title,
                              price: product.price,
                              qty: 1, 
                              image_url: product.image_url
                         })
                    }


               }
          }

          setCartData(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart))
     }


     const shipping = () => {
          return 0;
     }

     const subTotal = () => {
          let subtotal = 0;
          cartData.map(item => {
               subtotal += (item.qty * item.price)
          })
          return subtotal;
     }

     const grandTotal = () => {
          return subTotal() + shipping();
     }

     const updatedCartItem = (itemId, newQty) => {
          let updatedCart = [...cartData];
          updatedCart = updatedCart.map(item => {
               (item.id == itemId) ? {...item, qty: newQty} : item
          })
          setCartData(updatedCart)
          localStorage.setItem('cart',JSON.stringify(updatedCart))
     }
     return(
          <CartContext.Provider value={{ addToCart, cartData, grandTotal, subTotal, shipping, updatedCartItem }}>
               {children}
          </CartContext.Provider>
     )
}