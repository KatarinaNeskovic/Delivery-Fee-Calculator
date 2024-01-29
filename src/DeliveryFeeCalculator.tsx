import React, { useState } from 'react';
import './App.css';
import './deliveryFeeCalculator.css';
import { DeliveryRequest } from './delivery-fee-structure';
import { totalDeliveryFee } from './delivery-fee-functions'

export function DeliveryFeeCalculator(props: DeliveryRequest) {

  // setting initial state for request object 
  const [request, setRequest] = useState<DeliveryRequest>({
    cartValue: props.cartValue,
    deliveryDistance: props.deliveryDistance,
    amountOfItems: props.amountOfItems,
    orderTime: props.orderTime
  })

  const [deliveryFee, setDeliveryFee] = useState(0);

  const deliveryFeeRounded = deliveryFee.toFixed(2);

  const [showHeading, setShowHeading] = useState(true);

  const handleChange = (e: any) => {
    const { name, value } = e.target; //deconstructing object to access its name and value props

    setRequest((prevRequest) => {
      const updatedRequest = {
        ...prevRequest,
        [name]: value
      }
      return updatedRequest;
    }
    )
  
  }



  const calculateFee = (e: any) => {
    e.preventDefault();
    //ensuring that user requests are greater than zero 
    if (request.amountOfItems <= 0 || request.cartValue <= 0 || request.deliveryDistance <= 0) {
      alert('Values must be greater than zero!')
    }
    else {
      const fee = totalDeliveryFee(request)
      setDeliveryFee(fee);
    }
  }

  return (

    <body>

      <div className='container'>
        <header>
          Delivery Fee Calculator
        </header>

        <form>

          <p>
            <label htmlFor='cartValue' >
              Cart Value
            </label>
            <input
              data-test-id="cartValue"
              type="number"
              min={0}
              name="cartValue"
              value={request.cartValue}
              onChange={handleChange}
              required
            />
            €
          </p>

          <p>
            <label htmlFor='deliveryDistance'>
              Delivery Distance
            </label>
            <input
              data-test-id="deliveryDistance"
              type="number"
              min={0}
              name="deliveryDistance"
              value={request.deliveryDistance}
              onChange={handleChange}
              required
            />
            m
          </p>

          <p>
            <label htmlFor='amountOfItems'>
              Amount of
              Items
            </label>
            <input
              data-test-id="amountOfItems"
              type="number"
              min={0}
              name="amountOfItems"
              value={request.amountOfItems}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor='orderTime'>
              Order Time
            </label>
            <input
              data-test-id="orderTime"
              type="datetime-local"
              name='orderTime'
              value={request.orderTime}
              min='2024-01-01T07:00'  //setting the minimum date and time 
              onChange={handleChange}
              required
            />
          </p>

          <button onClick={calculateFee} className='btn'> Calculate delivery price </button>

            <h4 data-test-id="fee"> Delivery price: {deliveryFeeRounded} € </h4>
        </form>

      </div>
    </body>

  )

}
