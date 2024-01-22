
export function totalCartValue(price: number): number {
    let surcharge: number;
    if (price < 10) {
        surcharge = 10 - price;
    }
    else {
        surcharge = 0;
    }
    return price + surcharge;
}


