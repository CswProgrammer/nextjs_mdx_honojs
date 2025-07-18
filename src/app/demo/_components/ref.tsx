// src/app/demo/_components/ref.tsx
'use client';
import type { ChangeEventHandler, FC } from 'react';

import { Button } from 'antd';
import clsx from 'clsx';
import { isNaN, isNil } from 'lodash';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

// ...
import $styles from './style.module.css';

interface RefFunc {
    focus: () => void;
    memo: () => number;
}

const MyInput = forwardRef<RefFunc, { value: number; changeValue: (v: number) => void }>(
    ({ value, changeValue }, ref) => {
        const [local, setLocal] = useState<number | string>(value);
        const inputRef = useRef<HTMLInputElement | null>(null);
        useImperativeHandle(
            ref,
            () => ({
                focus: () => inputRef.current.focus(),
                memo: () => value,
            }),
            [value],
        );
        useEffect(() => {
            changeValue(isNaN(Number(local)) ? 0 : Number(local));
        }, [changeValue, local]);
        const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
            setLocal(e.target.value);
        }, []);
        return (
            <input value={value} ref={inputRef} placeholder="请输入值" onChange={handleChange} />
        );
    },
);

const RefDemo: FC = () => {
    const [count, setCount] = useState(0);
    const ref = useRef<RefFunc | null>(null);
    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);
    return (
        <div className={clsx($styles.container, 'tw-w-80')}>
            {/* ,,, */}
            <div className="tw-flex tw-flex-col">
                {!isNil(ref.current) && <p className="tw-my-3">前一个值：{ref.current.memo()}</p>}
                <MyInput ref={ref} value={count} changeValue={setCount} />
            </div>
        </div>
    );
};

export default RefDemo;
