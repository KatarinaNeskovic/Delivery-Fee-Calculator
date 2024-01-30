# Delivery Fee Calculator

The Delivery Fee Calculator is a React and TypeScript application that calculates the delivery fee for an order. The calculator takes into account the cart value, delivery distance, number of items, and local date and time of the order to determine the final delivery price.

## Rules for Calculating Delivery Fee

1. **Small Order Surcharge:**
   - If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€.

2. **Delivery Distance Fee:**
   - A base fee of 2€ is charged for the first 1000 meters (=1km).
   - For distances longer than 1000 meters, an additional 1€ is added for every additional 500 meters.

3. **Item Surcharge:**
   - If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
   - A bulk fee of 1.20€ is applied for more than 12 items.

4. **Fee Limitations:**
   - The delivery fee can never exceed 15€, including surcharges.
   - The delivery is free (0€) when the cart value is equal to or more than 200€.

5. **Friday Rush:**
   - During the Friday rush (3 - 7 PM), the delivery fee (including surcharges) will be multiplied by 1.2x. However, the fee cannot exceed the maximum limit of 15€.

## Getting started

1. **Navigate to the Project Directory:**
   - Open a terminal or command prompt and navigate to the directory where you saved the project files.

     cd delivery-fee-calculator

2. **Install Dependencies:**
   - Run the following command to install the required dependencies:
   
     npm install


3. **Run the Application:**
   - Start the application with the following command:

     npm start
    

4. **Open Your Browser:**
   - Once the app is running, open your web browser and navigate to `http://localhost:3000`.

5. **Run tests:**
   - To perform tests run the following command. 
   
     npm run test


You should be all set!

