import React from "react";
import { Globe } from "lucide-react";

interface FooterProps {
  currentYear?: number;
  companyName?: string;
}

const Footer: React.FC<FooterProps> = ({
  currentYear = 2023,
  companyName = "Coursemedia, Inc.",
}) => {
  // Footer links organized in columns
  const footerLinks = [
    {
      links: [
        { text: "Coursemedia Business", href: "#" },
        { text: "Teach on Coursemedia", href: "#" },
        { text: "Get the app", href: "#" },
        { text: "About us", href: "#" },
        { text: "Contact us", href: "#" },
      ],
    },
    {
      links: [
        { text: "Careers", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Help and Support", href: "#" },
        { text: "Affiliate", href: "#" },
        { text: "Investors", href: "#" },
      ],
    },
    {
      links: [
        { text: "Terms", href: "#" },
        { text: "Privacy policy", href: "#" },
        { text: "Cookie settings", href: "#" },
        { text: "Sitemap", href: "#" },
        { text: "Accessibility statement", href: "#" },
      ],
    },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
  ];

  const [currentLanguage, setCurrentLanguage] = React.useState("English");

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer links section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-sm hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with logo, language selector and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-700">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">COURSEMEDIA</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Language selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 border border-white rounded-md text-sm">
                <Globe size={16} />
                <span>{currentLanguage}</span>
              </button>

              {/* Dropdown menu - in a real implementation, this would be shown/hidden on click */}
              <div className="hidden group-hover:block absolute bottom-full mb-1 right-0 bg-white text-black shadow-lg rounded-md w-40 py-1 z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.name)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Copyright information */}
            <div className="text-sm text-gray-300">
              © {currentYear} {companyName}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
