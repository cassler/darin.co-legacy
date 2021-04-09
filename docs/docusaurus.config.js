const version = require('../package.json').version;

module.exports = {
  title: 'Thanks for everything!',
  tagline: 'Please keep this as a token of my gratitude.',
	url: 'https://pages.ghe.coxautoinc.com',
	baseUrl: '/Darin-Cassler/workflower-monorepo/',
  favicon: 'img/favicon.ico',
	githubHost: 'ghe.coxautoinc.com',
	organizationName: 'Darin-Cassler', // Usually your GitHub org/user name.
  projectName: 'workflower-monorepo', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: `${version}`,
      logo: {
        alt: 'Workflower',
        src: 'img/wf.png',
      },
      items: [
        {
          to: 'docs/intro',
          activeBasePath: 'intro',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://ghe.coxautoinc.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quickstart',
              to: '/docs/intro',
            },
            {
              label: 'Dealertrack Reports',
							to: '/docs/guide_choose_dt',
            },
						{
							label: 'Handling Requests',
							to: '/docs/guide_partner_submission',
						},
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Lender DR Sharepoint',
							href: 'https://coxautoinc.sharepoint.com/sites/LendingandTier1DigitalRetailing',
							target: '_blank'
            },
            {
              label: 'Implementation Docs',
							href: 'https://coxautoinc.sharepoint.com/sites/LendingandTier1DigitalRetailing/Shared%20Documents/Forms/AllItems.aspx?viewid=a6771fc7%2D2e11%2D46c2%2D99d0%2Dd0dfe921b98e&id=%2Fsites%2FLendingandTier1DigitalRetailing%2FShared%20Documents%2FImplementation',
							target: '_blank'
            },
            {
              label: 'Salesforce Dashboard',
							href: 'https://dealertrack-production.my.salesforce.com/01Z0e000000Qyed',
							target: '_blank'
            },
						{
							label: 'eBiz Suite',
							href: 'https://suiteadmin.dtdrs.dealertrack.com/#SuiteAccountPlace:676523',
							target: '_blank'

						}
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Browse Documentation Source',
							to: 'https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/gh-pages',
							target: '_blank'
            },
            {
              label: 'GitHub',
							href: 'https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo',
							target: '_blank'
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cox Auto, Inc. For internal use only.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
