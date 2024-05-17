import React from 'react';
import Calculator from './Calculator.ts';
import PolynomialCalculator from './PolynomialCalculator.ts';

export default function usePolyAtAPoint(
    refPoly: React.RefObject<HTMLTextAreaElement>,
    refX: React.RefObject<HTMLTextAreaElement>,
    refPolyAtAPoint: React.RefObject<HTMLTextAreaElement>,
): () => void {
    const universalCalc = new Calculator();
    const calc = new PolynomialCalculator();
    return () => {
        if (refPoly && refX && refPolyAtAPoint) {
            const poly = universalCalc.getPolynomial(refPoly.current?.value || '');
            const x = universalCalc.getValue(refX.current?.value || '');
            const polyAtAPoint = poly.getValue(x);
            if (refPolyAtAPoint.current) {
                refPolyAtAPoint.current.value = polyAtAPoint.toString();
            }
        } 
    }
}