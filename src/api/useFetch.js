import { useState, useEffect } from 'react';

export default function useFetch(url, requestOptions) {
    //url
    //request options (method and payload)
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((actualData) => {
                setData(actualData.body);
                console.log(actualData.body)
            })
            .catch((err) => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])
    return { data, isLoading, hasError }
}

