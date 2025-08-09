import React from "react";
import HeartFilled from "@/static/HeartFilled";
import HeartUnfilled from "@/static/HeartUnfilled";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import {Divider} from "@heroui/divider"

type ListingCardProps = {
    imageURL: string;
    name: string;
    price: number;
    city: string;
}

const ListingCard: React.FC<ListingCardProps> = ({imageURL, name, price, city}) => {
    const [isFavored, setIsFavored] = React.useState<boolean>(false);


    return(
        <a href="/" className="w-full group">
            <div className="flex flex-col items-center justify-center w-[100%] h-full gap-y-5">
                <div className="flex items-center p-4 rounded shadow-xl">
                    <img src={imageURL} alt={name} className="object-cover w-full h-40 mb-2" />
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <h2 className="m-2 text-lg font-bold whitespace-nowrap">{name}</h2>
                            {isFavored && 
                            (<div>
                                <button  onClick={() => setIsFavored(prev => !prev)}><HeartFilled></HeartFilled></button>
                            </div>)}
                            {!isFavored && 
                            (<div>
                                <button onClick={() => setIsFavored(prev => !prev)}><HeartUnfilled></HeartUnfilled></button>
                            </div>)}
                        </div>
                        <p className="m-2">{city}</p>
                        <h2 className="m-2 text-xl text-rose-500">{price} €</h2>
                    </div>
                </div>

                <Card className="w-full group">
                    <CardBody className="flex flex-row items-start justify-between">
                        <div className="flex flex-row">
                            <div className="flex-shrink-0 h-32 overflow-hidden md:h-44 aspect-square rounded-xl">
                                <img 
                                    src={imageURL}
                                    alt={name}
                                    className="object-cover !min-h-full transition-transform transform group-hover:scale-125 bg-emerald-500"
                                />
                            </div>
                            <p className="flex-grow mx-5 text-xl font-semibold break-all line-clamp-2">{name}</p>
                        </div>
                        <div>
                            {isFavored &&
                                <button  onClick={() => setIsFavored(prev => !prev)}>
                                    <HeartFilled className="stroke-rose-600 fill-rose-600"/>
                                </button>
                            }
                            {!isFavored && 
                                <button onClick={() => setIsFavored(prev => !prev)}>
                                    <HeartUnfilled className="transition-all stroke-zinc-500/40 fill-none hover:stroke-red-600"/>
                                </button>
                            }
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter className="flex flex-row items-center justify-between px-10">
                        <p className="text-lg font-semibold">{city}</p>
                        <p className="text-xl font-bold text-rose-600">{price} €</p>
                    </CardFooter>
                </Card>
            </div>
        </a>
    )
}

export default ListingCard;

