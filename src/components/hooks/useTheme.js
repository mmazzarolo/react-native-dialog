import React, { useMemo } from "react";
import { useColorScheme } from "react-native";

const useTheme = (__styles) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = useMemo(() => {
    return __styles(isDark);
  }, [colorScheme]);

  return { theme: colorScheme, isDark, styles };
};

export default useTheme;
