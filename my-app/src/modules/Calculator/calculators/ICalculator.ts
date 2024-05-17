export default interface ICalculator<T> {
    add(a: T, b: T): T;
    sub(a: T, b: T): T;
    mult(a: T, b: T): T;
    div(a?: T, b?: T): T | null;
    prod(a: T, p: number): T;
    pow(a: T, n: number): T;
    one(a?: T | number): T;
    zero(a?: T | number): T;
}