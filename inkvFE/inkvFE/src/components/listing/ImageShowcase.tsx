import React from "react";
import {Image} from "@heroui/image";
import {Button} from "@heroui/button";
import LeftArrow from "@/static/LeftArrow";
import RightArrow from "@/static/RightArrow";


type ImageShowcaseProps = {
    images: string[];
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({images}) => {
    const [index, setIndex] = React.useState<number>(0);

    const leftButtonPress = async () => {
        setIndex(index-1);
    }

    const rightButtonPress = async () => {
        setIndex(index+1);
    }

    return(
        <div className="w-full max-w-[900px] flex flex-col md:flex-row border-2 border-rose-500 bg-gray-950">
            {/*Shows left button*/}
            {index != 0 &&
                <div className="absolute top-[480px] left-[435px] z-10">
                    <Button className="w-[80px] h-[50px] bg-rose-500" startContent={<LeftArrow fill="white"/>} onPress={leftButtonPress}></Button>
                </div>
            }

            {/*Shows image*/}
            <Image src = {images[index]} width={650} className="z-0"/>
            
            {/*Shows right button*/}
            {index != images.length-1 &&
                <div className="absolute top-[480px] right-[435px] z-10">
                    <Button className="w-[80px] h-[50px] bg-rose-500" startContent={<RightArrow fill="white"/>} onPress={rightButtonPress}></Button>
                </div>
            }
        </div>
    )
}

export default ImageShowcase;