import { useEffect, useRef, useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";
import { SmartIcon } from "./SmartIcon";

export default function Topbar() {
  const { company, socialLinks } = useSiteData();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current <= 0 || current < lastScrollY.current);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[60] h-9 bg-brand-dark border-b border-white/5 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5 text-[11px] text-slate-400">
          <a href={`tel:${company.phone}`} className="flex items-center gap-1.5 hover:text-brand-orange transition-colors whitespace-nowrap">
            <Phone className="h-3 w-3 shrink-0" />
            <span className="hidden sm:inline">{company.phone}</span>
          </a>

          <span className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-600">|</span>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Mail className="h-3 w-3" />
              <span>{company.email}</span>
            </a>
          </span>

          <span className="hidden lg:flex items-center gap-1.5">
            <span className="text-slate-600">|</span>
            <Clock className="h-3 w-3" />
            <span>{company.workingHours}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-brand-orange hover:bg-white/5 rounded-lg transition-all"
              aria-label={link.platform}
            >
              <SmartIcon name={link.icon} size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
