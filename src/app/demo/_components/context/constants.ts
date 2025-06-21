// src/app/demo/_components/context/constants.ts
// ...
import type { Locale } from 'antd/es/locale';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import type { LocaleType } from './types';

/**
 * antd语言包
 */
export const localeData: Record<string, Locale> = {
    en_US: enUS,
    zh_CN: zhCN,
};

/**
 * 可选语言列表
 */
export const locales: LocaleType[] = [
    {
        name: 'en_US',
        label: '🇺🇸 english(US)',
    },
    {
        name: 'zh_CN',
        label: '🇨🇳 简体中文',
    },
];

export const antdLocaleData = zhCN; // 或通过 useLocale() 获取动态值
