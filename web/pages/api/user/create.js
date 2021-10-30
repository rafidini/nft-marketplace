export default async function CreateUserAPI(req, res) {
    // Prepare POST request
    const user = req['body']
    user['enabled'] = 'true'
    const url = "http://api:8000/keycloak/user_creation"
    
    // launch POST request
    const api_res = await fetch(url, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .catch(() => undefined)
 
    if (api_res == undefined)
        res.status(400).json({content: 'Modify the request', status_code: 400})
    else
        res.status(201).json({content: api_res, url: url, status_code: 201})
}