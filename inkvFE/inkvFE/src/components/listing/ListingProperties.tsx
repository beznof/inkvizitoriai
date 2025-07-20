import React from "react";
import {Chip} from "@heroui/chip";

type ListingPropertiesProps = {
    properties: string[];
}

const ListingProperties: React.FC<ListingPropertiesProps> = ({properties}) => {
    return(
        <div>
            {properties.map((property,index) =>(
                 <Chip key= {index} color="danger" variant="shadow">{property}</Chip>
            ))}
        </div>
    )
}

export default ListingProperties;