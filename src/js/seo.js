// Centralized SEO / GEO head config: meta tags, Open Graph, Twitter cards,
// and JSON-LD structured data. Driven by useHead (@unhead/vue) so it is
// injected at runtime AND baked into the static HTML by the prerender step.
import { useHead } from "@unhead/vue";
import { items, types } from "./data";
import about from "../assets/data/about.json";

const SITE_URL = "https://www.biorost.ua";
const LOGO = `${SITE_URL}/assets/content-images/logo.webp`;
const OG_IMAGE = `${SITE_URL}/assets/bg-images/hero.webp`;
const OG_IMAGE_W = 1920;
const OG_IMAGE_H = 1144;
const PHONE = "+380687579303";
const EMAIL = "a0687579303@gmail.com";
const KEYWORDS =
  "органічні добрива, біопрепарати для аграріїв, добрива для ягідників, мікробні препарати Україна, органо-мінеральні добрива, інокулянти для сільгоспкультур, ТМ Біорост, Запоріжжя, покращення родючості ґрунту, біофунгіциди, біоінсектициди";

const TITLE = about.title; // "ТМ «Біорост» — Органічні добрива та біопрепарати для аграріїв України"
const DESCRIPTION =
  "Виробник сертифікованих органічних добрив, інокулянтів та біопрепаратів з Запоріжжя. Відновлення родючості ґрунту та підвищення врожайності по всій Україні.";

const abs = (path) => `${SITE_URL}${path}`;
const typeName = (typeStr) => {
  const first = String(typeStr).split(" ")[0];
  return types.find((t) => t.id === first)?.name || "Добрива";
};

// LocalBusiness anchors the geo-targeting (Запоріжжя) for local search + maps.
// AgriculturalBusiness is the most specific applicable Schema.org type.
const localBusiness = {
  "@type": ["LocalBusiness", "AgriculturalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "ТМ «Біорост»",
  legalName: about.company,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO,
  },
  image: OG_IMAGE,
  description: DESCRIPTION,
  foundingDate: String(about.founded),
  email: EMAIL,
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Луганська, 29а",
    addressLocality: "Запоріжжя",
    postalCode: "69083",
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.7913132,
    longitude: 35.2232529,
  },
  hasMap: "https://maps.app.goo.gl/B4SRqeFBW5ZKHrT6A",
  priceRange: "₴₴",
  areaServed: { "@type": "Country", name: "Україна" },
  sameAs: ["https://www.instagram.com/biorost_zp/"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    contactType: "sales",
    areaServed: "UA",
    availableLanguage: ["Ukrainian"],
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: TITLE,
  inLanguage: "uk-UA",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// ItemList of Products — lets search/AI engines enumerate the catalog.
const productList = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#products`,
  name: "Продукція ТМ «Біорост»",
  numberOfItems: items.length,
  itemListElement: items.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.title,
      ...(p.description ? { description: p.description } : {}),
      category: typeName(p.type),
      image: abs(p.frontImage),
      brand: { "@type": "Brand", name: "Біорост" },
      url: `${SITE_URL}/#products`,
    },
  })),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, website, productList],
};

export function useSeo() {
  useHead({
    title: TITLE,
    htmlAttrs: { lang: "uk" },
    link: [{ rel: "canonical", href: `${SITE_URL}/` }],
    meta: [
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ТМ «Біорост»" },
      { property: "og:locale", content: "uk_UA" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:type", content: "image/webp" },
      { property: "og:image:width", content: String(OG_IMAGE_W) },
      { property: "og:image:height", content: String(OG_IMAGE_H) },
      { property: "og:image:alt", content: "Органічні добрива ТМ Біорост — поля України" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "Органічні добрива ТМ Біорост — поля України" },
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
      },
    ],
  });
}
