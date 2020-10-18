import { useEffect } from 'react';
import useDarkMode from './useDarkMode';
import useLocalStorage from './useLocalStorage';

// We want to clarify whick of the colors might be available.
export type Tint =
	"indigo"|"orange"|"teal"|"blue"|"grape"|"violet"| "yellow"|"cyan"|"pink"



export const useColorMode = (initialValue?: Tint): [[string, (Tint) => void],[boolean, (boolean) => void]] => {

	// Use whatever color is definied in the hook specifically
	const initialColor = typeof initialValue !== 'undefined' ? initialValue : 'blue';

	// Use our common hook to manage darkmode states
	const [darkMode, setDarkMode] = useDarkMode();

	// Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
	const [localColor, setCurrentColor] = useLocalStorage(
		'localColor', initialColor
	)

	// If localColor is defined use it, otherwise fallback to default color.
  // This allows user to override OS level setting on our website.
	const currentColor =
  	typeof localColor !== 'undefined' ? localColor : initialColor;

	// Fire off effect now that we have Darkmode and colors
	useEffect(
		() => {
			const mode = darkMode ? "dark" : "light";
			const currentTheme = `${mode}-${currentColor}`;
			document.documentElement.setAttribute("data-theme", currentTheme);
		},
		[darkMode, currentColor]
	)

  // Return currentColor state and setter
  return [
		[currentColor, setCurrentColor],
		[darkMode, setDarkMode]
	]
}

export default useColorMode;


