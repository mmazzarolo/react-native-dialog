import React, { useMemo } from "react";
import { useColorScheme } from "react-native";

const useTheme = (__styles) => {
  const colorScheme = useColorScheme();

  const styles = useMemo(() => {
    return __styles(colorScheme === "dark");
  }, [colorScheme]);

  return { theme: colorScheme, styles };
};

export default useTheme;
