import { Member, Polynomial } from "./types/index.ts";
import Calculator from "./Calculator.ts";

class PolynomialCalculator {
    polynomial(members: Member[]): Polynomial {
        return new Polynomial(members);
    }

    nothing(members: Member[]): Member[] | undefined {
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
    }

    getValue(str: string): Polynomial | undefined {
        return this.getPolynomial(str);
    }

    getMember(str: string): Member | undefined {
        if (typeof str === 'number') {
            return new Member(str);
        }
        if (str && typeof str === 'string') {
            const arrStr: string[] = str.split('*x^');
            // а parseInt точно работает так как я думаю???!!....
            return new Member(parseInt(arrStr[0]), parseInt(arrStr[1]));
        }
    }

    getPolynomial(str: string): Polynomial | undefined {
        if (str instanceof Array) {
            return new Polynomial(str);
        }
        if (str && typeof str === 'string') {
            const members = [];
            const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+ ]/g);
            for (let i = 0; i < arrStr.length; i++) {
                members.push(this.getMember(arrStr[i]));
            }
            return new Polynomial(members);
        }
    }

    add(a: Member, b: Member): Member | undefined {
        let calc: Calculator;
        const members: Member[] = [];
        let poly: number[];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power))
            }
            else {
                members.push(new Member(elemA.value, elemA.power))
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        this.nothing(members);
        return new Polynomial(members);
    }

    sub(a: Member, b: Member): Member | undefined {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power == elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power == elemB.power)) {
                members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
            }
        });
        this.nothing(members);
        return new Polynomial(members);
    }

    mult(a: Member, b: Member): Member | undefined {
        const calc = new Calculator;
        let polynomial = new Polynomial;
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(calc.mult(elemA.value, elemB.value), calc.add(elemA.power, elemB.power)));
            });
            this.nothing(members);
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    prod(a: Member, p: number): Member | undefined {
        if (p === 0) {
            return this.zero();
        }
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            members.push(new Member(calc.prod(elemA.value, p), elemA.power));
        });
        this.nothing(members);
        return new Polynomial(members);
    }

    //0*x^0
    zero(): Polynomial {
        return new Polynomial([new Member]);
    }

    //1*x^0
    one(): Polynomial {
        return new Polynomial([new Member(1)]);
    }
}

export default PolynomialCalculator;