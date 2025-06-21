// src/app/(pages)/layout.tsx
import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import modal from 'antd/es/modal';

import { Header } from '../_components/header';
import './global.css';
import Theme from '../_components/theme';
import $styles from './layout.module.css';
export const metadata: Metadata = {
    title: '猪pig的全栈博客',
    description:
        '猪pig的个人全栈博客,提供一些ts、react、node.js、java相关的技术文档以及分享一些生活琐事',
};
console.log('Modal content received:', !!modal); // 调试用
const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <Theme>
        <div className={$styles.layout}>
            <Header />
            {children}
        </div>
        {modal}
    </Theme>
);
export default AppLayout;
