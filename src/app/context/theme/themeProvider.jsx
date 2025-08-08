'use client';
import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

const ThemeProv = ({children}) => {

    const [theme, setTheme] = useState("light"); 

    const toggle = () => {
        setTheme((prev)=> prev === 'light'? 'dark': 'light');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
    localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggle}}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProv;