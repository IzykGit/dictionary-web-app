import { useContext, useState } from 'react';
import { FontContext } from '../context/FontContext'

import { motion } from "framer-motion"

const FontSelector = () => {

    const { setFontFamily, fontFamily } = useContext(FontContext);

    const [dropDown, setDropDown] = useState(false)
    const [currentFont, setCurrentFont] = useState("Sans-Serif")

    const fontStyle = {
       fontFamily: fontFamily
    }

    const dropVariants = {
        open: { 
            opacity: 1,
            visibility: "visible",
            transition: { duration: 0.2 }
        },
        hidden: { 
            opacity: 0,
            visibility: "hidden",
            transition: { duration: 0.2 }
        }
    }

    return (
        <>
        <div role='select' className="selector_selector" onClick={() => setDropDown(!dropDown)}>
            <p style={fontStyle}>{currentFont}</p>
            <img src='/assets/images/icon-arrow-down.svg' alt='' className={!dropDown ? "selector_img" : "selector_img_rotate" }/>
        </div>
        <motion.div className="selector_dropDown" animate={dropDown ? "open" : "hidden" } variants={dropVariants}>

            <p onClick={() => { setFontFamily('Sans-Serif'); setCurrentFont('Sans-Serif'); setDropDown(!dropDown) }} style={{fontFamily: "sans-serif"}}>Sans Serif</p>
            <p onClick={() => { setFontFamily('Serif'); setCurrentFont('Serif'); setDropDown(!dropDown) }} style={{fontFamily: "serif"}}>Serif</p>
            <p onClick={() => { setFontFamily('Monospace'); setCurrentFont('Monospace'); setDropDown(!dropDown) }} style={{fontFamily: "monospace"}}>Mono</p>

        </motion.div>
        </>

    );
};

export default FontSelector;