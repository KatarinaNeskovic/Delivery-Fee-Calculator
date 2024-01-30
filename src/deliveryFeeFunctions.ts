
import { DeliveryRequest } from "./deliveryFeeStructure";
import * as p from "./deliveryFeeParameters";


/** 
 * Calculates small order surcharge as difference between cart value and predefined minimum amount,
   if cart value is less than that amount.
 * @param price   total value of items in the cart
 * @returns surcharge amount
 */
export function smallOrderSurcharge(price: number): number {
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
 * Calculates fee based on the distance between store and customer's requested delivery location.
 * @param distance delivery distance 
 * @returns distance fee 
 * @remark distance fee for first 1000m is 2€, every additional segment of up to 500m is charged 1€ extra per segment
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
 * @param orderTime requested delivery time and date
 * @returns true or false 
 * @remark assumed that if requested delivery time is exactly for 7:00 PM (endRushHour), it still falls into the rush hour. 
 */
export function checkRushHour(orderTime: string): boolean {
    const orderTimeObject = new Date(orderTime); //creates date object from string
    const hour = orderTimeObject.getHours();
    const minute = orderTimeObject.getMinutes();
    const day = orderTimeObject.getDay();

    if (day === p.rushDay && hour >= p.startRushHour &&
        (hour < p.endRushHour || (hour === p.endRushHour && minute === 0))
    ) {
        return true;
    }
    else return false;
}


/**
 * Caluculates total delivery fee with all possible surcharges,
   taking into account potential rush hours.
 * @param request 
 * @returns total delivery fee 
 */
export function totalDeliveryFee(request: DeliveryRequest): number {

    if (request.cartValue >= 200) return 0;

    let deliveryFee = smallOrderSurcharge(request.cartValue) + distanceFee(request.deliveryDistance) + extraItemsFee(request.amountOfItems);

    if (checkRushHour(request.orderTime)) {
        deliveryFee = deliveryFee * 1.2;
    }

    if (deliveryFee > p.maxDeliveryFee) {
        return p.maxDeliveryFee;
    }
    else {
        return deliveryFee;
    }
}
