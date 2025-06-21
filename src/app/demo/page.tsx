'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
// src/app/demo/page.tsx
import { type FC, type PropsWithChildren, useContext, useMemo } from 'react';

import Locale from './_components/context'; // ✅ 正确路径
import { antdLocaleData } from './_components/context/constants';
import { ContextDemo } from './_components/context/index';
import { defaultThemeConfig, ThemeContext } from './_components/reducer/constants';
import ReducerDemo from './_components/reducer/index'; // ✅ 自己定义的 Theme context provider
const DemoPage: FC = () => (
    <>
        {/* <StateDemo />
        <EffectDemo />
        <RefDemo />
        <MemoDemo />
        <CallbackDemo /> */}
        <ContextDemo />
        <ReducerDemo />
    </>
);

export default DemoPage;

// src/app.tsx
// ...
