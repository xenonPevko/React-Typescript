import React, { useState } from "react";
import { TFunction } from "../Graph2D.tsx";
import Func from "./Func/Func.tsx";
import useFunction from "./hooks/useFunction.ts";

import './UI2D.scss';

type TUI2D = {
    funcs: TFunction[];
    reRender: () => void;
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    const { funcs, reRender } = props;
    const [count, setCount] = useState(funcs.length);
    const [getFunction] = useFunction();

    const addFunction = () => {
        const func: TFunction = {
            f: getFunction('0'),
            color: "#000000",
            lineWidth: 2
        }
        funcs.push(func);
        setCount(funcs.length);
    }

    const delFunction = (index: number): void => {
        funcs.splice(index, 1);
        setCount(funcs.length);
        reRender();
    }

    return (<>
        <button
            className="ui2D_beautyButton"
            onClick={addFunction}
        >добавить фууу нкцию</button>
        <div>{
            funcs.map((func, index) =>
                <Func
                    key={index}
                    func={func}
                    reRender={reRender}
                    delFunction={() => delFunction(index)}
                />
            )
        }</div>
    </>);
}

export default UI2D;