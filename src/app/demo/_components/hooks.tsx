import { isNil } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

import type { LocaleType } from './context/types';

import { LocaleContext } from './context';
import { locales } from './context/constants';

/**
 *
 */
export const useLocale = () => {
    const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
    return useMemo(() => (isNil(context.locale) ? locales[0] : context.locale), [context.locale]);
};

/**
 *  获取语言切换方法
 */
export const useLocaleAction = () => {
    const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
    return useCallback(isNil(context.setLocale) ? (_locale: LocaleType) => {} : context.setLocale, [
        context.setLocale,
    ]);
};
