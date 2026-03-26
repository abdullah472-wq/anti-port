import Link from "next/link";
import { Code2, Github, Linkedin, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { NAV_ITEMS, PERSONAL_INFO, CONTACT_INFO } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 md:gap-4 group w-fit">
              <img 
                src="/COD_BOT.png" 
                alt="Logo" 
                className="w-10 h-10 md:w-16 md:h-16 object-contain"
              />
              <img 
                src="/animation/COD_BOT.gif" 
                alt="COD_BOT" 
                className="h-8 md:h-12 object-contain mix-blend-multiply hidden sm:block"
              />
            </Link>
            <p className="text-content-secondary text-sm leading-relaxed max-w-xs">
              {PERSONAL_INFO.title}. {PERSONAL_INFO.tagline}
            </p>
            <div className="flex items-start gap-3 text-content-secondary text-sm">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-content-secondary hover:text-primary transition-colors text-sm w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-lg">Contact Me</h4>
            <div className="flex flex-col gap-4">
              <Link href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-content-secondary hover:text-primary transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>{CONTACT_INFO.email}</span>
              </Link>
              <Link href={CONTACT_INFO.whatsappLink} className="flex items-center gap-3 text-content-secondary hover:text-primary transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                  <Phone className="w-4 h-4 text-neon" />
                </div>
                <span>{CONTACT_INFO.whatsapp}</span>
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-lg">Follow Me</h4>
            <p className="text-content-secondary text-sm">Let&apos;s connect on social media and build something amazing together.</p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: PERSONAL_INFO.github, color: "hover:text-white" },
                { icon: Linkedin, href: PERSONAL_INFO.linkedin, color: "hover:text-blue-400" },
                { icon: Facebook, href: PERSONAL_INFO.facebook, color: "hover:text-blue-600" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-surface flex items-center justify-center text-content-secondary transition-all hover:scale-110 hover:shadow-lg ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-content-secondary">
          <p>© 2024 {PERSONAL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
