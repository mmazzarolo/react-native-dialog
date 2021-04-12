import React, { useMemo } from "react";
import { useColorScheme } from "react-native";

const useTheme = (buildStyles) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = useMemo(() => {
    return buildStyles(isDark);
  }, [buildStyles, isDark]);

  return { theme: colorScheme, isDark, styles };
};

export default useTheme;
