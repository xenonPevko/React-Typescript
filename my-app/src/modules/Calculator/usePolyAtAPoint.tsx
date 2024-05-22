import React from 'react';
import Calculator from './Calculator.ts';

export default function usePolyAtAPoint(
    refPoly: React.RefObject<HTMLTextAreaElement>,
    refX: React.RefObject<HTMLTextAreaElement>,
    refPolyAtAPoint: React.RefObject<HTMLTextAreaElement>,
): () => void {
    const universalCalc = new Calculator();

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