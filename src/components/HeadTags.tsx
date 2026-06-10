import { Helmet } from "react-helmet-async";
import { useSiteData } from "../contexts/SiteDataContext";

export default function HeadTags() {
  const { company } = useSiteData();

  return (
    <Helmet>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="IS KENDA CONSULTORIA & ACADEMIA — Soluções empresariais para o crescimento do seu negócio em Angola." />
      <html lang="pt" />
      {company.favicon && <link rel="icon" href={company.favicon} />}
    </Helmet>
  );
}
