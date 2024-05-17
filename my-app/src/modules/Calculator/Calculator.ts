import { Complex, Vector, Matrix, Member, Polynomial } from './types/index.ts';
import { ComplexCalculator, MatrixCalculator, RealCalculator, VectorCalculator } from "./calculators/index.ts";
import PolynomialCalculator from "./PolynomialCalculator.ts";
import ICalculator from './calculators/ICalculator.ts';
import AnyType from './types/AnyType.ts';

export enum EOperand {
    add = 'add',
    sub = 'sub',
    mult = 'mult',
    div = 'div',
    prod = 'prod',
    pow = 'pow',
    one = 'one',
    zero = 'zero'
}

class Calculator implements ICalculator<AnyType> {

    complex(re?: number, im?: number): Complex { return new Complex(re, im); }
    vector(values?: AnyType[]): Vector { return new Vector(values); }
    matrix(values?: AnyType[][]): Matrix { return new Matrix(values); }

    getValue(str: string): AnyType {
        if (str.includes('*x^')) {return this.getPolynomial(str)};
        if (str.includes('\n')) { return this.getMatrix(str) };
        if (str.includes('(')) { return this.getVector(str) };
        if (str.includes('i')) { return this.getComplex(str) };
        return parseFloat(str);
    }

    getMatrix(str: string | AnyType[][]): Matrix {
        if (str instanceof Array) return new Matrix(str);
        if (str && typeof str === 'string') {
            const arr = str.replace(' ', '').split('\n');
            const values: AnyType[][] = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].split(',').map(el => this.getValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return new Matrix();
    }

    getVector(str: string | AnyType[]): Vector {
        if (str instanceof Array) return new Vector(str);
        if (str && typeof str === 'string') {
            const arr = str.replace(' ', '').replace('(', '').replace(')', '').split(';').map(el => this.getValue(el));
            return new Vector(arr);
        }
        return new Vector();
    }

    getComplex(str: string): Complex {
        if (typeof str === 'number') return new Complex(str);
        if (str && typeof str === 'string') {
            let arrStr: string[] = str.split('i*');
            if (arrStr.length === 2) {
                //2+i*5
                if (arrStr[0].includes('+')) {
                    arrStr[0] = arrStr[0].replace('+', '');
                    return new Complex(parseFloat(arrStr[0]), parseFloat(arrStr[1]));
                }
                //2-i*5
                if (arrStr[0].includes('-')) {
                    arrStr[0] = arrStr[0].replace('-', '');
                    return new Complex(parseFloat(arrStr[0]), - parseFloat(arrStr[1]));
                }
            }
            if (arrStr.length === 1) {
                if (isNaN(parseInt(arrStr[0]))) return new Complex();
                return new Complex(parseFloat(arrStr[0]));
            }
        }
        return new Complex();
    }

    getPolynomial(str: string | Member[]): Polynomial {
        if (str instanceof Array) {
            return new Polynomial(str)
        }
        if (typeof str == 'string' && str) {
            const members: Member[] = [];
            const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+ ]/g);
            for (let i = 0; i < arrStr.length; i++) {
                members.push(this.getMember(arrStr[i]));
            }
            return new Polynomial(members);
        }
        return new Polynomial();
    }

    getMember(str: string): Member {
        if (typeof str === 'number') {
            return new Member(str);
        }
        if (typeof str === 'string' && str) {
            const arrStr = str.split('*x^');
            return new Member(parseFloat(arrStr[0]), parseInt(arrStr[1]));
        }
        return new Member();
    }

    get(elem?: AnyType): ICalculator<AnyType> {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        if (elem instanceof Polynomial) {
            return new PolynomialCalculator();
        }
        return new RealCalculator();
    }

    [EOperand.add](a: AnyType, b: AnyType): AnyType {
        return this.get(a).add(a, b);
    }

    [EOperand.sub](a: AnyType, b: AnyType): AnyType {
        return this.get(a).sub(a, b);
    }

    [EOperand.mult](a: AnyType, b: AnyType): AnyType {
        return this.get(a).mult(a, b);
    }

    [EOperand.div](a: AnyType, b: AnyType): AnyType | null {
        return this.get(a).div(a, b);
    }

    [EOperand.pow](a: AnyType, n: number): AnyType {
        return this.get(a).pow(a, n);
    }

    [EOperand.prod](a: AnyType, p: number): AnyType {
        return this.get(a).prod(a, p);
    }

    [EOperand.one](a: AnyType): AnyType {
        console.log(this.get(a).one(a));
        return this.get(a).one(a);
    }

    [EOperand.zero](a: AnyType): AnyType {
        return this.get(a).zero(a);
    }
}

export default Calculator;