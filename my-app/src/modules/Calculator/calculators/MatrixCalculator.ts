import { Matrix } from "../types/index.ts";
import { RealCalculator } from "./index.ts";
import Calculator from "../Calculator.js";
import AnyType from "../types/AnyType.ts";
import ICalculator from "./ICalculator.ts";


class MatrixCalculator implements ICalculator<Matrix> {

    calc: ICalculator<AnyType>;
    values: number[][];

    constructor (calc: ICalculator<AnyType>) {
        this.calc = calc;
    }

    div(a: Matrix, b: Matrix): null {return null; }

    add(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map(
            (arr, i) => arr.map((elem, j) => this.calc.add(elem, b.values[i][j]))
            ));
    }

    sub(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map(
            (arr, i) => arr.map((elem, j) => this.calc.sub(elem, b.values[i][j]))
            ));
    }

    //данный метод под подозрением, надо проверить как он умножает 
    mult(a: Matrix, b: Matrix): Matrix {
        const length: number = a.values.length;
        const c = this.zero(length);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let S = this.calc.zero(length);
                for (let k = 0; k < length; k++) {
                    S = this.calc.add(
                        S, 
                        this.calc.mult(
                            a.values[i][k], 
                            b.values[k][j]
                        )
                    );
                }
                c.values[i][j] = S;
            }
        }
        return c;
    }

    pow(a: Matrix, n: number): Matrix {
        return new Matrix(a.values.map(
            arr => arr.map((elem: AnyType) => this.calc.pow(elem, n))
            ));
    }

    prod(a: Matrix, p: number): Matrix {
        return new Matrix(a.values.map(
            arr => arr.map((elem: AnyType) => this.calc.prod(elem, p))
            ));
    }

    zero(length): Matrix {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++){
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }

    one(length): Matrix {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++){
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one(length) : this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }
}

export default MatrixCalculator;