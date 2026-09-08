import { Helmet } from "react-helmet-async";
import { useSiteData } from "../contexts/SiteDataContext";

const SITE_URL = "https://iskenda.ao/";
const FALLBACK_DESCRIPTION =
  "IS KENDA CONSULTORIA & ACADEMIA — Soluções empresariais para o crescimento do seu negócio em Angola.";
const FALLBACK_OG_IMAGE = `${SITE_URL}og-image.png`;

export default function HeadTags() {
  const { company } = useSiteData();

  const description = company?.slogan
    ? `IS KENDA CONSULTORIA & ACADEMIA — Contabilidade, Fiscalidade, Recursos Humanos e Formação Profissional em Angola. ${company.slogan}`
    : FALLBACK_DESCRIPTION;
  const ogImage = company?.logo || FALLBACK_OG_IMAGE;

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <html lang="pt" />
      {company.favicon && <link rel="icon" href={company.favicon} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company?.name || "IS KENDA"} />
      <meta property="og:locale" content="pt_AO" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={company?.fullName || "IS KENDA | Consultoria & Academia em Angola"} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={company?.fullName || "IS KENDA | Consultoria & Academia em Angola"} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}