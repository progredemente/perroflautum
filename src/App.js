import React, { Component, createRef } from 'react';
import './App.css';
import text from './text.json';
import { Icon } from 'components/Icon';
import { AppsBar } from 'components/AppsBar';


class App extends Component {

    constructor() {
        super();
        this.state = {
            text: null,
            mode: "paragraphs",
            paragraphs: 3,
            words: 100
        }
        this.textRef = createRef();
    }

    componentDidMount() {
        this.changeText();
    }

    changeParagraphs = (evt) => {
        this.setState({paragraphs: evt.target.value});
    }

    changeWords = (evt) => {
        this.setState({words: evt.target.value});
    }

    changeText = () => {
        const originalText = text.sort((a, b) => 0.5 - Math.random());
        let finalText = [];
        switch(this.state.mode) {
            case "paragraphs":
                for(let i = 0; i < this.state.paragraphs; i++) {
                    finalText.push(originalText[i % originalText.length]);
                }
                break;
            case "words":
                const originalWords = originalText.join(" ").split(" ");
                let finalWords = [];
                let wordCount = this.state.words;
                while(wordCount > 0) {
                    const amountOfWordsToAdd = wordCount > originalWords.length ? originalWords.length : wordCount;
                    wordCount -= amountOfWordsToAdd;
                    finalWords.push(...originalWords.slice(0, amountOfWordsToAdd));
                }
                let finalWordsJoin = finalWords.join(" ");
                if(finalWordsJoin.match(/[,;]$/)){
                    finalWordsJoin = finalWordsJoin.substring(0, finalWordsJoin.length - 1);
                }
                if(!finalWordsJoin.match(/[.?]$/)){
                    if(finalWordsJoin.match(/¿[^.?]*$/)) {
                        finalWordsJoin += "?";
                    }
                    else {
                        finalWordsJoin += "."
                    }
                }
                finalText.push(finalWordsJoin)
                break;
            default: break;
        }
        this.setState({text: finalText})
    }

    copy = () => {
        navigator.clipboard.writeText(this.textRef.current.innerText);
    }

    render() {
        return (
            <AppsBar current='perroflautum'>
                <div className='app'>
                    <header>
                        <h1>
                            <div>PERRO FLAUTUM</div>
                            <div>El generador de lorem ipsum<br />en perroflautés</div>
                            <div>por <a href="/" target="_blank">progredemente</a><br />textos del canal de <a href="https://www.youtube.com/watch?v=W8b3_hI8Bic&list=PL-5YtFfXdaFRGdJmqlqztuXgXcVmGNIw-&index=2&ab_channel=FernandoD%C3%ADazVillanueva" target="_blank" rel="noreferrer noopener">FDV</a></div>
                            
                        </h1>
                    </header>
                    <div className="controls">
                        <div>
                            <label htmlFor="mode">Modo de generación:&nbsp;</label>
                            <div name="mode" className="mode">
                                <div className={this.state.mode === "paragraphs" ? "selected" : ""} onClick={() => { this.setState({mode: "paragraphs"})}}>Párrafos</div>
                                <div className={this.state.mode === "words" ? "selected" : ""} onClick={() => { this.setState({mode: "words"})}}>Palabras</div>
                            </div>
                        </div>
                        {
                            this.state.mode === "paragraphs" &&
                            <div>
                                <label htmlFor="paragraphs">Párrafos a generar:&nbsp;</label>
                                <input type="number" name="paragraphs" value={this.state.paragraphs} onChange={this.changeParagraphs}/>
                            </div>
                        }
                        {
                            this.state.mode === "words" &&
                            <div>
                                <label htmlFor="words">Palabras a generar:&nbsp;</label>
                                <input type="number" name="words" value={this.state.words} onChange={this.changeWords}/>
                            </div>
                        }
                        <div className="buttons">
                            <button onClick={this.changeText}>Generar</button>
                            <button onClick={this.copy}>Copiar&nbsp;<Icon icon="C"/></button>
                        </div>
                    </div>
                    <div>
                        <p ref={this.textRef} className="text">
                            <span className="errejon">
                                <img src={'./errejon.png'} alt="errejon"/>
                            </span>
                            {
                                this.state.text != null && this.state.text.map((t, i) => {
                                    return (
                                        <span key={i}>
                                            {t}
                                            { i < this.state.text.length - 1 && <><br /><br /></> }
                                        </span>
                                    );
                                })
                            }
                        </p>
                    </div>
                </div>
            </AppsBar>
        );
    }
}

export default App;
