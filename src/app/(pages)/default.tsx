// src/app/(pages)/default.tsx

import type { FC } from 'react';

import { isNil } from 'lodash';
import { notFound } from 'next/navigation';

import { queryPostItem } from '../../server/post/service';
import { MdxRender } from '../_components/mdx/render';
import $styles from './page.module.css';

// ...
const PostItemPage: FC<{ params: { item: string } }> = async ({ params }) => {
    const { item } = await params;
    const post = await queryPostItem(item);
    if (isNil(post)) return notFound();
    return (
        <div className={$styles.container}>
            //...
            <div className={$styles.body}>
                <MdxRender source={post.body} />
            </div>
        </div>
    );
};
export default PostItemPage;
