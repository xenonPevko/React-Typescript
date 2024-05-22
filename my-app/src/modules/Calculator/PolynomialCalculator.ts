import { Member, Polynomial } from "./types/index.ts";
import ICalculator from "./calculators/ICalculator.ts";

class PolynomialCalculator implements ICalculator<Polynomial> {

    polynomial(members: Member[] = []): Polynomial {
        return new Polynomial(members);
    }

    removeZeros(members: Member[]): Member[] {
        for (let i: number = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return members;
    }

    add(a: Polynomial, b: Polynomial): Polynomial {
        const members: Member[] = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value + member.value, elemA.power))
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
        return new Polynomial(this.removeZeros(members));
    }

    sub(a: Polynomial, b: Polynomial): Polynomial {
        const members: Member[] = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power == elemA.power);
            if (member) {
                members.push(new Member(elemA.value - member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power == elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        return new Polynomial(this.removeZeros(members));
    }

    mult(a: Polynomial, b: Polynomial): Polynomial {
        let polynomial = new Polynomial;
        a.poly.forEach(elemA => {
            const members: Member[] = [];
            b.poly.forEach(elemB => {
                members.push(new Member(elemA.value * elemB.value, elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, new Polynomial(this.removeZeros(members)));
        });
        return polynomial;
    }

    div() {
        return null;
    }

    pow(a: Polynomial, n: number): Polynomial {
        let ans: Polynomial = a;
        for (let i = 1; i < n; i++) {
            ans = this.mult(ans, a);
        }
        return ans;
    }

    prod(a: Polynomial, p: number): Polynomial {
        if (p === 0) {
            return this.zero();
        }
        const members: Member[] = [];
        a.poly.forEach(elemA => {
            members.push(new Member(elemA.value * p, elemA.power));
        });
        return new Polynomial(this.removeZeros(members));
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