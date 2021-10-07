export default async function NftsAPI(req, res) {
    const query_limit = 'limit='
    var limit = ''

    if ('limit' in req['query'])
        limit = query_limit + req['query']['limit']
    
    const url = "http://api:8000/nfts?" + limit
    
    const api_res = await fetch(url)
        .then((response) => response.json())
        .catch(() => 'Not found')

    res.status(200).json(api_res)
}