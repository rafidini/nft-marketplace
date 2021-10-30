export default async function LoginUserAPI(req, res) {
    // Prepare POST request
    const username = req['query']['username']
    const password = req['query']['password']
    const url = "http://api:8000/keycloak/user_login?username=" + username + "&password=" + password
    
    // launch POST request
    const api_res = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .catch(() => undefined)
 
    if (api_res == undefined)
        res.status(401).json({content: 'Wrong credentials...', status_code: 401})
    else
        res.status(201).json({content: api_res, url: url, status_code: 201})
}