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

    test('when distance is greater than min distance segment but less the 1st extra distance segment', () => {
        const distance = p.firstDistanceSegment + 499.0;  //1499m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment but equal to 1st extra distance segment', () => {
        const distance = p.firstDistanceSegment + 500.0;  //1500m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + p.extraDistanceFee); //to equal 3eur
    })

    test('when distance is greater than min distance segment and greater than 2nd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 501.0;  //1501m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + 2*p.extraDistanceFee); //to equal 4eur
    })

    test('when distance is greater than min distance segment and greater than 3rd extra distance segment', () => {
        const distance = p.firstDistanceSegment + 1001.0;  //2001m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + 3*p.extraDistanceFee); //to equal 5eur
    })

    test('when distance is greater than min distance segment and greater than 6th extra distance segment', () => {
        const distance = p.firstDistanceSegment + 3005.0;  //4005m
        const result = distanceFee(distance); 
        expect(result).toEqual(p.minDistanceFee + 7*p.extraDistanceFee); //to equal 9eur
    })
})
