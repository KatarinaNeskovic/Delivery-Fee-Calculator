import React, { useState } from 'react';
import './App.css';
import { DeliveryRequest } from './delivery-fee-structure';
import { totalDeliveryFee } from './delivery-fee-functions'

export function DeliveryPriceCalculator() {

  // setting initial state for request object
  const [request, setRequest] = useState<DeliveryRequest>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    orderTime: '2024-01-01T07:00' //setting initial order time to Jan 1st 2024 at 7:00
  })

  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleChange = (e: any) => {
    const { name, value } = e.target; //deconstructing e.target object to access its name and value props
    setRequest({
      ...request,
      [name]: value
    })
  }



  const handleSubmit = (e: any) => {
    e.preventDefault();

    const fee = totalDeliveryFee(request)

    setDeliveryFee(fee);
  }




  return (

    <form onSubmit={handleSubmit} className='form' >

      <header>
        Delivery Fee Calculator
      </header>

      <label>
        Cart Value
        <input
          type="number"
          min={0}
          name="cartValue"
          value={request.cartValue}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Delivery Distance
        <input
          type="number"
          min={0}
          name="deliveryDistance"
          value={request.deliveryDistance}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Amount of Items
        <input
          type="number"
          min={0}
          name="amountOfItems"
          value={request.amountOfItems}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Order Time
        <input
          type="datetime-local"
          name='orderTime'
          value={request.orderTime}
          min='2024-01-01T07:00'  //setting the minimum date and time for whenever the app refreshes
          onChange={handleChange}
          required
        />
      </label>

      <button onClick={handleSubmit}> Calculate delivery price </button>
      <h4> Delivery price: {deliveryFee} EUR</h4>
    </form>
  )

}




/*   <header> { className="App-header" }
<img src={logo} className="App-logo" alt="logo" /> 
</header> */