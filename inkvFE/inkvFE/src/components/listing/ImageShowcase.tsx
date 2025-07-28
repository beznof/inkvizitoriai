import React from "react";
import {Image} from "@heroui/image";
import { Button, PressEvent } from "@heroui/button";


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
        <div>
            {index != 0 && <Button onPress={leftButtonPress} >Left</Button>} <Image src = {images[index]} width={600}/> {index != images.length && <Button onPress={rightButtonPress}>Right</Button>}
        </div>
    )
}

export default ImageShowcase;