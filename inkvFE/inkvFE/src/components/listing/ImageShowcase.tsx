import React from "react";
import {Image} from "@heroui/image";
import { Button, PressEvent } from "@heroui/button";
import LeftArrow from "@/static/LeftArrow";
import RightArrow from "@/static/RightArrow";


type ImageShowcaseProps = {
    images: string[];
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({images}) => {
    const [index, setIndex] = React.useState<number>(0);

    const leftButtonPress = async (e: PressEvent) => {
        setIndex(index-1);
    }

    const rightButtonPress = async (e: PressEvent) => {
        setIndex(index+1);
    }

    return(
        <div className="w-full max-w-[900px] flex flex-col md:flex-row border-2 border-rose-500 bg-gray-950">
            {/*Shows left button*/}
            {index != 0 &&
                <div className="mt-[200px]">
                    <Button className="w-[80px] h-[50px] bg-gray-400" startContent={<LeftArrow/>} onPress={leftButtonPress}></Button>
                </div>
            }
            {/*Doesn't show left button*/}
            {index == 0 && <div className="w-[80px] h-[50px]"></div>}
            
            {/*Shows image*/}
            <Image src = {images[index]} width={650}/>
            
            {/*Shows right button*/}
            {index != images.length-1 &&
                <div className="mt-[200px]">
                    <Button className="w-[80px] h-[50px] bg-gray-400" startContent={<RightArrow/>} onPress={rightButtonPress}></Button>
                </div>
            }
            {/*Doesn't show right button*/}
            {index == images.length-1 && <div className="w-[80px] h-[50px]"></div>}
        </div>
    )
}

export default ImageShowcase;