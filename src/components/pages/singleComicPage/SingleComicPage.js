import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicPage.scss';


const SingleComicPage = () => {
    const { comicId } = useParams();
    // создадим состояния
    const [comic, setComic] = useState(null);

    // обратимся к useMarvelService
    const { loading, error, getComic, clearError } = useMarvelService();

    // «Запускай updateComic() при первом рендере компонента и каждый раз, когда изменяется comicId».
    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

// 13
const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, price, language } = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;