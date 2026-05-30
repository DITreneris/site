import { Zap, ArrowRight } from 'lucide-react';
import {
  AUTHOR,
  LEGAL_LINKS,
  ORGANIZATION,
  SOCIAL_LINKS,
} from '../../data/siteContact';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const PRODUCT_LINKS: FooterLink[] = [
  { label: 'Main platform', href: 'https://promptanatomy.app', external: true },
  { label: 'Enter — onboarding', href: 'https://promptanatomy.cloud', external: true },
  { label: 'Use — daily automation', href: 'https://promptanatomy.info', external: true },
  { label: 'Upgrade — marketing', href: 'https://promptanatomy.space', external: true },
];

const NETWORK_LINKS: FooterLink[] = [
  { label: 'Recruit — HR', href: 'https://promptanatomy.help', external: true },
  { label: 'Manage — leadership', href: 'https://promptanatomy.ceo', external: true },
  { label: 'Decide — scaling', href: 'https://promptanatomy.pro', external: true },
  { label: 'Learn — knowledge hub', href: 'https://promptanatomy.blog', external: true },
];

const CONTACT_LINKS: FooterLink[] = [
  ...SOCIAL_LINKS.map((link) => ({ ...link, external: true })),
  {
    label: 'Email',
    href: `mailto:${ORGANIZATION.email}`,
    external: false,
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  return (
    <a
      href={link.href}
      {...(link.external
        ? { target: '_blank', rel: 'noreferrer' }
        : {})}
      className="link-footer"
    >
      {link.label}
    </a>
  );
}

function FooterColumn({
  title,
  links,
  ariaLabel,
}: {
  title: string;
  links: FooterLink[];
  ariaLabel?: string;
}) {
  return (
    <nav aria-label={ariaLabel ?? title}>
      <h3 className="text-label-upper text-slate-500">{title}</h3>
      <ul className="mt-4 space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLegalBar({ year }: { year: number }) {
  return (
    <nav
      className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-slate-500"
      aria-label="Legal"
    >
      <span>
        &copy; {year} {ORGANIZATION.name}
      </span>
      <span className="opacity-50" aria-hidden="true">
        &middot;
      </span>
      <a
        href={`mailto:${ORGANIZATION.email}`}
        className="link-footer"
      >
        {ORGANIZATION.email}
      </a>
      {LEGAL_LINKS.map((link) => (
        <span key={link.href} className="contents">
          <span className="opacity-50" aria-hidden="true">
            &middot;
          </span>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="link-footer"
          >
            {link.label}
          </a>
        </span>
      ))}
    </nav>
  );
}

function FooterFounder() {
  return (
    <p className="text-xs text-slate-500">
      <a
        href={AUTHOR.aboutUrl}
        target="_blank"
        rel="noreferrer"
        className="link-footer"
      >
        Founded by {AUTHOR.name}
      </a>
      <span className="text-slate-400"> — {AUTHOR.title}</span>
    </p>
  );
}

function FooterAddress() {
  const { address } = ORGANIZATION;
  return (
    <address className="not-italic text-xs leading-relaxed text-slate-500">
      {ORGANIZATION.name}
      <br />
      {address.street}
      <br />
      {address.cityStateZip}, {address.country}
    </address>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50" role="contentinfo">
      <h2 className="sr-only">Site footer</h2>
      <div className="container-wide px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-dark">
                <Zap className="icon-md text-brand-accent" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-brand-dark">
                Prompt Anatomy
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Less random prompting. More structured execution. The AI operating system that turns
              chat into repeatable team workflows.
            </p>
            <a
              href="https://promptanatomy.app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary-md mt-6"
            >
              Open the platform
              <ArrowRight className="icon-sm" />
            </a>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FooterColumn title="Platform & stages" links={PRODUCT_LINKS} />
              <FooterColumn title="Ecosystem network" links={NETWORK_LINKS} />
              <FooterColumn title="Contact & community" links={CONTACT_LINKS} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6">
          <FooterLegalBar year={year} />
          <FooterFounder />
          <FooterAddress />
        </div>
      </div>
    </footer>
  );
}
