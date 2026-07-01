import Link from "next/link";
import { Zap, Mail, MessageCircle, Send } from "lucide-react";
import { footerLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer
      id="تواصل"
      className="relative mt-24 border-t border-border-soft/60 bg-secondary/40 backdrop-blur-sm"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Zap className="h-5 w-5 text-accent" />
            </span>
            <span className="text-lg font-extrabold">الدارات المنطقية</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            تعلم المنطق الرقمي بطريقة سهلة وحديثة.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-white">روابط سريعة</h4>
          <ul className="space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div id="تواصل-معنا">
          <h4 className="mb-4 text-sm font-bold text-white">تواصل معنا</h4>
          <p className="mb-4 text-sm text-muted">
            لديك سؤال أو اقتراح؟ يسعدنا تواصلك معنا.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Mail, label: "البريد" },
              { icon: Send, label: "تيليجرام" },
              { icon: MessageCircle, label: "واتساب" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border-soft bg-card/40 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border-soft/60">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-2 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} الدارات المنطقية — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
