// src/lib/db.ts

// ...
import { PrismaClient } from '@prisma/client';
import paginateExt from 'prisma-paginate';

const prismaClientSingleton = () => {
    return new PrismaClient().$extends(paginateExt);
};
