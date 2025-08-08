'use client';
import React, { createContext } from "react";

export const ThemeContext = createContext();
export const useTheme = () => React.useContext(ThemeContext);