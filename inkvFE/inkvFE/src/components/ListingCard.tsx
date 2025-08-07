import React from "react";
import HeartFiled from "@/static/HeartFiled";
import HeartUnfiled from "@/static/HeartUnfiled";

type ListingCardProps = {
    imageURL: string;
    name: string;
    price: number;
    city: string;
}

const ListingCard: React.FC<ListingCardProps> = ({imageURL, name, price, city}) => {
    const [isFavored, setIsFavored] = React.useState<boolean>(false);


    return(
        <div className="flex items-center shadow-xl p-4 rounded">
            <img src={imageURL} alt={name} className="w-full h-40 object-cover mb-2" />
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center">
                    <h2 className="m-2 whitespace-nowrap font-bold text-lg">{name}</h2>
                    {isFavored && 
                    (<div>
                        <button  onClick={() => setIsFavored(prev => !prev)}><HeartFiled></HeartFiled></button>
                    </div>)}
                    {!isFavored && 
                    (<div>
                        <button onClick={() => setIsFavored(prev => !prev)}><HeartUnfiled></HeartUnfiled></button>
                    </div>)}
                </div>
                <p className="m-2">{city}</p>
                <h2 className="m-2 text-xl text-rose-500">{price} €</h2>
            </div>
        </div>
    )
}

export default ListingCard;

