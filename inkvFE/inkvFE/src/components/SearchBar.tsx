import React from "react";
import {useState} from "react";
import {Card, CardBody, CardFooter} from "@heroui/card"
import {Button} from "@heroui/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@heroui/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/modal";
import DownArrow from "@/static/DownArrow";

import {City} from "@/types/City";
import { Category } from "@/types/Category";

type CityProps = {
    citys: City[];
}

type CategoryProps = {
    category: Category;
}


const SearchBar: React.FC<CityProps> = ({ citys }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

    const handleChange = (city: number) => {
        setSelected((prev) => ({
        ...prev,
        [city]: !prev[city]
        }));
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center select-none">
            <Card>
                <CardBody>
                    <div className="flex items-center justify-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">Kategorija<DownArrow className="ml-2 w-6 h-6"></DownArrow></Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">New file</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-lg m-2 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalContent>
                            {(onClose: () => void) => (
                                <>
                                <ModalHeader className="flex flex-col gap-1">Miestai</ModalHeader>
                                <ModalBody>
                                    {citys.map((citys,index) =>(
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                checked={selected[index] || false}
                                                onChange={() => handleChange(index)}
                                                className="ml-2 w-3 h-3"
                                            />{citys.name}
                                        </div>
                                    ))}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={onClose}>
                                        Uždaryti
                                    </Button>
                                </ModalFooter>
                                </>
                            )}
                            </ModalContent>
                        </Modal>
                        <Button onPress={onOpen}>Miestai<DownArrow className="ml-2 w-6 h-6"></DownArrow></Button>
                        <Button color="primary" className="ml-2" onPress={() => console.log("Search clicked")}>Ieškoti</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default SearchBar;