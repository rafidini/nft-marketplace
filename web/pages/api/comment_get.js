export default async function CommentGetAPI(req, res) {
    const url = "http://api:8000/comments/get"

    const api_res = await fetch(url, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((res) => res)

    res.status(200).json(api_res)
}