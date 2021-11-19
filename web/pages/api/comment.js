export default async function CommentInsertAPI(req, res) {
    const url = "http://api:8000/comments/add"
    const comment = JSON.parse(req["body"])
    comment["mood"] = parseInt(comment["mood"])

    const api_res = await fetch(url, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then((response) => response.json())
        .then((res) => res)

    res.status(200).json(api_res)
}