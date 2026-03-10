// TargetCRM Design System — .NET MAUI + Syncfusion Token Mapping
// Maps canonical design tokens to Syncfusion MAUI theme key names
// and provides XAML ResourceDictionary templates for documentation.

import { colors, borderRadius } from './tokens';

// ─── Syncfusion Theme Key → Token Mapping ─────────────────────────────────────

export const syncfusionKeys = {
  // SfButton
  SfButtonNormalBackground:       colors.primary.main,
  SfButtonNormalTextColor:        colors.primary.contrastText,
  SfButtonNormalStroke:           colors.primary.main,
  SfButtonHoverBackground:       colors.primary.hover,
  SfButtonHoverTextColor:        colors.primary.contrastText,
  SfButtonPressedBackground:     colors.primary.dark,
  SfButtonPressedTextColor:      colors.primary.contrastText,
  SfButtonDisabledBackground:    colors.neutral[300],
  SfButtonDisabledTextColor:     colors.text.inverse,

  // SfCalendar
  SfCalendarSelectionColor:          colors.primary.main,
  SfCalendarTodayHighlightColor:     colors.primary.main,
  SfCalendarNavigationArrowColor:    colors.neutral[300],
  SfCalendarDisabledDatesTextColor:  colors.neutral[500],
  SfCalendarHeaderTextColor:         colors.text.primary,
  SfCalendarDatesTextColor:          colors.neutral[500],
  SfCalendarSelectionTextColor:      colors.text.inverse,

  // SfChat
  SfChatOutgoingMessageBackground:   colors.messenger.main,
  SfChatOutgoingMessageTextColor:    colors.messenger.contrastText,
  SfChatIncomingMessageBackground:   colors.background.default,
  SfChatIncomingMessageTextColor:    colors.text.primary,
  SfChatTimestampTextColor:          colors.text.secondary,
  SfChatEditorStrokeColor:           colors.neutral[200],
  SfChatEditorFocusedStrokeColor:    colors.primary.main,

  // SfChips
  SfChipNormalBackground:        colors.neutral[100],
  SfChipNormalTextColor:         colors.text.primary,
  SfChipSelectedBackground:      colors.primary.main,
  SfChipSelectedTextColor:       colors.primary.contrastText,
  SfChipOutlineStroke:           colors.neutral[300],

  // SfTextInputLayout
  SfTextInputLayoutStrokeColor:          colors.neutral[200],
  SfTextInputLayoutFocusedStrokeColor:   colors.primary.main,
  SfTextInputLayoutErrorStrokeColor:     colors.error.main,
  SfTextInputLayoutDisabledStrokeColor:  colors.neutral[300],
  SfTextInputLayoutHelperTextColor:      colors.text.secondary,
  SfTextInputLayoutErrorTextColor:       colors.error.main,

  // SfPopup
  SfPopupNormalBackground:       colors.background.default,
  SfPopupHeaderBackground:       colors.primary.main,
  SfPopupHeaderTextColor:        colors.primary.contrastText,
  SfPopupOverlayBackground:      colors.background.overlay,

  // SfTabView
  SfTabViewSelectionIndicatorColor:  colors.primary.main,
  SfTabViewNormalTextColor:          colors.text.secondary,
  SfTabViewSelectedTextColor:        colors.primary.main,

  // SfListView
  SfListViewSelectionBackground:     colors.info.background,
  SfListViewNormalTextColor:         colors.text.primary,
  SfListViewSecondaryTextColor:      colors.text.secondary,

  // SfBadge
  SfBadgeNormalBackground:       colors.badge.main,
  SfBadgeNormalTextColor:        colors.badge.contrastText,

  // SfDataGrid
  SfDataGridHeaderBackground:    colors.neutral[50],
  SfDataGridHeaderTextColor:     colors.text.primary,
  SfDataGridNormalTextColor:     colors.text.primary,
  SfDataGridSelectionBackground: colors.info.background,
  SfDataGridBorderColor:         colors.neutral[200],
} as const;

// ─── XAML ResourceDictionary Template ─────────────────────────────────────────

export const xamlThemeTemplate = `<?xml version="1.0" encoding="utf-8" ?>
<ResourceDictionary xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml">

    <!-- TargetCRM Design System — MAUI Theme -->
    <!-- Generated from canonical design tokens -->

    <!-- ─── Core Brand Colors ───────────────────────────── -->
    <Color x:Key="PrimaryColor">${colors.primary.main}</Color>
    <Color x:Key="PrimaryHoverColor">${colors.primary.hover}</Color>
    <Color x:Key="PrimaryFocusColor">${colors.primary.focus}</Color>
    <Color x:Key="SecondaryColor">${colors.secondary.main}</Color>

    <!-- ─── Semantic Status Colors ──────────────────────── -->
    <Color x:Key="ErrorColor">${colors.error.main}</Color>
    <Color x:Key="ErrorBackgroundColor">${colors.error.background}</Color>
    <Color x:Key="WarningColor">${colors.warning.main}</Color>
    <Color x:Key="WarningBackgroundColor">${colors.warning.background}</Color>
    <Color x:Key="InfoColor">${colors.info.main}</Color>
    <Color x:Key="InfoBackgroundColor">${colors.info.background}</Color>
    <Color x:Key="SuccessColor">${colors.success.main}</Color>
    <Color x:Key="SuccessBackgroundColor">${colors.success.background}</Color>

    <!-- ─── Custom / Brand Colors ───────────────────────── -->
    <Color x:Key="MessengerColor">${colors.messenger.main}</Color>
    <Color x:Key="FacebookColor">${colors.facebook.main}</Color>
    <Color x:Key="BrandGoldColor">${colors.brand.gold}</Color>
    <Color x:Key="BrandNavyColor">${colors.brand.navy}</Color>
    <Color x:Key="BadgeColor">${colors.badge.main}</Color>

    <!-- ─── Neutral Scale ───────────────────────────────── -->
    <Color x:Key="Neutral900">${colors.neutral[900]}</Color>
    <Color x:Key="Neutral600">${colors.neutral[600]}</Color>
    <Color x:Key="Neutral500">${colors.neutral[500]}</Color>
    <Color x:Key="Neutral300">${colors.neutral[300]}</Color>
    <Color x:Key="Neutral200">${colors.neutral[200]}</Color>
    <Color x:Key="Neutral100">${colors.neutral[100]}</Color>
    <Color x:Key="Neutral50">${colors.neutral[50]}</Color>
    <Color x:Key="White">#FFFFFF</Color>

    <!-- ─── Text Colors ─────────────────────────────────── -->
    <Color x:Key="PrimaryTextColor">${colors.text.primary}</Color>
    <Color x:Key="SecondaryTextColor">${colors.text.secondary}</Color>
    <Color x:Key="DisabledTextColor">${colors.text.disabled}</Color>
    <Color x:Key="InverseTextColor">${colors.text.inverse}</Color>

    <!-- ─── Background Colors ───────────────────────────── -->
    <Color x:Key="PageBackgroundColor">${colors.background.default}</Color>
    <Color x:Key="SurfaceColor">${colors.background.paper}</Color>
    <Color x:Key="NeutralBackgroundColor">${colors.background.neutral}</Color>
    <Color x:Key="OverlayColor">${colors.background.overlay}</Color>

    <!-- ─── Corner Radius ───────────────────────────────── -->
    <CornerRadius x:Key="RadiusNone">0</CornerRadius>
    <CornerRadius x:Key="RadiusXs">${borderRadius.xs}</CornerRadius>
    <CornerRadius x:Key="RadiusSm">${borderRadius.sm}</CornerRadius>
    <CornerRadius x:Key="RadiusMd">${borderRadius.md}</CornerRadius>
    <CornerRadius x:Key="RadiusDefault">${borderRadius.default}</CornerRadius>
    <CornerRadius x:Key="RadiusLg">${borderRadius.lg}</CornerRadius>
    <CornerRadius x:Key="RadiusXl">${borderRadius.xl}</CornerRadius>
    <CornerRadius x:Key="RadiusPill">${borderRadius.pill}</CornerRadius>
    <CornerRadius x:Key="RadiusFab">${borderRadius.fab}</CornerRadius>

    <!-- ─── Syncfusion Theme Key Overrides ──────────────── -->

    <!-- SfButton -->
    <Color x:Key="SfButtonNormalBackground">{DynamicResource PrimaryColor}</Color>
    <Color x:Key="SfButtonNormalTextColor">{DynamicResource InverseTextColor}</Color>
    <Color x:Key="SfButtonHoverBackground">{DynamicResource PrimaryHoverColor}</Color>
    <Color x:Key="SfButtonDisabledBackground">{DynamicResource Neutral300}</Color>

    <!-- SfCalendar -->
    <Color x:Key="SfCalendarSelectionColor">{DynamicResource PrimaryColor}</Color>
    <Color x:Key="SfCalendarTodayHighlightColor">{DynamicResource PrimaryColor}</Color>

    <!-- SfChat -->
    <Color x:Key="SfChatOutgoingMessageBackground">{DynamicResource MessengerColor}</Color>
    <Color x:Key="SfChatOutgoingMessageTextColor">{DynamicResource InverseTextColor}</Color>
    <Color x:Key="SfChatIncomingMessageBackground">{DynamicResource White}</Color>
    <Color x:Key="SfChatIncomingMessageTextColor">{DynamicResource PrimaryTextColor}</Color>

    <!-- SfChips -->
    <Color x:Key="SfChipNormalBackground">{DynamicResource Neutral100}</Color>
    <Color x:Key="SfChipSelectedBackground">{DynamicResource PrimaryColor}</Color>

    <!-- SfTextInputLayout -->
    <Color x:Key="SfTextInputLayoutStrokeColor">{DynamicResource Neutral200}</Color>
    <Color x:Key="SfTextInputLayoutFocusedStrokeColor">{DynamicResource PrimaryColor}</Color>
    <Color x:Key="SfTextInputLayoutErrorStrokeColor">{DynamicResource ErrorColor}</Color>

    <!-- SfTabView -->
    <Color x:Key="SfTabViewSelectionIndicatorColor">{DynamicResource PrimaryColor}</Color>

    <!-- SfListView -->
    <Color x:Key="SfListViewSelectionBackground">{DynamicResource InfoBackgroundColor}</Color>

    <!-- ─── Typography Styles ───────────────────────────── -->
    <Style TargetType="Label" x:Key="Heading1">
        <Setter Property="FontSize" Value="32" />
        <Setter Property="FontAttributes" Value="Bold" />
        <Setter Property="TextColor" Value="{DynamicResource PrimaryTextColor}" />
    </Style>

    <Style TargetType="Label" x:Key="Heading2">
        <Setter Property="FontSize" Value="28" />
        <Setter Property="FontAttributes" Value="Bold" />
        <Setter Property="TextColor" Value="{DynamicResource PrimaryTextColor}" />
    </Style>

    <Style TargetType="Label" x:Key="Body1">
        <Setter Property="FontSize" Value="14" />
        <Setter Property="TextColor" Value="{DynamicResource PrimaryTextColor}" />
    </Style>

    <Style TargetType="Label" x:Key="Caption">
        <Setter Property="FontSize" Value="12" />
        <Setter Property="TextColor" Value="{DynamicResource SecondaryTextColor}" />
    </Style>

</ResourceDictionary>`;

// ─── XAML snippets for doc pages ──────────────────────────────────────────────

export const xamlSnippets = {
  button: `<syncfusion:SfButton Text="Action"
    Background="{DynamicResource PrimaryColor}"
    TextColor="{DynamicResource InverseTextColor}"
    CornerRadius="{DynamicResource RadiusDefault}"
    HeightRequest="36" />`,

  buttonOutlined: `<syncfusion:SfButton Text="Action"
    Background="Transparent"
    TextColor="{DynamicResource PrimaryColor}"
    Stroke="{DynamicResource PrimaryColor}"
    CornerRadius="{DynamicResource RadiusMd}"
    HeightRequest="39" />`,

  textInput: `<syncfusion:SfTextInputLayout Hint="Label"
    Stroke="{DynamicResource Neutral200}"
    FocusedStroke="{DynamicResource PrimaryColor}"
    ErrorStroke="{DynamicResource ErrorColor}"
    ContainerType="Outlined"
    CornerRadius="{DynamicResource RadiusMd}">
    <Entry />
</syncfusion:SfTextInputLayout>`,

  chip: `<syncfusion:SfChipGroup>
    <syncfusion:SfChip Text="Default"
        Background="{DynamicResource Neutral100}"
        TextColor="{DynamicResource PrimaryTextColor}" />
    <syncfusion:SfChip Text="Selected"
        Background="{DynamicResource PrimaryColor}"
        TextColor="{DynamicResource InverseTextColor}" />
</syncfusion:SfChipGroup>`,

  calendar: `<syncfusion:SfCalendar
    SelectionColor="{DynamicResource PrimaryColor}"
    TodayHighlightColor="{DynamicResource PrimaryColor}"
    NavigationArrowColor="{DynamicResource Neutral300}" />`,

  chat: `<syncfusion:SfChat
    OutgoingMessageBackground="{DynamicResource MessengerColor}"
    OutgoingMessageTextColor="{DynamicResource InverseTextColor}"
    IncomingMessageBackground="{DynamicResource White}"
    IncomingMessageTextColor="{DynamicResource PrimaryTextColor}"
    TimestampTextColor="{DynamicResource SecondaryTextColor}" />`,

  alert: `<!-- Info Alert -->
<Frame BackgroundColor="{DynamicResource InfoBackgroundColor}"
       CornerRadius="{DynamicResource RadiusMd}"
       Padding="16">
    <HorizontalStackLayout Spacing="8">
        <Image Source="info_icon.png"
               WidthRequest="20" HeightRequest="20"
               TintColor="{DynamicResource InfoColor}" />
        <Label Text="This is an info message."
               Style="{DynamicResource Body1}" />
    </HorizontalStackLayout>
</Frame>`,

  snackbar: `<syncfusion:SfPopup
    IsOpen="{Binding ShowSnackbar}"
    ShowOverlayAlways="False"
    AppearanceMode="OneButton"
    AcceptButtonText="Dismiss">
    <syncfusion:SfPopup.ContentTemplate>
        <DataTemplate>
            <Label Text="Action completed successfully."
                   Style="{DynamicResource Body1}"
                   TextColor="{DynamicResource InverseTextColor}" />
        </DataTemplate>
    </syncfusion:SfPopup.ContentTemplate>
</syncfusion:SfPopup>`,
} as const;
