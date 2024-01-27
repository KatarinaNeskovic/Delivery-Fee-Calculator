import React, { useState } from 'react';
import './App.css';
import { DeliveryRequest } from './delivery-fee-structure';
import { totalDeliveryFee } from './delivery-fee-functions'

export function DeliveryPriceCalculator() {

  // setting initial state of delivery fee object where proprs are input fields the user will fill on the form 
  const [request, setRequest] = useState<DeliveryRequest>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    orderTime: (new Date()).toString(), //setting initial order time to current time
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target; //deconstructing e.target object to access its name and value props
    setRequest({
      ...request,
      [name]: value
    })
  }



  const handleSubmit = (e: any) => {
    e.preventDefault();

    const deliveryPrice = totalDeliveryFee(request)
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
          name='dateTime'
          value={request.orderTime}
          min={(new Date ()).toString()}  //setting the minimum date and time for whenever the app refreshes
          onChange={handleChange}
          required
        />
      </label>

      <button onClick={handleSubmit}> Calculate delivery price </button>
      <h4> Delivery price: { } EUR</h4>
    </form>
  )

}


/*
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const [dateTime, setDateTime] = useState(new Date(2001, 0, 1)); //setting initial date to January 1st 2001
 
  const handleCartvalueChange = (e: any) => {
    setCartValue(e.target.value);
  }
 
  const handleDeliveryDistanceChange = (e: any) => {
    setDeliveryDistance(e.target.value);
  }
 
  const handleAmountOfItemsChange = (e: any) => {
    setAmountOfItems(e.target.value);
  }
 
  const handleDateTimeChange = (e: any) => {
    setDateTime(e.target.value);
  }
 */



/*   <header> { className="App-header" }
<img src={logo} className="App-logo" alt="logo" /> 
</header> */