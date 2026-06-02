// Smart redirects to the contact form ("Зв'яжіться з нами").
//
// CTAs across the site route to /contacts#form carrying an `intent` query param
// (plus context like product title or job). The intent is encoded in the URL so
// the prefill survives reloads and is deep-linkable – no shared event bus needed.
// ContactPage reads the query and pre-fills subject / subcategory / message.
import { categoryName } from "./useProductCatalog";

const target = (query) => ({ path: "/contacts", hash: "#form", query });

export const orderProductQuery = (product) =>
  target({
    intent: "product",
    product: product.title,
    type: String(product.type).split(" ")[0],
  });

export const consultationQuery = () => target({ intent: "consultation" });

export const requestQuery = () => target({ intent: "request" });

export const jobApplicationQuery = (jobTitle) =>
  target({ intent: "application", job: jobTitle });

// Job titles and product type names don't always match a form option verbatim
// (e.g. "(B2B)" vs "(B2B-сектор)"), so fall back to a prefix match.
const bestMatch = (value, options = []) => {
  if (!value) return "";
  if (options.includes(value)) return value;
  const base = (s) => s.split(" (")[0].trim();
  return (
    options.find((o) => o.startsWith(value) || value.startsWith(o)) ||
    options.find((o) => base(o) === base(value)) ||
    ""
  );
};

// Derive the fields to fill from the URL query and the form's category map.
// Returns null when there's no recognised intent.
export function resolvePrefill(query, categories) {
  switch (query.intent) {
    case "product": {
      const subject = "Покупка";
      return {
        subject,
        subcategory: bestMatch(
          query.type ? categoryName(query.type) : "",
          categories[subject],
        ),
        message: query.product
          ? `Хочу замовити продукт «${query.product}». Прошу зв'язатися щодо наявності, ціни та доставки.`
          : "",
      };
    }
    case "consultation": {
      const subject = "Питання";
      return {
        subject,
        subcategory: "Про використання",
        message:
          "Хочу замовити консультацію агронома щодо підбору препаратів і норм внесення під мою культуру.",
      };
    }
    case "application": {
      const subject = "Вакансії";
      return {
        subject,
        subcategory: bestMatch(query.job, categories[subject]),
        message: query.job
          ? `Хочу подати заявку на вакансію «${query.job}».`
          : "",
      };
    }
    case "request":
      return {
        subject: "",
        subcategory: "",
        message:
          "Залишаю заявку – прошу зв'язатися зі мною для уточнення деталей.",
      };
    default:
      return null;
  }
}
