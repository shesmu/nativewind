import { match } from "css-mediaquery";
import { ColorSchemeName, Platform } from "react-native";

interface MatchAtRuleOptions {
  rule: string;
  params?: string;
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  scopedGroupHover?: boolean;
  scopedGroupActive?: boolean;
  scopedGroupFocus?: boolean;
  platform: typeof Platform.OS;
  colorScheme: ColorSchemeName;
  width: number;
  height: number;
  orientation: OrientationLockType;
}

export function matchAtRule({
  rule,
  params,
  hover,
  active,
  focus,
  scopedGroupHover,
  scopedGroupActive,
  scopedGroupFocus,
  platform,
  colorScheme,
  width,
  height,
  orientation,
}: MatchAtRuleOptions) {
  // eslint-disable-next-line unicorn/prefer-switch
  if (rule === "pseudo-class") {
    switch (params) {
      case "hover":
        return hover;
      case "focus":
        return focus;
      case "active":
        return active;
      default:
        return false;
    }
  } else if (rule === "scoped-group") {
    switch (params) {
      case "hover":
        return scopedGroupHover;
      case "focus":
        return scopedGroupFocus;
      case "active":
        return scopedGroupActive;
      default:
        return false;
    }
  } else if (rule === "media" && params) {
    return match(params, {
      "aspect-ratio": width / height,
      "device-aspect-ratio": width / height,
      type: platform,
      width,
      height,
      "device-width": width,
      "device-height": width,
      orientation,
      "prefers-color-scheme": colorScheme,
    });
  }

  return false;
}

export interface MatchChildAtRuleOptions {
  nthChild?: number;
  parentHover?: boolean;
  parentFocus?: boolean;
  parentActive?: boolean;
}

export function matchChildAtRule(
  rule: string,
  params = "",
  {
    nthChild = -1,
    parentHover = false,
    parentFocus = false,
    parentActive = false,
  }: MatchChildAtRuleOptions
) {
  if (
    rule === "selector" &&
    params === "(> *:not(:first-child))" &&
    nthChild > 1
  ) {
    return true;
  } else if (rule === "selector" && params === "(> *)") {
    return true;
  } else if (rule === "parent") {
    switch (params) {
      case "hover":
        return parentHover;
      case "focus":
        return parentFocus;
      case "active":
        return parentActive;
      default:
        return false;
    }
  }

  return false;
}
