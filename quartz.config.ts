import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Daggerheart",
    pageTitleSuffix: " – Daggerheart",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "pjwalker.github.io/daggerheart/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Roboto Slab",
        body: "Roboto",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fffcf2",
          lightgray: "#faf3e0",
          gray: "#968a6d",
          darkgray: "#000000",
          dark: "#13061f",
          secondary: "#8f5838",
          tertiary: "#b86407",
          highlight: "transparent",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#191120",
          lightgray: "#2a1d37",
          gray: "#76618a",
          darkgray: "#ffffff",
          dark: "#ffefc7",
          secondary: "#f4d772",
          tertiary: "#ffd772",
          highlight: "transparent",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git"],
      }),
      Plugin.DiceRolls(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description({ allowFragment: true, descriptionLength: 340 }),
      Plugin.HardLineBreaks(),
      Plugin.FindSocialImage(),
    ],
    filters: [Plugin.RemoveDrafts(), Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({ showFolderCount: false }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
        includeEmptyFiles: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages({
        autogenerate: false,
      }),
    ],
  },
}

export default config
