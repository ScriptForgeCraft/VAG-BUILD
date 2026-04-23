import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { faqs } from "../src/entities/faq/model/faqs.js";
import { HTML_LANG_BY_LANGUAGE } from "../src/shared/constants/languages.js";
import { siteConfig } from "../src/shared/config/site-config.js";
import { heroMedia } from "../src/shared/config/media.js";
import { siteMeta } from "../src/shared/config/site-meta.js";
import { getTranslation } from "../src/shared/lib/i18n.js";
import { isActionableLink } from "../src/shared/lib/link.js";
import { renderFloatingActions } from "../src/widgets/floating-actions/ui/floating-actions.js";
import { renderSiteFooter } from "../src/widgets/footer/ui/site-footer.js";
import { renderSiteHeader } from "../src/widgets/header/ui/site-header.js";
import { renderHomePage } from "../src/pages/home/index.js";
import { renderIconSprite } from "../src/shared/ui/icons.js";
import { renderSkipLink } from "../src/shared/ui/skip-link.js";

const OUTPUTS = [
  { language: "am", file: resolve("index.html"), path: "/" },
  { language: "am", file: resolve("am/index.html"), path: "/am/" },
  { language: "ru", file: resolve("ru/index.html"), path: "/ru/" },
  { language: "en", file: resolve("en/index.html"), path: "/en/" },
];

const siteUrl = "https://vag.am";
const languagePathMap = {
  am: "/am/",
  ru: "/ru/",
  en: "/en/",
};
const localeMap = {
  am: "hy_AM",
  ru: "ru_RU",
  en: "en_US",
};
const defaultLanguageUrl = `${siteUrl}${languagePathMap.am}`;

function stripI18nAttributes(html) {
  return html
    .replace(/\sdata-i18n\b/g, "")
    .replace(/\sdata-(?:am|ru|en)="[^"]*"/g, "")
    .replace(/\sdata-placeholder-(?:am|ru|en)="[^"]*"/g, "")
    .replace(/\sdata-text-(?:am|ru|en)="[^"]*"/g, "")
    .replace(/\sdata-alt-(?:am|ru|en)="[^"]*"/g, "")
    .replace(/\sdata-aria-label-(?:am|ru|en)="[^"]*"/g, "");
}

function replaceAttributeFromData(html, { language, attribute, dataPrefix }) {
  const tagPattern = new RegExp(`<[^>]*\\b${dataPrefix}-${language}="[^"]*"[^>]*>`, "gi");

  return html.replace(tagPattern, (tag) => {
    const match = tag.match(new RegExp(`${dataPrefix}-${language}="([^"]*)"`, "i"));

    if (!match) {
      return tag;
    }

    const nextValue = match[1];
    const attributePattern = new RegExp(`${attribute}="[^"]*"`, "i");

    if (attributePattern.test(tag)) {
      return tag.replace(attributePattern, `${attribute}="${nextValue}"`);
    }

    return tag.replace(/>$/, ` ${attribute}="${nextValue}">`);
  });
}

function replaceTextContent(html, language) {
  const contentPattern = new RegExp(
    `(<([a-z0-9:-]+)(?=[^>]*\\bdata-i18n\\b)[^>]*\\bdata-${language}="([^"]*)"[^>]*>)([\\s\\S]*?)(</\\2>)`,
    "gi"
  );

  return html.replace(contentPattern, (_, openTag, __tagName, translatedValue, _inner, closingTag) => {
    return `${openTag}${translatedValue}${closingTag}`;
  });
}

function replaceOptionText(html, language) {
  const optionPattern = new RegExp(
    `(<option(?=[^>]*\\bdata-text-${language}="([^"]*)"[^>]*>)[^>]*>)([\\s\\S]*?)(</option>)`,
    "gi"
  );

  return html.replace(optionPattern, (_, openTag, translatedValue, _inner, closingTag) => {
    return `${openTag}${translatedValue}${closingTag}`;
  });
}

function localizeRenderedHtml(html, language) {
  let localized = html;

  localized = replaceTextContent(localized, language);
  localized = replaceOptionText(localized, language);
  localized = replaceAttributeFromData(localized, {
    language,
    attribute: "placeholder",
    dataPrefix: "data-placeholder",
  });
  localized = replaceAttributeFromData(localized, {
    language,
    attribute: "alt",
    dataPrefix: "data-alt",
  });
  localized = replaceAttributeFromData(localized, {
    language,
    attribute: "aria-label",
    dataPrefix: "data-aria-label",
  });

  return stripI18nAttributes(localized);
}

function renderBody(language) {
  return `
    ${renderSkipLink(language)}
    ${renderIconSprite()}
    ${renderSiteHeader(language)}
    ${renderHomePage()}
    ${renderSiteFooter()}
    ${renderFloatingActions()}
  `;
}

function renderFaqSchema(language) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: getTranslation(item.question, language),
        acceptedAnswer: {
          "@type": "Answer",
          text: getTranslation(item.answer, language),
        },
      })),
    },
    null,
    2
  );
}

function renderBusinessSchema(language, pageUrl) {
  const sameAs = Object.values(siteConfig.socialLinks).filter((value) => isActionableLink(value));

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "@id": `${pageUrl}#business`,
      name: siteConfig.brandName,
      url: pageUrl,
      image: `${siteUrl}/assets/images/og-cover.svg`,
      logo: `${siteUrl}/assets/images/favicon.svg`,
      description: getTranslation(siteMeta.description, language),
      telephone: `+${siteConfig.phone.raw}`,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yerevan",
        addressCountry: "AM",
      },
      areaServed: [
        { "@type": "Country", name: "Armenia" },
        { "@type": "City", name: "Yerevan" },
      ],
      openingHours: "Mo-Su 09:00-20:00",
      availableLanguage: ["hy", "ru", "en"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+${siteConfig.phone.raw}`,
          email: siteConfig.email,
          contactType: "customer support",
          areaServed: "AM",
          availableLanguage: ["hy", "ru", "en"],
        },
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
    null,
    2
  );
}

function renderHead({ language, pagePath }) {
  const title = getTranslation(siteMeta.title, language);
  const description = getTranslation(siteMeta.description, language);
  const sourcePageUrl = `${siteUrl}${pagePath === "/" ? "/" : pagePath}`;
  const canonical = pagePath === "/" ? defaultLanguageUrl : sourcePageUrl;
  const robots = pagePath === "/" ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const ogLocale = localeMap[language] || localeMap.am;
  const alternateLocaleTags = Object.entries(localeMap)
    .filter(([code]) => code !== language)
    .map(([, locale]) => `    <meta property="og:locale:alternate" content="${locale}" />`)
    .join("\n");

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
    <meta name="theme-color" content="#1A1A1A" />
    <link rel="preload" as="image" href="${heroMedia.src}" type="image/svg+xml" fetchpriority="high" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${defaultLanguageUrl}" />
    <link rel="alternate" hreflang="hy" href="${siteUrl}${languagePathMap.am}" />
    <link rel="alternate" hreflang="ru" href="${siteUrl}${languagePathMap.ru}" />
    <link rel="alternate" hreflang="en" href="${siteUrl}${languagePathMap.en}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
    />
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
    <link rel="stylesheet" href="/src/shared/styles/index.css" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteConfig.brandName}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/assets/images/og-cover.svg" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${ogLocale}" />
${alternateLocaleTags}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/assets/images/og-cover.svg" />
    <meta name="twitter:image:alt" content="${title}" />
    <script type="application/ld+json">
${renderBusinessSchema(language, canonical)}
    </script>
    <script type="application/ld+json">
${renderFaqSchema(language)}
    </script>
  `.trim();
}

function renderDocument({ language, pagePath }) {
  const htmlLang = HTML_LANG_BY_LANGUAGE[language] || language;
  const body = localizeRenderedHtml(renderBody(language), language);

  return `<!doctype html>
<html lang="${htmlLang}" class="no-js" data-page-language="${language}" data-default-language="${language}">
  <head>
    ${renderHead({ language, pagePath })}
  </head>
  <body>
    ${body}
    <script type="module" src="/src/static-main.js"></script>
  </body>
</html>
`;
}

function renderSitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const indexedOutputs = OUTPUTS.filter((output) => output.path !== "/");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexedOutputs
  .map((output) => {
    const pageUrl = `${siteUrl}${output.path}`;

    return `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="hy" href="${siteUrl}${languagePathMap.am}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${siteUrl}${languagePathMap.ru}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${languagePathMap.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLanguageUrl}" />
  </url>`;
  })
  .join("\n")}
</urlset>
`;
}

for (const output of OUTPUTS) {
  await mkdir(dirname(output.file), { recursive: true });
  await writeFile(
    output.file,
    renderDocument({
      language: output.language,
      pagePath: output.path,
    }),
    "utf8"
  );
}

await writeFile(resolve("public/sitemap.xml"), renderSitemapXml(), "utf8");
