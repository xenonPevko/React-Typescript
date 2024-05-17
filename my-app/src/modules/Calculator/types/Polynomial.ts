import Calculator from "../Calculator.ts";
import AnyType from "./AnyType.ts";
import { Member } from "./index.ts";

class Polynomial {

    poly: Member[];

    constructor(poly: Member[] = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x: AnyType): AnyType {
        const calc = new Calculator;
        return this.poly.reduce((S, elem) =>
            calc.add(
                S,
                calc.prod(
                    calc.pow(x, elem.power),
                    elem.value)
            ),
            calc.zero(x)
        );
    }

    toString(): string {
        return this.poly.map(
            (el, i) => (el.value > 0) ?
                `${(i === 0) ? '' : ' + '}${el.toString()}` :
                el.toString()
        ).join('');
    }
}

export default Polynomial;