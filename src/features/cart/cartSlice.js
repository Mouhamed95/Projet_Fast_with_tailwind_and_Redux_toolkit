import { createSlice } from "@reduxjs/toolkit"

const initialState ={
//  cart:[]
cart:[{
    pizzaId:12,
    name:'Mediterranean',
    quantity:2,
    unitPrice:16,
    totalPrice:32
}]
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem(state,action){
            //payload = newItem
          state.cart.push(action.payload)  
        },
        deleteItem(state,action){
           //payload: pizzaId
         state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state,action){
          //payload = pizzaId
          const item = state.cart.find((item)=>item.pizzaId === action.payload)
          item.quantity++

          item.totalPrice = item.quantity * item.unitPrice  
        },
        decreasItemQuantity(state,action){
          //payload = pizzaId
          const item = state.cart.find((item)=>item.pizzaId === action.payload)
          item.quantity--

          item.totalPrice = item.quantity * item.unitPrice 
        },
        clearCart(state){
            state.cart = []
        }

    }
})
//createur d'action
export const {
     addItem,
     deleteItem,
     increaseItemQuantity,
     decreasItemQuantity,
     clearCart} = cartSlice.actions

export default cartSlice.reducer