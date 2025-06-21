// src/app/demo/_components/effect.tsx
// ...
'use client';
import { Button } from 'antd';
import { type FC, useEffect, useState } from 'react';

import $styles from './style.module.css';

const EffectDemo: FC = () => {
    const [ghost, setGhost] = useState<boolean>(false);
    const [width, setWidth] = useState(0);
    const toggleGhostBtn = () => setGhost(!ghost);
    const resizeHandle = () => setWidth(window.innerWidth);
    const [red, setRed] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            await new Promise((resolve) => {
                setTimeout(() => resolve(true), 1000);
            });
            setRed(ghost);
        })();
    }, [ghost]);
    return (
        // ...
        <div className="tw-flex tw-flex-col tw-justify-center">
            <Button type="primary" onClick={toggleGhostBtn} ghost={ghost} danger={red}>
                切换按钮样式
            </Button>
            <p className="tw-pt-5 tw-text-center">宽度为: {width}</p>
        </div>
    );
};
export default EffectDemo;
