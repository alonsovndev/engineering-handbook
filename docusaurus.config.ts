import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Engineering Handbook",
  tagline: "Source of truth for the engineering platform: standards, conventions, and decisions.",
  favicon: "img/favicon.svg",

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here.
  // For GitHub Pages, it is usually 'https://<organizationName>.github.io'.
  url: "https://alonsovndev.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served.
  // For GitHub Pages deployment, it is often '/<projectName>/'.
  baseUrl: "/engineering-handbook/",

  // GitHub Pages deployment config.
  // Replace with your GitHub org/user name and repository name.
  organizationName: "alonsovndev",
  projectName: "engineering-handbook",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Point this to your repository to enable the "Edit this page" links.
          editUrl: "https://github.com/alonsovndev/engineering-handbook/edit/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Diagrams must stay legible in both color modes, since colorMode follows
    // the reader's OS preference.
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
    navbar: {
      title: "Engineering Handbook",
      logo: {
        alt: "Engineering Handbook Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/alonsovndev/engineering-handbook",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/alonsovndev/engineering-handbook",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alonsovndev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
