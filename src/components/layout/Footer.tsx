import { ArrowRight } from 'lucide-react';

import {

  LEGAL_LINKS,

  ORGANIZATION,

  ENTITY_FOOTER_URL,

  execKitHref,

  kitHref,

  lessonHref,

  platformHref,

  SOCIAL_LINKS,

} from '../../data/siteContact';

import { trackEvent } from '../../utils/trackEvent';

import BrandLockup from '../shared/BrandLockup';



interface FooterLink {

  label: string;

  href: string;

  external?: boolean;

  domainId?: string;

  track?: 'platform' | 'kit';

}



const PRODUCT_LINKS: FooterLink[] = [

  { label: 'Main platform', href: platformHref('footer'), external: true, track: 'platform' },

  { label: 'Enter — onboarding', href: lessonHref('footer'), external: true, domainId: 'cloud', track: 'kit' },

  { label: 'Use — organization kit', href: kitHref('promptanatomy.info', 'footer'), external: true, domainId: 'info', track: 'kit' },

  { label: 'Create — marketing', href: kitHref('promptanatomy.space', 'footer'), external: true, domainId: 'space', track: 'kit' },

];



const NETWORK_LINKS: FooterLink[] = [

  { label: 'Hire — HR', href: kitHref('promptanatomy.help', 'footer'), external: true, domainId: 'help', track: 'kit' },

  { label: 'Manage — leadership', href: kitHref('promptanatomy.ceo', 'footer'), external: true, domainId: 'ceo', track: 'kit' },

  { label: 'Decide — executive kit', href: execKitHref('footer'), external: true, domainId: 'pro', track: 'kit' },

  { label: 'Deepen — knowledge hub', href: kitHref('promptanatomy.blog', 'footer'), external: true, domainId: 'blog', track: 'kit' },

  { label: 'Play — Corporate Ladder', href: kitHref('promptanatomy.lol', 'footer'), external: true, domainId: 'lol', track: 'kit' },

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

      onClick={() => {

        if (link.track === 'kit' && link.domainId) {

          trackEvent('kit_outbound', { domain: link.domainId, source: 'footer' });

        } else if (link.track === 'platform') {

          trackEvent('platform_outbound', { source: 'footer' });

        }

      }}

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

      <h3 className="text-label-upper text-muted">{title}</h3>

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

      className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted"

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

    <p className="text-caption text-subtle">

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

            <BrandLockup />

            <div className="mt-4 max-w-xs space-y-1 text-sm leading-snug text-body">

              <p className="font-semibold text-brand-dark">Less random prompting.</p>

              <p className="font-semibold text-brand-dark">More structured execution.</p>

              <p>AI workflows for modern teams.</p>

            </div>

            <a

              href={platformHref('footer')}

              target="_blank"

              rel="noreferrer"

              className="btn-primary-md mt-6"

              onClick={() => trackEvent('platform_outbound', { source: 'footer' })}

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

          <p className="text-caption text-muted">

            Part of Prompt Anatomy · Training &amp; checkout →{' '}

            <a

              href={ENTITY_FOOTER_URL}

              target="_blank"

              rel="noreferrer"

              className="link-footer-meta"

              onClick={() => trackEvent('entity_footer_click')}

            >

              promptanatomy.app

            </a>

          </p>

          <FooterLegalPrimary year={year} />

          <FooterLegalMeta />

        </div>

      </div>

    </footer>

  );

}

