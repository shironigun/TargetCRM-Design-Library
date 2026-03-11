// TargetCRM Design Library — Core Type Definitions

import { nanoid } from 'nanoid';

// ─── Style Tokens ─────────────────────────────────────────────────────────────

export interface BoxModelTokens {
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  borderRadius: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  textTransform: string;
}

/** A single labelled colour entry — unlimited per component */
export interface ColourEntry {
  id: string;
  label: string;   // e.g. "Background", "Icon Active", "Border Hover"
  value: string;    // e.g. "#ff0000", "rgba(0,0,0,0.5)", "transparent"
}

export interface ShadowTokens {
  boxShadow: string;
}

/** A labelled group of tokens of type T */
export interface TokenGroup<T> {
  id: string;
  label: string;   // user-defined, e.g. "Outer Chip", "Inner Chip"
  tokens: T;
}

/**
 * Style tokens — multi-group model.
 * Each category supports multiple user-labelled groups
 * (e.g. "Inner Chip Box Model", "Outer Chip Box Model").
 * Colours are an unbounded list of labelled entries.
 */
export interface StyleTokens {
  boxModels: TokenGroup<BoxModelTokens>[];
  typographies: TokenGroup<TypographyTokens>[];
  colours: ColourEntry[];
  shadows: ShadowTokens;
  customs: TokenGroup<Record<string, string>>[];
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export interface Variant {
  id: string;
  name: string;
  type: 'svg' | 'code';
  source: string;        // SVGR output or user JSX/TSX code
  svgOriginal?: string;  // Raw SVG markup (only for type: 'svg')
}

// ─── Components ───────────────────────────────────────────────────────────────

export interface ComponentDef {
  id: string;
  name: string;
  description: string;
  styleTokens: StyleTokens;
  variants: Variant[];
  createdAt: string;  // ISO timestamp
  updatedAt: string;  // ISO timestamp
}

// ─── Sidebar Navigation ──────────────────────────────────────────────────────

export interface SidebarItem {
  id: string;
  label: string;
  parentId: string | null;
  order: number;
  componentId: string | null;
}

// ─── Application State ───────────────────────────────────────────────────────

export interface AppState {
  sidebarItems: SidebarItem[];
  components: Record<string, ComponentDef>;
  selectedItemId: string | null;
  selectedVariantId: string | null;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const defaultBoxModel: BoxModelTokens = {
  width: '',
  height: '',
  minWidth: '',
  maxWidth: '',
  minHeight: '',
  maxHeight: '',
  marginTop: '',
  marginRight: '',
  marginBottom: '',
  marginLeft: '',
  paddingTop: '',
  paddingRight: '',
  paddingBottom: '',
  paddingLeft: '',
  borderRadius: '',
};

export const defaultTypography: TypographyTokens = {
  fontFamily: '',
  fontWeight: '',
  fontSize: '',
  lineHeight: '',
  letterSpacing: '',
  textTransform: '',
};

export const defaultShadows: ShadowTokens = {
  boxShadow: '',
};

export const defaultStyleTokens: StyleTokens = {
  boxModels: [],
  typographies: [],
  colours: [],
  shadows: { ...defaultShadows },
  customs: [],
};

export const emptyAppState: AppState = {
  sidebarItems: [],
  components: {},
  selectedItemId: null,
  selectedVariantId: null,
};

// ─── Migration: v1 (flat single-group) → v2 (multi-group) ───────────────────

/** Migrate old flat StyleTokens to the new multi-group shape */
export function migrateStyleTokens(raw: unknown): StyleTokens {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = raw as any;
  if (!t || typeof t !== 'object') return { ...defaultStyleTokens };

  // Already new format? — still fill in any missing fields defensively
  if (Array.isArray(t.boxModels)) {
    return {
      boxModels: t.boxModels ?? [],
      typographies: t.typographies ?? [],
      colours: t.colours ?? [],
      shadows: t.shadows ?? { ...defaultShadows },
      customs: t.customs ?? [],
    };
  }

  // Old format migration
  const boxModels: TokenGroup<BoxModelTokens>[] = [];
  if (t.boxModel && Object.values(t.boxModel).some((v: unknown) => !!v)) {
    boxModels.push({ id: nanoid(), label: 'Default', tokens: { ...defaultBoxModel, ...t.boxModel } });
  }

  const typographies: TokenGroup<TypographyTokens>[] = [];
  if (t.typography && Object.values(t.typography).some((v: unknown) => !!v)) {
    typographies.push({ id: nanoid(), label: 'Default', tokens: { ...defaultTypography, ...t.typography } });
  }

  const colours: ColourEntry[] = [];
  if (t.colours) {
    if (t.colours.background) colours.push({ id: nanoid(), label: 'Background', value: t.colours.background });
    if (t.colours.color) colours.push({ id: nanoid(), label: 'Text Color', value: t.colours.color });
    if (t.colours.borderColor) colours.push({ id: nanoid(), label: 'Border Color', value: t.colours.borderColor });
  }

  const shadows: ShadowTokens = t.shadows ?? { ...defaultShadows };

  const customs: TokenGroup<Record<string, string>>[] = [];
  if (t.custom && Object.keys(t.custom).length > 0) {
    customs.push({ id: nanoid(), label: 'Custom', tokens: { ...t.custom } });
  }

  return { boxModels, typographies, colours, shadows, customs };
}

/** Migrate an entire ComponentDef (mutates in place for performance) */
export function migrateComponentDef(comp: ComponentDef): ComponentDef {
  comp.styleTokens = migrateStyleTokens(comp.styleTokens);
  return comp;
}
