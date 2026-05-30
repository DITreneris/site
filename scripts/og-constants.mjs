/** Hand-maintained OG asset — keep og:image:alt in index.html in sync with OG.alt. */

export const OG = {
  /** Source PNG in public/ (edit this file to change the social preview). */
  sourceFile: 'og_2.png',
  siteUrl: 'https://promptanatomy.site',
  width: 1600,
  height: 900,
  alt: 'Prompt Anatomy — Structured AI for repeatable teams. Workflow from random prompt to logic layer, team workflow, and repeatable output. promptanatomy.site',
};

/** WhatsApp mobile may drop images above this size. */
export const OG_WARN_BYTES = 300 * 1024;

/** GitHub social preview recommended max (warn only for hand-maintained assets). */
export const OG_GITHUB_WARN_BYTES = 1024 * 1024;
