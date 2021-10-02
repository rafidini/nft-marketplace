import ListElement from "./list_element"

export default function List({ children, data }) {
    return (
        <>
            <div class="z-0 bg-white">
                <div class="z-0 max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Latest Arts</h2>
                    <div class="z-0 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {data.map((nft, i) =>
                            <ListElement title={nft["name"]} creator={nft["creator"]}
                                description={nft["description"]}
                                status="Sold" price={nft["amount"]} currency={nft["currency"]} link={nft["link"]}
                                image={nft["image"]} id={nft["_id"]}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )
}