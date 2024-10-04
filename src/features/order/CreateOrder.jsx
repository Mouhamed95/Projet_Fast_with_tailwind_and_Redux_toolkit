// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state)=>state.user.username)
  const navigation = useNavigation()
  
  const isSubmitting = navigation.state === "submitting"

  const formErrors = useActionData()
  console.log(formErrors)


  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8 text-center">Ready to order? Lets go!</h2>
         

      <Form method="POST">
        <div className="mb-5 sm:flex-row sm:items-center flex gap-2 flex-col">
          <label className="sm:basis-40">First Name</label>
          <input className="input" type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="mb-5 sm:flex-row sm:items-center flex gap-2 flex-col" >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
           {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md"> {formErrors.phone}</p> }
           </div>
        </div>

        <div className="mb-5 sm:flex-row sm:items-center flex gap-2 flex-col">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required
            className="input"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
           className="h-6 w-6
            accent-yellow-400
            focus:ring
            focus:outline-none
            focus:ring-yellow-400
            focus:ring-offset-2
            "
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary"> {isSubmitting ? "Placing Order" : "Order now"} </Button>
        </div> 
      </Form>
    </div>
  );
}


export async function action({request}){
  const form = await request.formData()
  const data = Object.fromEntries(form)
  console.log(data)

  const order = {
    ...data,
    cart:JSON.parse(data.cart),
    priority: data.priority === "on"
  }

  const errors = {}
  if(!isValidPhone(order.phone)) 
    errors.phone = "Please completer votre numero pour qu'on puisse vous contacter"

  if(Object.keys(errors).length >0) return errors
  
  //si tous va bien creer un nouveau ordre et rediriger!!
//  const newOrder = await createOrder(order)
 


//   return redirect(`/order/${newOrder.id}`)
return null
}


export default CreateOrder;
