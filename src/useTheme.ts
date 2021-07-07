import { useMemo } from "react";
import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native";

export type StyleBuilder = (
  isDark: boolean,
  isVerticalButtons?: boolean
) => StyleSheet.NamedStyles<any>;

export interface UseTheme {
  theme: ColorSchemeName;
  isDark: boolean;
  styles: StyleSheet.NamedStyles<any>;
}

const useTheme = (buildStyles: StyleBuilder): UseTheme => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = useMemo(() => {
    return buildStyles(isDark);
  }, [buildStyles, isDark]);

  return { theme: colorScheme, isDark, styles };
};

export default useTheme;
