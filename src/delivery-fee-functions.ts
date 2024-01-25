
//If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
import * as p from "./parameters";
import { IDeliveryFee } from "./delivery-fee-structure";


export function cartValueSurcharge(price: number): number {
    let surcharge: number;
    if (price < p.minCartValue) {
        surcharge = p.minCartValue - price;
    }
    else {
        surcharge = 0;
    }
    return surcharge;
}

/* if (price>minCartValue) return price 
else return minCartValue; */

/* A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€ */


export function distanceFee(distance: number): number {
    if (distance <= p.firstDistanceSegment) return p.minDistanceFee;
    else {
        let distanceFee = Math.ceil(distance / p.extraDistanceSegment);
        return distanceFee;
    }

}

/* If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
Example 1: If the number of items is 4, no extra surcharge
Example 2: If the number of items is 5, 50 cents surcharge is added
Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50 cents) + 1,20€) */

export function extraItemsFee(itemsNo: number): number {
    if (itemsNo <= p.maxSurchargeFreeItemsNo) {
        return 0;
    }
    else if (itemsNo <= p.minBulkItemsNo) {
        return (itemsNo - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge;
    }
    else return (itemsNo - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge + p.bulkItemsFee;

}

export function checkRushHour(): boolean {
    const dateTime = new Date();

    const hour = dateTime.getHours(); //gets hours in military time from 0(midnight) to 23
 /*    const minute = dateTime.getMinutes(); //gets mins in military time  */
    let adjustedHour;

    if (hour > 12) {
        adjustedHour = hour - 12.0; //if the militarry time number is between 13 and 23 it needs to be adjusted for PM
    }
    else {
        adjustedHour = hour; // numbers from 0 to 12 are matching the AM format.
    }

    if (adjustedHour >= p.startRushHour && adjustedHour <= p.endRushHour) {
        return true;
    }
    else return false;
}