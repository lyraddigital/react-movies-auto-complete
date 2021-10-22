import { useState, useEffect } from 'react';

import style from './AutoComplete.module.scss';

export const AutoComplete = ({ asyncFn, minSearchLength, responseMapper, ResultsComponent, onSelect }) => {
    const [showResults, setShowResults] = useState(false);
    const [response, setResponse] = useState();
    const [input, setInput] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (asyncFn && input && input.length >= minSearchLength) {
            setIsLoading(true);
            
            asyncFn(input).then((asyncResponse) => {
                setShowResults(true);
                setResponse(asyncResponse);
            }).finally(() => {
                setIsLoading(false);
            });
        }        
    }, [asyncFn, input, minSearchLength])

    const changeInput = (e) => {
        setInput(e.target.value);
    };

    const hideResults = () => {
        setShowResults(false);
    };

    const selectItem = (result) => {
        if (onSelect) {
            onSelect(result);
        }

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

    let loadingEl = isLoading ? <div>Loading...</div>: null;

    return (
        <>
            <input className={ style.autoComplete } onBlur={hideResults} placeholder="Search Movies" defaultValue={input} onChange={changeInput} />
            { loadingEl }
            { resultsEl }
        </>
    );
}

