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
        <div className="max-w-[900px] relative border-2 border-rose-500 bg-gray-950">
            {/*Shows left button*/}
            {index != 0 &&
                <Button className="absolute top-1/2 left-[10px] z-10 !min-w-0 !w-fit !p-1 rounded-md bg-rose-500 h-auto" 
                    onPress={leftButtonPress}
                >
                    <LeftArrow fill="white" className="size-[30px]"/>
                </Button>
            }

            {/*Shows image*/}
            <Image src = {images[index]} width={650} className="z-0"/>

            {/*Shows right button*/}
            {index != images.length-1 &&
                <Button className="absolute top-1/2 right-[10px] z-10 !min-w-0 !w-fit !p-1 rounded-md bg-rose-500" 
                    onPress={rightButtonPress}
                >
                    <RightArrow fill="white" className="size-[30px]"/>
                </Button>
            }
        </div>
    )
}

export default ImageShowcase;