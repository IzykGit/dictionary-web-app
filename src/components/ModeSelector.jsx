import { useEffect, useState } from "react";

import { motion } from "framer-motion"

const ModeSelector = () => {

    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const link = document.getElementById('theme-style');
        link.href = `${theme}.css`;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

        if(theme === "light") {
            document.body.style.backgroundColor = "black";
        }
        else {
            document.body.style.backgroundColor = "white";
        }
    };

    const indicator = {
        light: { x: 0, transition: { duration: 0.2, delay: 0 } }, 
        dark: { x: 16, transition: { duration: 0.2, delay: 0 } }   
    }
    return (
        <div className="theme_indicator">
            <motion.button onClick={toggleTheme} className={theme === "light" ? "theme_button" : "theme_button_dark"} >
                <motion.div variants={indicator} animate={theme}/>
            </motion.button>


            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                <path fill="none" stroke="" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/>
            </svg>
        </div>

    )
}

export default ModeSelector