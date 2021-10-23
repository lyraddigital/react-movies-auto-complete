import { useState, useEffect } from 'react';

import style from './AutoComplete.module.scss';

export const AutoComplete = ({ asyncFn, minSearchLength, responseMapper, ResultsComponent, onSelect }) => {
    const [showResults, setShowResults] = useState(false);
    const [response, setResponse] = useState();
    const [input, setInput] = useState('');

    useEffect(() => {
        if (asyncFn && input && input.length >= minSearchLength) {
            asyncFn(input).then((asyncResponse) => {
                setShowResults(true);
                setResponse(asyncResponse);
            });
        } else if (input?.length < minSearchLength) {
            setShowResults(false);
            setResponse(undefined);
        }     
    }, [asyncFn, input, minSearchLength]);

    useEffect(() => {
        if (showResults) {
            document.addEventListener('click', hideResults);
            return () => { document.removeEventListener('click', hideResults); }
        }        
    }, [showResults]);

    const changeInput = (e) => {
        setInput(e.target.value);
    };

    const clearInput = () => {
        setInput('');
    };

    const hideResults = () => {        
        setShowResults(false);
    };

    const selectItem = (result) => {
        if (onSelect) {
            onSelect(result);
        }

        setInput('');
        setShowResults(false);
        setResponse(undefined);
    };

    let resultsEl = null;

    if (ResultsComponent && responseMapper && response && showResults) {
        const results = responseMapper(response);        
        
        if (results.length > 0) {
            resultsEl = (
                <ul className={ style.movieList }>
                    { results.map((r, i) => (
                        <li key={i} className={ style.movieListItem } onClick={() => selectItem(r) }>
                            <ResultsComponent result={r} />
                        </li>
                    ))}
                </ul>
            );
        }        
    }

    const lilXEl = input?.length > 0 ? <button onClick={clearInput} className={ style.closeButton }>X</button> : null;

    return (
        <div className={ style.moviesContainer }>
            <input className={ style.autoComplete } placeholder="Search Movies" value={input} onChange={changeInput} />
            { lilXEl }
            { resultsEl }
        </div>
    );
}

