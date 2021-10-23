import { useState } from 'react';

import { MOVIE_DETAILS_URL_PREFIX, SEARCH_API_URL_PREFIX } from 'core/constants';
import { Config } from 'configuration/Config';
import { AutoComplete } from 'components/AutoComplete/AutoComplete';
import { SearchResult } from 'components/SearchResult/SearchResult';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';

import style from './App.module.scss';

function App() {
  const [result, setResult] = useState();

  const getMoviesForKeyword = (keyword) => {
    return fetch(`${SEARCH_API_URL_PREFIX}?query=${keyword}&api_key=${Config.apiKey}`)
      .then(response => response.json());
  }

  const getMovieDetails = (result) => {
    return fetch(`${MOVIE_DETAILS_URL_PREFIX}/${result.id}?api_key=${Config.apiKey}`)
      .then(response => response.json())
      .then(result => setResult(result));
  };

  return (
    <main id={ style.layoutContainer }>
      <header>
        <div className={ style.searchPanel }>
          <AutoComplete 
            asyncFn={getMoviesForKeyword} 
            minSearchLength={3}
            responseMapper={(response) => response.results} 
            onSelect={getMovieDetails}
            ResultsComponent={SearchResult} />
        </div>
      </header>
      <MovieDetails details={result} />
    </main>
  );
}

export default App;
