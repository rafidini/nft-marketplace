import Link from 'next/link'

export default function ListElement({ children, title, creator, description, status, price, link, image, currency, id }) {
    // Change color depending on status
    var color_status = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
    var symbol_status = ""

    // Cryptocurrency logo mapping
    const logos_currency = {
        "BUSD": "https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=013",
        "BNB": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=013",
        "ETH": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013"
    }

    if (status == "Available") {
        color_status = color_status + "bg-green-100 text-green-800"
        symbol_status = "⦾"
    }
    else {
        color_status = color_status + "bg-red-100 text-red-800"
        symbol_status = "⦿"
    }

    // Image or Video
    var picture = ""
    if (image.search("mp4") < 0)
        picture = <img src={image} alt="" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
    else
        picture = <video src={image} alt="" class="w-full h-full object-center object-cover lg:w-full lg:h-full" autoplay/>
    
    // Link
    var link_page = "/nft/" + id + "?currency="+currency

    return (
        <div class="group relative z-0">
            <div class="z-0 w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-50 lg:h-80 lg:aspect-none">
                {picture}
            </div>
            <div class="mt-4 flex justify-between">
                <div>
                    <h3 class="text-sm text-gray-700">
                        <Link href={link_page}>
                            <a>
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                {title}
                            </a>
                        </Link>
                    </h3>
                    <p class={color_status}>
                        {symbol_status} {status}
                    </p>
                </div>
                <p class="text-sm font-medium text-gray-900">
                    {price} <img
                        src={logos_currency[currency]}
                        class="inline"
                        alt="Picture of the author"
                        width={18}
                        height={18}
                    />
                </p>
            </div>
        </div>
    )
}