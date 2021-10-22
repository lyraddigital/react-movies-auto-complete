import { AutoComplete } from 'components/AutoComplete/AutoComplete';

import './App.scss';

function App() {
  const getStuff = (keyword) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=fd3df6a6eee611c5c35c93dcf2125771`).then(response => {
      return response.json();
    });
  }

  const resultsComponent = ({ result }) => {
    const fullPostPath = `https://image.tmdb.org/t/p/w45/${result.poster_path}`;
    let imgEl = result.poster_path ? <img src={fullPostPath} alt={result.title} />: null;

    return (
      <div style={{ display: 'flex', columnGap: '1.5rem' }}>
        { imgEl }
        <span style={{ flex: '1', color: '#EEE' }}>{ result.title }</span>
      </div>
    );
  };

  return (
    <div>
        <AutoComplete 
          asyncFn={getStuff} 
          minSearchLength={3}
          responseMapper={(response) => response.results} 
          onSelect={(result) => console.log(result) }
          ResultsComponent={resultsComponent} />
    </div>
  );
}

export default App;
