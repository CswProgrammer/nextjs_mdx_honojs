import type { NextConfig } from 'next';

import createMDX from '@next/mdx';
const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [['rehype-prism-plus', { showLineNumbers: true }] as any],
        providerImportSource: '@mdx-js/react',
    },
});
const externals: string[] = ['next-mdx-remote-client'];
if (process.env.TURBOPACK) {
    externals.push('rehype-prism-plus');
}

const nextConfig: NextConfig = {
    reactStrictMode: true, // 开启react严格模式
    transpilePackages: ['@uiw/react-md-editor'],
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    serverExternalPackages: externals,
    serverComponentsExternalPackages: ['@prisma/client'],
    experimental: {
        mdxRs: false,
        serverComponentsExternalPackages: ['@prisma/client', 'prismjs'],
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'mdx'],
    experimental: {
        mdxRs: false, // 暂时禁用Rust编译器
    },
});

export default withMDX(nextConfig);
