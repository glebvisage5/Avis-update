import React, { useState, useEffect } from 'react';
import style from './LaTeX.module.css';
import ButtonConfig from './ButtonConfig.json';

export default function LaTeX() {
    const [latex, setLatex] = useState('');
    const [savedFormula, setSavedFormula] = useState(null);
    const [buttons, setButtons] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        setButtons(ButtonConfig);

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "formulaPreview"]);
        }
    }, [latex]);

    const handleInputChange = (e) => {
        setLatex(e.target.value);
    };

    const insertText = (text) => {
        setLatex((prevLatex) => prevLatex + text);
    };

    const saveFormula = () => {
        setSavedFormula(latex);
        // console.log('Формула сохранена:', latex);
    };

    const toggleCategory = (category) => {
        if (activeCategory === category) {
            setActiveCategory(null);
        } else {
            setActiveCategory(category);
        }
    };

    const renderButtons = () => {
        return buttons.map((category, index) => (
            <div key={index} className={style.buttonCategory}>
                <div
                    className={`${style.categoryTitle} ${activeCategory === category.title ? style.activeCategory : ''}`}
                    onClick={() => toggleCategory(category.title)}
                >
                    {category.title}
                </div>
    
                {activeCategory === category.title && (
                    <div className={style.buttonContainer}>
                        {category.buttons.map((button, btnIndex) => (
                            <button
                                key={btnIndex}
                                className={style.button}
                                onClick={() => insertText(button.code)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        ));
    };    

    return (
        <>
            <section className={style.LaTeX}>
                <div className={style.LaTeXAll}>
                    <h1>LaTeX Formula Editor</h1>
                    <p>Введите LaTeX формулу в текстовом поле ниже или используйте кнопки для вставки математических выражений:</p>

                    <div className={style.Forms}>
                        <label className={style.Label} htmlFor="formulaEditor">Редактор формул LaTeX</label>
                        <textarea
                            className={style.TextArea}
                            id="formulaEditor"
                            value={latex}
                            onChange={handleInputChange}
                            placeholder="Введите ваш LaTeX код здесь..."
                        ></textarea>

                        <label className={style.Label} htmlFor="formulaPreview">Визуализация формулы LaTeX</label>
                        <div id="formulaPreview" className={style.TextArea}>
                            <span dangerouslySetInnerHTML={{ __html: `\\(${latex}\\)` }} />
                        </div>
                    </div>

                    <button className={style.Save} onClick={saveFormula}>Сохранить формулу</button>

                    <div className={style.Button}>{renderButtons()}</div>
                </div>
            </section>
        </>
    );
}
