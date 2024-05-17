import React, { useState } from "react";
import { TFunction } from "../Graph2D.tsx";
import Func from "./Func/Func.tsx";

type TUI2D = {
    funcs: TFunction[];
    reRender: () => void;
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    // в старом коде : const { funcs, reRender } = props;
    const { funcs, reRender } = props;
    const [count, setCount] = useState(funcs.length);

    const addFunction = () => {

        const func = {
            f: () => 0,
            color: 'black',
            width: 2
        };
        funcs.push(func);
        setCount(funcs.length);
    }

    return (<>
        <button
            className="beautyButton"
            onClick={addFunction}
        >добавить фууу нкцию</button>
        <div>{
            funcs.map((func, index) =>
                <Func
                    key={index}
                    func={func}
                    reRender={reRender}
                />
            )
        }</div>
    </>);
}

export default UI2D;