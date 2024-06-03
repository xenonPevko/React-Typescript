import React, { KeyboardEvent } from "react";
import { TF, TFunction } from "../../Graph2D";
import useFunction from "../hooks/useFunction.ts";

import './Func.scss';

type TFunc = {
    func: TFunction,
    reRender: () => void;
    delFunction: () => void;
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, reRender, delFunction } = props;
    const [getFunction, getFunctionBody] = useFunction();

    const changeFunction = (event: KeyboardEvent<HTMLInputElement>) => {
        func.f = getFunction(event.currentTarget.value)
        reRender();
    }

    const changeColor = (event: KeyboardEvent<HTMLInputElement>) => {
        func.color = event.currentTarget.value;
        reRender();
    }

    const changeWidth = (event: KeyboardEvent<HTMLInputElement>) => {
        func.lineWidth = parseInt(event.currentTarget.value);
        reRender();
    }

    return (<div>
        <input
            className="func_beautyInput"
            placeholder="введите фууу нкцию"
            onKeyUp={(event) => changeFunction(event)}
            defaultValue={getFunctionBody(func.f)}
        />
        <input
            className="func_beautyInput"
            placeholder="введите цвет"
            onKeyUp={(event) => changeColor(event)}
            defaultValue={func.color}
        />
        <input
            className="func_beautyInput"
            placeholder="введите ширину функции"
            onKeyUp={(event) => changeWidth(event)}
            defaultValue={func.lineWidth}
        />
        <button
            className="func_beautyButton"
            onClick={delFunction}>удалить функцию
        </button> 
    </div>);
}

export default Func;