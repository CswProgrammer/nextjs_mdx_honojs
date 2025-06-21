'use client';
import { createContext } from 'react';

// src/app/demo/_components/reducer/constants.ts
import type { ThemeContextType, ThemeState } from './types';

export const defaultThemeConfig: ThemeState = {
    mode: 'light',
    compact: false,
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
