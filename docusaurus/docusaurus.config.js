/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'STENCIL',
  tagline: 'A web templating engine for visualizing and sharing data',
  url: 'https://github.com/CEGRcode/stencil',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CEGRcode', // Usually your GitHub org/user name.
  projectName: 'stencil', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'STENCIL',
      logo: {
        alt: 'STENCIL',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'install',
          position: 'right',
          label: 'Docs',
        },
        {
          href: 'https://github.com/CEGRcode/stencil',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
