// TargetCRM Design Library — Core Type Definitions

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

export interface ColourTokens {
  background: string;
  color: string;
  borderColor: string;
}

export interface ShadowTokens {
  boxShadow: string;
}

export interface StyleTokens {
  boxModel: BoxModelTokens;
  typography: TypographyTokens;
  colours: ColourTokens;
  shadows: ShadowTokens;
  custom: Record<string, string>;
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

export const defaultColours: ColourTokens = {
  background: '',
  color: '',
  borderColor: '',
};

export const defaultShadows: ShadowTokens = {
  boxShadow: '',
};

export const defaultStyleTokens: StyleTokens = {
  boxModel: { ...defaultBoxModel },
  typography: { ...defaultTypography },
  colours: { ...defaultColours },
  shadows: { ...defaultShadows },
  custom: {},
};

export const emptyAppState: AppState = {
  sidebarItems: [],
  components: {},
  selectedItemId: null,
  selectedVariantId: null,
};
