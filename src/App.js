import { Component } from 'react';
import './App.css';
import text from './text.json';

class App extends Component {

    constructor() {
        super();
        this.state = {
            text: null,
            mode: "paragraphs",
            paragraphs: text.length,
            words: 100
        }
    }

    componentDidMount() {
        this.changeText();
    }
    changeMode = (evt) => {
        this.setState({mode: evt.target.value})
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
                console.log(finalWords);
                let finalWordsJoin = finalWords.join(" ");
                if(finalWordsJoin.match(/[,;]$/)){
                    finalWordsJoin = finalWordsJoin.substring(0, finalWordsJoin.length - 1);
                }
                if(!finalWordsJoin.match(/[.?]$/)){
                    if(finalWordsJoin.match(/¿[^.]*$/)) {
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

    render() {
        return (
            <div>
                <h1>PerroFlautum</h1>
                <div>
                    <div>
                        <label>Modo: </label>
                        <select name="mode" onChange={this.changeMode} value={this.state.mode}>
                            <option value="paragraphs">Párrafos</option>
                            <option value="words">Palabras</option>
                        </select>
                    </div>
                    {
                        this.state.mode === "paragraphs" &&
                        <div>
                            <label htmlFor="paragraphs">Párrafos: </label>
                            <input type="number" name="paragraphs" value={this.state.paragraphs} onChange={this.changeParagraphs}/>
                        </div>
                    }
                    {
                        this.state.mode === "words" &&
                        <div>
                            <label htmlFor="words">Palabras: </label>
                            <input type="number" name="words" value={this.state.words} onChange={this.changeWords}/>
                        </div>
                    }
                    <button onClick={this.changeText}>Generar</button>
                </div>
                <div>
                    {
                        this.state.text != null && this.state.text.map((t, i) => <p key={i}>{t}</p>)
                    }
                </div>
            </div>
        );
    }
}

export default App;
