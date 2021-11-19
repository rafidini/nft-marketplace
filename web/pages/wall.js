import Head from 'next/head'
import React from 'react'
import Layout from '../components/layout'


const moodColors = {
    0: "text-red-700 bg-red-300",
    1: "text-yellow-700 bg-yellow-300",
    2: "text-green-700 bg-green-300"
}

const moodTexts = {
    0: "Meh",
    1: "Some potential",
    2: "The best!"
}

async function submitComment(commentData) {
    // Send data
    const fetchedData = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify(commentData)
    })
        .then(res => res.json())
}

class WallPage extends React.Component {

    static async getInitialProps(ctx) {
        const res = await fetch('http://localhost:3000/api/comment_get')
        const json = await res.json()
        return { comments: json }
    }

    handleSubmit = (event) => {
        // Get data
        event.preventDefault();
        const data = new FormData(event.target);
        const commentData = {
            "name": data.get("name"),
            "title": data.get("title"),
            "mood": data.get("mood"),
            "comment": data.get("comment"),
            "image": data.get("image")
        }

        submitComment(commentData)
    }

    render() {

        const people = this.props.comments

        return (
            <div class="relative bg-white" >
                <Head>
                    <title>NFTs ・ Wall </title>
                    <link rel="icon" href="/img/favicon.ico" />
                </Head>
                <main>
                    <Layout navbar_route="wall">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                            <form onSubmit={this.handleSubmit}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                    Full name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Title (job, status...)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    autoComplete="title"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
                                                    Mood
                                                </label>
                                                <select
                                                    id="mood"
                                                    name="mood"
                                                    autoComplete="mood"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="0">Meh (bad)</option>
                                                    <option value="1">Some potential</option>
                                                    <option value="2">the best!</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                    Image URL
                                                </label>
                                                <input
                                                    type="text"
                                                    name="image"
                                                    id="image"
                                                    autoComplete="image"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                    Comment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="comment"
                                                    id="comment"
                                                    autoComplete="comment"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>


                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <br />

                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Comment
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Review
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {people.map((person) => (
                                                        <tr key={person._id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img className="object-contain h-10 w-10 rounded-full" src={person.image} alt="" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                        <div className="text-sm text-gray-500">{person.title}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{person.comment}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full " + moodColors[person.mood]}>
                                                                    {moodTexts[person.mood]}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </main>
            </div>
        )
    }
}

export default WallPage;