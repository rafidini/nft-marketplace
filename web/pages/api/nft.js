export default async function NftAPI(req, res) {    
    const url = "http://api:8000/nft?id=" + req['query']['id']
    
    const api_res = await fetch(url)
        .then((response) => response.json())
        .catch(() => 'Not found')

    res.status(200).json(api_res)
}