import './globals.css';
import MetaPixel from '../components/MetaPixel';

export const metadata = {
  title: 'Epoxy Flooring Dubai & UAE | DC-EPOXY',
  description: 'Premium epoxy flooring for garages, showrooms, and industrial spaces in Dubai and the UAE.',
};

export default function RootLayout({ children }) {

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DC-EPOXY Dubai",
    "image": "https://www.dc-epoxy.com/images/dc-epoxy-hero.jpg",
    "@id": "https://www.dc-epoxy.com",
    "url": "https://www.dc-epoxy.com",
    "telephone": "+971501234567",
    "email": "info@dc-epoxy.com",
    "priceRange": "AED",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "description": "Premium epoxy flooring contractor in Dubai offering garage flake epoxy coatings, reflective metallic epoxy, and industrial resin floor systems across the UAE.",
    "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
    "sameAs": [
      "https://www.instagram.com/dc_epoxy_/"
    ]
  };

  return (

    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
