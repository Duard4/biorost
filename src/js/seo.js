// Centralized SEO / GEO head config. Site-wide tags + JSON-LD live in
// useSiteHead() (called once in App.vue); per-route title/description/canonical
// live in usePageSeo() (called by each page). Driven by @unhead/vue so tags are
// injected at runtime AND baked into static HTML by the prerender step.
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

const abs = (path) => `${SITE_URL}${path}`;
const typeName = (typeStr) => {
  const first = String(typeStr).split(" ")[0];
  return types.find((t) => t.id === first)?.name || "Добрива";
};

const SITE_TITLE = about.title;
const SITE_DESCRIPTION =
  "Виробник сертифікованих органічних добрив, інокулянтів та біопрепаратів з Запоріжжя. Відновлення родючості ґрунту та підвищення врожайності по всій Україні.";

// LocalBusiness anchors geo-targeting (Запоріжжя); AgriculturalBusiness is the
// most specific applicable Schema.org type.
const localBusiness = {
  "@type": ["LocalBusiness", "AgriculturalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "ТМ «Біорост»",
  legalName: about.company,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO },
  image: OG_IMAGE,
  description: SITE_DESCRIPTION,
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
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
  name: SITE_TITLE,
  inLanguage: "uk-UA",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

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
      url: `${SITE_URL}/products`,
    },
  })),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, website, productList],
};

// Site-wide head: language, default OG/Twitter chrome, JSON-LD graph.
export function useSiteHead() {
  useHead({
    htmlAttrs: { lang: "uk" },
    meta: [
      { name: "robots", content: "index, follow" },
      { name: "keywords", content:
          "органічні добрива, біопрепарати для аграріїв, мікробні препарати Україна, органо-мінеральні добрива, інокулянти, ТМ Біорост, Запоріжжя, родючість ґрунту, біофунгіциди, біоінсектициди" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ТМ «Біорост»" },
      { property: "og:locale", content: "uk_UA" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:type", content: "image/webp" },
      { property: "og:image:width", content: String(OG_IMAGE_W) },
      { property: "og:image:height", content: String(OG_IMAGE_H) },
      { property: "og:image:alt", content: "Органічні добрива ТМ Біорост – поля України" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(schema) },
    ],
  });
}

// Per-route head: title, description, canonical, og:url/title/description.
export function usePageSeo({ title, description, path = "/" }) {
  const url = `${SITE_URL}${path}`;
  const desc = description || SITE_DESCRIPTION;
  useHead({
    title,
    link: [{ rel: "canonical", href: url }],
    meta: [
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
    ],
  });
}
