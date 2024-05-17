import { Complex } from "../types/index.ts";
import ICalculator from "./ICalculator.ts";
import RealCalculator from "./RealCalculator.ts";

class ComplexCalculator implements ICalculator<Complex>{
    add(a: Complex, b: Complex): Complex { return new Complex(a.re + b.re, a.im + b.im); }
    sub(a: Complex, b: Complex): Complex { return new Complex(a.re - b.re, a.im - b.im); }
    inv(a: Complex): Complex {
        let q = a.re * a.re + a.im * a.im;
        return new Complex(a.re / q, -a.im / q);
    }
    mult(a: Complex, b: Complex): Complex {
        return new Complex((a.re * b.re - a.im * b.im), (a.re * b.im + b.re * a.im));
    }
    div(a: Complex, b: Complex): Complex {
        const m = Math.pow(b.re, 2) + Math.pow(b.im, 2);
        return new Complex(
            (a.re * b.re + a.im * b.im) / m,
            (b.re * a.im - a.re * b.im) / m
        );
    }
    pow(a: Complex, n: number): Complex {
        let S = this.one();
        for (let i = 0; i < n; i++) {
            S = this.mult(S, a)
        }
        return S;
    }

    prod(a: Complex, p: number): Complex { return new Complex(a.re * p, a.im * p) }; //комплексное на скаляр (?)
    one(): Complex { return new Complex(1); }
    zero(): Complex { return new Complex; }
}

export default ComplexCalculator;