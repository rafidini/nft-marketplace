import { useState, useEffect } from "react";

export default function CryptoPrice({ children, ticker, amount }) {
    const [crypto, setCrypto] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/crypto?ticker=" + ticker);
            const crypto = await res.json();

            setCrypto(crypto);
        };
        
        setInterval(fetchData, 2000)
    }, []);

    var price = parseFloat(crypto['price']) * parseFloat(amount)
    price = price.toFixed(4)

    return (
        <>
            {price} {crypto['currency']}
        </>
    )
}