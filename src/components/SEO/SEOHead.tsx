import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  structuredData?: object;
  lastUpdated?: string;
}

export const SEOHead = ({ title, description, keywords, canonical, structuredData, lastUpdated }: SEOHeadProps) => {
  const keywordsContent = keywords
    ? (Array.isArray(keywords) ? keywords.join(', ') : keywords)
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsContent && <meta name="keywords" content={keywordsContent} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {lastUpdated && <meta name="revised" content={lastUpdated} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
