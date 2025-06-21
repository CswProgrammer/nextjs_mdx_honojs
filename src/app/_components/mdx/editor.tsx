'use client';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { debounce, isNil } from 'lodash';
import dynamic from 'next/dynamic';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';

import type { MdxEditorProps, MdxHydrateProps } from './types';

import { useThemeColor } from '../theme/hooks';
import $styles from './editor.module.css';
import { MdxHydrate } from './hydrate';
import { serializeMdx } from './utils';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export const MdxEditor: FC<MdxEditorProps> = (props) => {
    const { content, setContent, disabled } = props;
    const [serialized, setSerialized] = useState<MdxHydrateProps['serialized']>();
    const theme = useThemeColor();
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorHeight, setEditorHeight] = useState<number>();

    // 防抖效果，减少序列化次数
    const debouncedSerialize = useCallback(
        debounce(async (text: string) => {
            const serialized = await serializeMdx(text);
            setSerialized(serialized);
        }, 1000),
        [],
    );

    useEffect(() => {
        if (!isNil(content)) debouncedSerialize(content);
        return () => {
            debouncedSerialize.cancel();
        };
    }, [content]);

    const updateHeight = useCallback(() => {
        if (containerRef.current) {
            const parentHeight = containerRef.current.clientHeight;
            if (parentHeight) {
                setEditorHeight(parentHeight);
            }
        }
    }, [containerRef.current]);
    // 修改 onChange 的处理函数，确保它接受可选的字符串参数
    const handleContentChange: (value?: string) => void = (value) => {
        if (value !== undefined) {
            setContent(value); // 只有当 value 不是 undefined 时才调用 setContent
        }
    };

    useEffect(() => {
        if (!isNil(serialized) && isNil(editorHeight)) updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [serialized]);

    return (
        serialized && (
            <div ref={containerRef} data-color-mode={theme} className={$styles.container}>
                <div className="wmde-markdown-var"> </div>
                <MDEditor
                    value={content}
                    onChange={handleContentChange}
                    height={editorHeight}
                    minHeight={editorHeight}
                    textareaProps={{ disabled }}
                    visiableDragbar
                    components={{
                        preview: () => <MdxHydrate serialized={serialized} toc={false} />,
                    }}
                />
            </div>
        )
    );
};
