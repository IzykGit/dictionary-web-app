import { useState, useEffect } from "react"
import axios from 'axios'

import AOS from 'aos'
import "aos/dist/aos.css"

const App = () => {

    const [word, setWord] = useState({})
    const [wordQuery, setWordQuery] = useState("")

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/hello`)
                setWord(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchWord()
    }, [])

    console.log(word)

    return (
        <main>
            <p>Main</p>
        </main>
    )
}

export default App
