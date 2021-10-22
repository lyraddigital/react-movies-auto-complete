import { AutoComplete } from 'components/AutoComplete/AutoComplete';

import style from './App.module.scss';

function App() {
  const getStuff = (keyword) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=fd3df6a6eee611c5c35c93dcf2125771`).then(response => {
      return response.json();
    });
  }

  const resultsComponent = ({ result }) => {
    const fullPostPath = `https://image.tmdb.org/t/p/w45/${result.poster_path}`;
    let imgEl = result.poster_path ? <img style={ { width: '45px', height: '68px' } } src={fullPostPath} alt={result.title} />: null;
    const releaseDate = new Date(result.release_date);
    console.log(result);

    return (
      <div style={{ display: 'flex', columnGap: '1.5rem' }}>
        { imgEl }
        <div style={{ flex: '1', color: '#EEE' }}>
          <div>{ result.title } ({ releaseDate.getFullYear() })</div>
          <div>{ result.vote_average }</div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <header>
        <div className={ style.searchPanel }>
          <AutoComplete 
            asyncFn={getStuff} 
            minSearchLength={3}
            responseMapper={(response) => response.results} 
            onSelect={(result) => console.log(result) }
            ResultsComponent={resultsComponent} />
        </div>
      </header>
        
    </main>
  );
}

export default App;
