import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import * as BabelCore from "@babel/core";

export type Babel = typeof BabelCore;

export type Style = ViewStyle | TextStyle | ImageStyle;
export type StyleRecord = Record<string, ViewStyle | TextStyle | ImageStyle>;
export type MediaRecord = Record<
  string,
  Array<{ media: string[]; suffix: number }>
>;

export interface TailwindReactNativeOptions {
  tailwindConfigPath?: string;
  platform?: "web" | "native" | "native-context" | "native-inline";
  allowedImports?: "*" | Array<string | RegExp>;
  deniedImports?: Array<string | RegExp>;
  rem?: number;
}

export type State = {
  get: (name: string) => any;
  set: (name: string, value: any) => any;
  opts: TailwindReactNativeOptions;
  file: BabelCore.BabelFile;
  filename: string;
};