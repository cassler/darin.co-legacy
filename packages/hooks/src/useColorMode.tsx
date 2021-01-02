import React, { useEffect, useContext } from "react";
import useDarkMode, { HookStringBool } from "./useDarkMode";
import useLocalStorage from "./useLocalStorage";
import useMedia from "./useMedia";

// We want to clarify whick of the colors might be available.
export type Tint =
  | "indigo"
  | "orange"
  | "teal"
  | "blue"
  | "grape"
  | "violet"
  | "yellow"
  | "cyan"
  | "pink";
export const Tints = [
  "indigo",
  "orange",
  "teal",
  "blue",
  "grape",
  "violet",
  "yellow",
  "cyan",
  "pink",
];

export interface IColorContextProps {
  darkMode: boolean;
  tint: string;
  columns?: number;
  setColor?: Function;
  setDarkMode?: Function;
}

export const ColorContext = React.createContext<IColorContextProps>({
  darkMode: false,
  tint: "pink",
  columns: 2,
} as IColorContextProps);

export const useColorMode = (
  initialValue?: Tint
): [[string, (Tint) => void], HookStringBool] => {
  // Use whatever color is definied in the hook specifically
  const initialColor =
    typeof initialValue !== "undefined" ? initialValue : "blue";

  // Use our common hook to manage darkmode states
  const [darkMode, setDarkMode] = useDarkMode();

  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [localColor, setCurrentColor] = useLocalStorage(
    "localColor",
    initialColor
  );

  // If localColor is defined use it, otherwise fallback to default color.
  // This allows user to override OS level setting on our website.
  const currentColor =
    typeof localColor !== "undefined" ? localColor : initialColor;

  // Fire off effect now that we have Darkmode and colors
  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    const currentTheme = `${mode}-${currentColor}`;
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [darkMode, currentColor]);

  // Return currentColor state and setter
  return [
    [currentColor, setCurrentColor],
    [darkMode, setDarkMode],
  ];
};

export const ColorProvider: React.FC = (props): JSX.Element => {
  // This is a bit strange for an API because its actually layering
  // two different but interdependant hooks into a single function
  const [[tint, setColor], [darkMode, setDarkMode]] = useColorMode();

  // Watch our media hook to update these values easily.
  const columnCount = useMedia<number>(
    // Media queries
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    [5, 3, 2],
    // Default column count
    1
  );

  return (
    <ColorContext.Provider
      value={{
        darkMode,
        tint,
        columns: columnCount || 0,
        setDarkMode,
        setColor,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};

export const useColorProvider = () => useContext(ColorContext);

export default useColorMode;
