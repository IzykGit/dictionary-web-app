import { useState, useEffect, useRef } from "react"
import axios from 'axios'

import { FontProvider } from './context/FontContext';

import FontSelector from "./components/FontSelector";
import ModeSelector from "./components/ModeSelector";

import AOS from 'aos'
import "aos/dist/aos.css"



const App = () => {

    const [words, setWords] = useState([])
    const [wordQuery, setWordQuery] = useState("")

    const [inputError, setInputError] = useState(false)
    const [searchFail, setSearchFail] = useState(false)
    

    useEffect(() => {
        AOS.init({
            duration: 500
        })
    }, [])

    const fetchWord = async (event) => {
        event.preventDefault()

        if(wordQuery.length === 0) {
            setInputError(true)
            return;
        }

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordQuery}`)
            setWords(response.data)
        }
        catch (error) {
            console.log(error)
            setSearchFail(true)
        }
    }


    console.log(words)

    const audioRef = useRef()

    const playAudio = () => {
        if(audioRef.current) {
            audioRef.current.play()
        }
    }


    return (
        <>
        <FontProvider>
        <header className="header">
            <img src="/assets/images/logo.svg" alt="Dictionary"/>

            <div className="selectors">
                <FontSelector />
                <div className="selector-border"/>
                <ModeSelector />
            </div>
        </header>
        <main>
            <div className="form-container">
                <form onSubmit={fetchWord}>
                    <input className={inputError ? "form-input-error" : "form-input"} type="text"
                    placeholder="software" aria-label="Search Query" onChange={e => { setWordQuery(e.target.value); setInputError(false) }} />

                    <button type="sumit" aria-label="Search">
                        <img src="/assets/images/icon-search.svg" alt=""/>
                    </button>
                </form>

                {inputError && <p className="input-error">{`Whoops, can't be empty...`}</p>}
            </div>


            {words && (
            
                words.map((word, index) => (
                    <>
                    <section key={index} className="word-display" data-aos="fade-up">

                        <div className="found-word">
                            <h1>{word.word}</h1>
                            <p>{word.phonetics?.find(phonetic => phonetic?.text)?.text}</p>
                        </div>

                        <audio ref={audioRef} src={word.phonetics?.find(phonetic => phonetic?.audio)?.audio}></audio>
                        <button type="button" onClick={playAudio} className="play-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                            <g fill="#A445ED">
                                <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                                <path d="M29 27v21l21-10.5z"/>
                            </g>
                        </svg>
                        </button>
                    </section>
                    
                    {word.meanings.map((meaning, index) => (
                        <section key={index} className="part-of-speech"  data-aos="fade-up">
                            <h2>{meaning.partOfSpeech} <div className="line"></div></h2>

                            <h3>Meaning</h3>

                            <ul className="definition-list">
                                {meaning.definitions.map((definition, index) => (
                                    <>
                                    <li key={index}>{definition.definition}</li>
                                    {definition.example && ( <p className="example">{`"${definition.example}"`}</p> )}
                                    
                                    </>
                                ))}
                            </ul>
                            
                            {meaning.synonyms.length > 0 && (
                            <div className="synonyms">
                                <h3>Synonyms</h3>
                                {meaning.synonyms.map(synonym => (
                                    <>
                                    <p  key={synonym}>{synonym}</p>
                                    </>                                    
                                ))}
                            </div>
                            )}
                        </section>
                    ))}

                    <section className="url-section"  data-aos="fade-up">
                        <h4>Source</h4>
                        {word.sourceUrls.map(url => (
                            <a key={url} className="url" href={url} target="_blank">{url}</a>
                        ))}
                    </section>


                    </>
                ))
            )}

            {searchFail && (
                <section className="search-failure">
                    <h1>&#128533;</h1>
                    <h2>No Definitions Found</h2>

                    <p>{`Sorry pal, we couldn't find definitions for the word you were looking for. 
                    You can try the search again at later time or head to the web instead.`}</p>
                </section>
            )}

        </main>
        </FontProvider>
        </>
    )
}

export default App
