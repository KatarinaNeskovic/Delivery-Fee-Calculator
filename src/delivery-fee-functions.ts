
import * as p from "./parameters";
import { IDeliveryFee } from "./delivery-fee-structure";

/** 
 * Calculates potential surcharge as difference between cart value and set minimum amount, if cart value is less than the set minimum.
 * @param price   total value of items in the cart
 * @returns surcharge 
 */
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



/**
 * Calculates fee based on the distance between store and customer's requested location.
 * @param distance delivery distance 
 * @returns distance fee
 * @remark delivery fee for first 1000m is 2€, every additional segment of 500m (or less)is charged 1€ extra per segment
 */
export function distanceFee(distance: number): number {
    if (distance <= p.firstDistanceSegment) return p.minDistanceFee;
    else {
        let distanceFee = Math.ceil(distance / p.extraDistanceSegment);
        return distanceFee;
    }

}


/**
 * Calculates possible surcharge depending on the number of items in customer's shopping cart. 
 * @param itemsNo number of items in the cart
 * @returns surcharge amount 
 * @remark for 5 or more items, an extra 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€.
 */
export function extraItemsFee(itemsNo: number): number {
    if (itemsNo <= p.maxSurchargeFreeItemsNo) {
        return 0;
    }
    else if (itemsNo <= p.minBulkItemsNo) {
        return (itemsNo - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge;
    }
    else return (itemsNo - p.maxSurchargeFreeItemsNo) * p.extraItemsSurcharge + p.bulkItemsFee;

}
/**
 * Checks if the delivery time and date the customer requested falls within rush hours.
 * @param requestedTime requested delivery time and date
 * @returns true or false 
 * @remark assumed that if requested delivery time is exactly 7:00PM (endRushHour), it still falls into the rush hour. 
 */
export function checkRushHour(requestedTime: Date): boolean {

    const hour = requestedTime.getHours(); //gets hours in military time from 0(midnight) to 23
    const minute = requestedTime.getMinutes(); //gets mins in military time  */
    const day = requestedTime.getDay();

    // 
    if (day === p.rushDay && hour >= p.startRushHour &&
        (hour < p.endRushHour || (hour === p.endRushHour && minute === 0))

    ) {
        return true;
    }
    else return false;
}
