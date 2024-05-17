import React, { useRef } from 'react';
//import Calculator from '../../modules/Calculator/Calculator.ts';
//import PolynomialCalculator from '../../modules/Calculator/PolynomialCalculator.ts';
import useCalculator from '../../modules/Calculator/useCalculator.tsx';
import { EOperand } from '../../modules/Calculator/Calculator.ts';

import './UniCalculator.css';
import usePolyAtAPoint from '../../modules/Calculator/usePolyAtAPoint.tsx';

const UniCalculator: React.FC = () => {

    const refA = useRef<HTMLTextAreaElement>(null);
    const refB = useRef<HTMLTextAreaElement>(null);
    const refC = useRef<HTMLTextAreaElement>(null);

    const refPoly = useRef<HTMLTextAreaElement>(null);
    const refX = useRef<HTMLTextAreaElement>(null);
    const refPolyAtAPoint = useRef<HTMLTextAreaElement>(null);

    const calc = useCalculator(refA, refB, refC);
    const polyAtAPointHandler = usePolyAtAPoint(refPoly, refX, refPolyAtAPoint);
    return (<>
        <div>
            <div className="beautyDiv">
                <p className="beautyP">калькулятор (универсальный!!!)</p>
            </div>
            <div className="beautyDiv">
                <textarea ref={refA} placeholder="введите нечто первое"></textarea>
                <div>
                    <button className="operand" onClick={() => calc(EOperand.add)}> + </button>
                    <button className="operand" onClick={() => calc(EOperand.sub)}> - </button>
                    <button className="operand" onClick={() => calc(EOperand.mult)}> * </button>
                    <button className="operand" onClick={() => calc(EOperand.div)}> / </button>
                    <button className="operand" onClick={() => calc(EOperand.pow)}> ^ </button>
                    <button className="operand" onClick={() => calc(EOperand.prod)}> prod </button>
                    <button className="operand" onClick={() => calc(EOperand.one)}> 1 </button>
                    <button className="operand" onClick={() => calc(EOperand.zero)}> 0 </button>
                </div>
                <textarea ref={refB} placeholder="введите нечто второе"></textarea>
                <div>
                    <p> = </p>
                    <textarea ref={refC} placeholder="результат (дай бог правильный)"></textarea>
                </div>
            </div>

            <div className="beautyDiv">
                <p className="beautyP">↓ посчитать значение полинома в точке ↓</p>
            </div>
            <div className="beautyDiv">
                <textarea ref={refPoly} placeholder="введите полином"></textarea>
                <textarea ref={refX} placeholder="введите икс"></textarea>
                <div>
                    <button onClick={() => polyAtAPointHandler()}> = </button>
                </div>
                <div>
                    <textarea ref={refPolyAtAPoint} placeholder="результат"></textarea>
                </div>
            </div>
        </div>
    </>)
}

export default UniCalculator;