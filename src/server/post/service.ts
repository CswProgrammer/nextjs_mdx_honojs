'use server';

import type { Post, Prisma } from '@prisma/client';

import { isNil } from 'lodash';

import type { PaginateOptions, PaginateReturn } from '@/libs/db/types';

import db from '@/libs/db/client';
import { paginateTransform } from '@/libs/db/utils';
import { getRandomInt } from '@/libs/random';

/**
 * 查询分页文章列表信息
 * @param options
 */
export const queryPostPaginate = async (
    options?: PaginateOptions,
): Promise<PaginateReturn<Post>> => {
    const data = await db.post.paginate({
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        page: 1,
        limit: 8,
        ...options,
    });
    return paginateTransform(data);
};

/**
 * 根据查询条件获取文章总页数
 * @param limit
 */
export const queryPostTotalPages = async (limit = 8): Promise<number> => {
    const data = await queryPostPaginate({ page: 1, limit });
    return data.meta.totalPages ?? 0;
};
/**
 * 根据id或slug查询文章信息
 * @param arg
 */
export const queryPostItem = async (arg: string): Promise<Post | null> => {
    const item = await db.post.findFirst({
        where: { id: arg },
    });
    return item;
};

/**
 * 根据ID查询文章信息
 * @param id
 */
export const queryPostItemById = async (id: string): Promise<Post | null> => {
    const item = await db.post.findUnique({ where: { id } });
    return item;
};

/**
 * 新增文章
 * @param data
 */
export const createPostItem = async (data: Prisma.PostCreateInput): Promise<Post> => {
    const item = await db.post.create({
        data: { ...data, thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png` },
    });
    return item;
};

/**
 * 更新文章
 * @param id
 * @param data
 */
export const updatePostItem = async (
    id: string,
    data: Partial<Omit<Post, 'id'>>,
): Promise<Post> => {
    const item = await db.post.update({ where: { id }, data });
    return item;
};

/**
 * 删除文章
 * @param id
 */
export const deletePostItem = async (id: string): Promise<Post | null> => {
    const item = await db.post.findUnique({ where: { id } });
    if (!isNil(item)) {
        await db.post.delete({ where: { id } });
        return item;
    }
    return null;
};

/**
 * 根据slug查询文章信息
 * @param slug
 */
export const queryPostItemBySlug = async (slug: string): Promise<Post | null> => {
    const item = await db.post.findUnique({ where: { slug } });
    return item;
};

/**
 * 异常响应生成
 * @param title
 * @param error
 * @param code
 */
// 修改后（异步函数）：
export const createErrorResult = async (title: string, error?: any, code?: number) => {
    let message = title;
    if (!isNil(error)) {
        message =
            error instanceof Error || 'message' in error
                ? `${title}:${error.message}`
                : `${title}:${error.toString()}`;
    }

    return {
        code,
        message,
    };
};

/**
 * 通过ID验证slug的唯一性
 * @param id
 */
export const isSlugUnique = async (id?: string) => async (val?: string | null) => {
    if (isNil(val) || !val.length) return true;
    const post = await queryPostItemBySlug(val);
    if (isNil(post) || post.id === id) return true;
    return false;
};
