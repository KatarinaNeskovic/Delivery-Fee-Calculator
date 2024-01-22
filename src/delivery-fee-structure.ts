interface IDeliveryFee {
    cart: ICart;
    distance: IDistance;
    items: Items;
    time: ITime;
    maxDeliveryFee:number;
}

interface Items {
    itemsNo: number;
    extraItemsSurchrage: number; //If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
    bulkFee: number; //An extra "bulk" fee applies for more than 12 items of 1,20€
}

interface ICart {
    itemsPrice: number;
    smallOrderSurcharge: number; //If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. 

}

interface IDistance {
    deliveryDistance: number;
    minDistanceFee: number; //2 eur
    extraDistanceFee: number; // 1€ added for every additional 500 meters

}

interface ITime {
    orderTime: Date;
    rushhourFee: number; //During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x.
}