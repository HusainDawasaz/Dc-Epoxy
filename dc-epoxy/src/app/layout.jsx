import './globals.css';
import MetaPixel from '../components/MetaPixel';

export const metadata = {
  title: 'Epoxy Flooring Dubai & UAE | DC-EPOXY',
  description: 'Premium epoxy flooring for garages, showrooms, and industrial spaces in Dubai and the UAE.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
