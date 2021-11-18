import Head from 'next/head'
import React from 'react'
import Layout from '../components/layout'

class WallPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            title: '',
            comment: '',
            image: '',
            mood: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get("name"))
    }

    render() {
        const moodColors = {
            "1": "text-red-700 bg-red-300",
            "2": "text-yellow-700 bg-yellow-300",
            "3": "text-green-700 bg-green-300"
        }

        const moodTexts = {
            "1": "Meh",
            "2": "Some potential",
            "3": "The best!"
        }

        const people = [
            {
                name: 'Jane Cooper',
                title: 'Regional Paradigm Technician',
                comment: 'Super application for NFT review and analysis!',
                image:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
                mood: "3"
            },

            {
                name: 'Bill Gates',
                title: 'Microsoft Ex-CEO',
                comment: 'Wish I created this before... Lots of potential!',
                image:
                    'https://editions.flammarion.com/media/cache/portrait_medium/flammarion_img/Contributeurs_photos_expl/CT-016400.jpg',
                mood: "2"
            }
        ]

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
                                                    <option>Meh (bad)</option>
                                                    <option>Some potential</option>
                                                    <option>the best!</option>
                                                </select>
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