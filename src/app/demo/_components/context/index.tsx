'use client';
import type { FC, PropsWithChildren } from 'react';

import { Pagination, Select } from 'antd';
import { createContext, useCallback, useMemo, useState } from 'react';

import type { LocaleState, LocaleType } from './types';

import { useLocale, useLocaleAction } from '../hooks';
import $styles from '../style.module.css';
import { localeData, locales } from './constants';

export const LocaleContext = createContext<LocaleState>({
    locale: locales[0],
    setLocale: (_locale: LocaleType) => {},
});

const LocaleProvider: FC<PropsWithChildren<LocaleState>> = ({ locale, setLocale, children }) => {
    const value = useMemo(() => ({ locale, setLocale }), [locale]);
    return <LocaleContext value={value}>{children}</LocaleContext>;
};

export const Locale: FC<PropsWithChildren> = ({ children }) => {
    const [locale, setLocale] = useState<LocaleType>(locales[0]);
    const changeLocale = useCallback((value: LocaleType) => {
        if (Object.keys(localeData).find((v) => v === value.name)) {
            setLocale(value);
        }
    }, []);
    return (
        <LocaleProvider locale={locale} setLocale={changeLocale}>
            {children}
        </LocaleProvider>
    );
};

export const LocaleConfig: FC = () => {
    const locale = useLocale();
    const setLocale = useLocaleAction();
    const changeLocale = (value: string) => {
        const current = locales.find((item) => item.name === value);
        current && setLocale(current);
    };
    return (
        <Select defaultValue={locale.name} style={{ width: 120 }} onChange={changeLocale}>
            {locales.map(({ name, label }) => (
                <Select.Option key={name} value={name}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
};

export const ContextDemo: FC = () => {
    const locale = useLocale();
    return (
        <div className={$styles.container}>
            <h2 className="tw-text-center">useContext Demo</h2>
            <p className="tw-py-5 tw-text-center">当前语言: {locale.label}</p>
            <div className="tw-w-full">
                <h3>Antd语言切换测试</h3>
                <div className="tw-my-4 tw-w-full">
                    <LocaleConfig />
                </div>
            </div>
            <Pagination defaultCurrent={0} total={500} />
        </div>
    );
};
export default Locale;
