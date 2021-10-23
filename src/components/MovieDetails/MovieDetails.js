import { SEARCH_BACKDROP_IMAGE_URL_PREFIX } from "core/constants";

import style from './MovieDetails.module.scss';

export const MovieDetails = ({ details }) => {
    const backdropPath = `${SEARCH_BACKDROP_IMAGE_URL_PREFIX}/${details?.backdrop_path}`;

    console.log(details);

    return (
        <div id={ style.backdropImage } style={ { backgroundImage: `url('${backdropPath}')` }}>
            <div id={ style.backdropGradient }>
                <section id={ style.movieSection }>
                    <h2>{ details?.title } ({ new Date(details?.release_date).getFullYear() })</h2>
                    <p className={ style.overview }>
                        { details?.overview }
                    </p>
                </section>
            </div>            
        </div>
    )
}
