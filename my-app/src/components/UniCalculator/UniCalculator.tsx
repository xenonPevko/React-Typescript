import React, { useRef } from 'react';
import useCalculator from '../../modules/Calculator/useCalculator.tsx';
import { EOperand } from '../../modules/Calculator/Calculator.ts';

import './UniCalculator.scss';
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
            <div className="uniCalc_beautyDiv">
                <p className="uniCalc_beautyP">калькулятор (универсальный!!!)</p>
            </div>
            <div className="uniCalc_beautyDiv">
                <textarea className="uniCalc_beautyTextarea" ref={refA} placeholder="введите нечто первое"></textarea>
                <div>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.add)}> + </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.sub)}> - </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.mult)}> * </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.div)}> / </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.pow)}> ^ </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.prod)}> prod </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.one)}> 1 </button>
                    <button className="uniCalc_beautyButton" onClick={() => calc(EOperand.zero)}> 0 </button>
                </div>
                <textarea className="uniCalc_beautyTextarea" ref={refB} placeholder="введите нечто второе"></textarea>
                <div>
                    <p> = </p>
                    <textarea className="uniCalc_beautyTextarea" ref={refC} placeholder="результат (дай бог правильный)"></textarea>
                </div>
            </div>

            <div className="uniCalc_beautyDiv">
                <p className="uniCalc_beautyP">↓ посчитать значение полинома в точке ↓</p>
            </div>
            <div className="uniCalc_beautyDiv">
                <textarea className="uniCalc_beautyTextarea" ref={refPoly} placeholder="введите полином"></textarea>
                <textarea className="uniCalc_beautyTextarea" ref={refX} placeholder="введите икс"></textarea>
                <div>
                    <button className="uniCalc_beautyButton" onClick={() => polyAtAPointHandler()}> = </button>
                </div>
                <div>
                    <textarea className="uniCalc_beautyTextarea" ref={refPolyAtAPoint} placeholder="результат"></textarea>
                </div>
            </div>
        </div>
    </>)
}

export default UniCalculator;