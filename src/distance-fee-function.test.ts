import * as p from "./parameters"
import { distanceFee } from "./delivery-fee-functions";

describe('Test distance fee function', () => {

    test('when distance is smaller than min distance segment', () => {
        const distance = p.firstDistanceSegment - 500.0; //500m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee); //2 eur
    })

    test('when distance is equal to the min distance segment', () => {
        const distance = p.firstDistanceSegment; //1000m
        const result = distanceFee(distance);
        expect(result).toEqual(p.minDistanceFee); //2eur
    })

    test('when distance is greater than min distance segment but less the first additional distance segment', () => {
        const distance = p.firstDistanceSegment + 499;  //1499m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment but equal to first additional distance segment', () => {
        const distance = p.firstDistanceSegment + 500;  //1500m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment and greater than second additional distance segment', () => {
        const distance = p.firstDistanceSegment + 501;  //1501m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + 2*p.extraDistanceFee); //to equal 4eur
    })

    test('when distance is greater than min distance segment and greater than third additional distance segment', () => {
        const distance = p.firstDistanceSegment + 1001;  //2001m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + 3*p.extraDistanceFee); //to equal 5eur
    })
})
