export default async function CryptoAPI(req, res) {    
    const url = "http://api:8000/crypto?ticker=" + req['query']['ticker']
    
    const api_res = await fetch(url)
        .then((response) => response.json())
        .catch(() => 'Not found')

    res.status(200).json(api_res)
}