import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((res) => {
                setData(res.rates);
            })
            .catch((error) => {
                console.error("Error fetching currency data:", error);
                setData({});
            });
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
