import {ComplexCalculator, RealCalculator, MatrixCalculator, VectorCalculator} from './index.ts';
import PolynomialCalculator from '../PolynomialCalculator.js';

type AnyCalculator = ComplexCalculator | RealCalculator | MatrixCalculator | VectorCalculator | PolynomialCalculator;

export default AnyCalculator;