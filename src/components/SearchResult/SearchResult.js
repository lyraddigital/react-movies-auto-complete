import { SEARCH_THUMBNAIL_IMAGE_URL_PREFIX } from 'core/constants';

import style from './SearchResult.module.scss';

export const SearchResult = ({ result }) => {
    const fullPostPath = `${SEARCH_THUMBNAIL_IMAGE_URL_PREFIX}/${result.poster_path}`;
    const imgEl = result.poster_path ? <img className={ style.thumbnail } src={fullPostPath} alt={result.title} />: null;
    const releaseDate = new Date(result.release_date);

    return (
        <div className={ style.searchResult }>
            { imgEl }
            <div className={ style.searchResultContent }>
                <div>{ result.title } ({ releaseDate.getFullYear() })</div>
            </div>
        </div>
    );
}