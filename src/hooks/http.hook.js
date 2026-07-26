import { useState, useCallback } from 'react';

// http - как правило называют какие либо сущности, которые будут работать с запросами
export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url, method = 'GET', body = null, headers = {
		// 'Content-type': 'application/json'
	}) => {
		setLoading(true);

		//5 		
		try {
			// отправляем запрос на сервер через fetch
			const response = await fetch(url, { method, body, headers });

			// если сервер вернул ошибку (например 404 или 500)
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}

			const data = await response.json();

			// запрос завершён успешно, выключаем loading
			setLoading(false);

			// возвращаем данные наружу (чтобы компонент мог их использовать)
			return data;
		} catch (e) {
			// даже если ошибка — загрузку нужно выключить
			setLoading(false);

			// сохраняем текст ошибки в state error
			setError(e.message);

			// пробрасываем ошибку дальше (чтобы можно было обработать в компоненте)
			throw e;
		}

	}, [])

	const clearError = useCallback(() => setError(null), []);

	// 7
	return { loading, request, error, clearError }
}