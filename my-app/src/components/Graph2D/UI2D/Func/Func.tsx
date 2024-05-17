import React, { KeyboardEvent } from "react";
import { TFunction } from "../../Graph2D";

type TFunc = {
    func: TFunction,
    reRender: () => void;
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, reRender } = props;

    const changeFunction = (event: KeyboardEvent<HTMLInputElement>) => {
        try {
            let f;
            eval(`f = function(x) {return ${event.currentTarget.value};}`);
            func.f = f;
            reRender();
        } catch (e) {
            console.log('ошибка ввода', e);
        }
    }

    return (<div>
        <input onKeyUp={(event) => changeFunction(event)} placeholder="введите фууу нкцию" />
    </div>);
}

export default Func;