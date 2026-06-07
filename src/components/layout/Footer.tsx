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

  { label: 'Create — marketing', href: 'https://promptanatomy.space', external: true },

];



const NETWORK_LINKS: FooterLink[] = [

  { label: 'Hire — HR', href: 'https://promptanatomy.help', external: true },

  { label: 'Manage — leadership', href: 'https://promptanatomy.ceo', external: true },

  { label: 'Decide — scaling', href: 'https://promptanatomy.pro', external: true },

  { label: 'Deepen — knowledge hub', href: 'https://promptanatomy.blog', external: true },

  { label: 'Play — Corporate Ladder', href: 'https://promptanatomy.lol', external: true },

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

      <ul className="mt-3 space-y-0">

        {links.map((link) => (

          <li key={link.href}>

            <FooterLinkItem link={link} />

          </li>

        ))}

      </ul>

    </nav>

  );

}



function LegalSeparator() {

  return (

    <span className="opacity-50" aria-hidden="true">

      &middot;

    </span>

  );

}



function FooterLegalPrimary({ year }: { year: number }) {

  return (

    <nav

      className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-slate-500"

      aria-label="Legal"

    >

      <span>

        &copy; {year} {ORGANIZATION.name}

      </span>

      <LegalSeparator />

      <a href={`mailto:${ORGANIZATION.email}`} className="link-footer-meta">

        {ORGANIZATION.email}

      </a>

      {LEGAL_LINKS.map((link) => (

        <span key={link.href} className="contents">

          <LegalSeparator />

          <a

            href={link.href}

            target="_blank"

            rel="noreferrer"

            className="link-footer-meta"

          >

            {link.label}

          </a>

        </span>

      ))}

    </nav>

  );

}



function FooterLegalMeta() {

  const { address } = ORGANIZATION;

  const addressLine = `${address.street}, ${address.cityStateZip}, ${address.country}`;



  return (

    <p className="text-caption text-slate-400">

      <a

        href={AUTHOR.aboutUrl}

        target="_blank"

        rel="noreferrer"

        className="link-footer-meta text-slate-400 hover:text-brand-accent"

      >

        Founded by {AUTHOR.name}

      </a>

      <LegalSeparator />

      <address className="inline not-italic">{addressLine}</address>

    </p>

  );

}



export default function Footer() {

  const year = new Date().getFullYear();



  return (

    <footer className="footer-shell" role="contentinfo">

      <h2 className="sr-only">Site footer</h2>

      <div className="footer-accent-band" aria-hidden="true">

        <span className="block h-full w-14 bg-brand-accent" />

      </div>

      <div className="container-wide px-4 pb-10 pt-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">

          <div className="md:col-span-4">

            <div className="flex items-center gap-3">

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-dark">

                <Zap className="icon-md text-brand-accent" />

              </span>

              <span className="text-base font-extrabold tracking-tight text-brand-dark">

                Prompt Anatomy

              </span>

            </div>

            <div className="mt-4 max-w-xs space-y-1 text-sm leading-snug text-slate-600">

              <p className="font-semibold text-brand-dark">Less random prompting.</p>

              <p className="font-semibold text-brand-dark">More structured execution.</p>

              <p>AI workflows for modern teams.</p>

            </div>

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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <FooterColumn title="Platform & stages" links={PRODUCT_LINKS} />

              <FooterColumn title="Ecosystem network" links={NETWORK_LINKS} />

              <FooterColumn title="Contact & community" links={CONTACT_LINKS} />

            </div>

          </div>

        </div>



        <div className="mt-10 space-y-2 border-t border-border-footer pt-5">

          <FooterLegalPrimary year={year} />

          <FooterLegalMeta />

        </div>

      </div>

    </footer>

  );

}

