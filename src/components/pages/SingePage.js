import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

// Хотелось бы вынести функцию по загрузке данных как отдельный аргумент
// Но тогда мы потеряем связь со стэйтами загрузки и ошибки
// А если вынесем их все в App.js - то они будут одни на все страницы



const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    // 1 когда наш компонент будет создаваться, он будет делать запрос при помощи  updateData
    useEffect(() => {
        updateData()
    }, [id])


    const updateData = () => {
        clearError();
        // 2 при помощи 2-го аргумента dataType мы будем решать какая ф-ция будет запускаться: getComic или getCharacter
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    // 3 - далее данные записываются в state
    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    // 
    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;