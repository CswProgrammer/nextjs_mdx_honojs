import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { notFound } from 'next/navigation';

import { fetchApi } from '@/libs/api';

export const generateMetadata = async (
    { params }: { params: Promise<{ item: string }> },
    parent: ResolvingMetadata,
): Promise<Metadata> => {
    const { item } = await params;
    const result = await fetchApi(async (c) => c.api.posts[':item'].$get({ param: { item } }));
    if (!result.ok) return {};
    const post = await result.json();

    return {
        title: `${post.title} - ${(await parent).title?.absolute}`,
        keywords: post.keywords,
        description: post.description,
    };
};

const PostItemPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    const result = await fetchApi(async (c) => c.api.posts[':item'].$get({ param: { item } }));
    if (!result.ok) {
        if (result.status !== 404) throw new Error((await result.json()).message);
        return notFound();
    }
    const post = await result.json();
    // ...
};
export default PostItemPage;
