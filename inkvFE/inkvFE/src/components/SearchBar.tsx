import React from "react";
import {useState} from "react";
import {Card, CardBody} from "@heroui/card"
import {Button} from "@heroui/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
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


type SearchBarProps = {
    categorys: Category[];
    citys: City[];
}


const SearchBar: React.FC<SearchBarProps> = ({ citys, categorys}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

    const handleChange = (city: number) => {
        setSelected((prev) => ({
        ...prev,
        [city]: !prev[city]
        }));
    };

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Kategorijos"]));

    const handleSelectionChange = (keys: any) => {
    if (keys === "all") {
        setSelectedKeys(new Set(["all"]));
    } else {
        setSelectedKeys(new Set(keys as Set<string>));
    }
    };

     const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys],
    );

    return (
        <div className="h-screen w-screen flex items-center justify-center select-none">
            <Card className="w-[90%]">
                <CardBody>
                    <div className="flex items-center justify-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="w-[15%]">
                                    {selectedKeys.size === 0 ? "Kategorijos" :
                                    selectedValue}
                                    <DownArrow className="ml-2 w-[50%] h-[50%]"></DownArrow>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions"
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            onSelectionChange={handleSelectionChange}
                            >       
                                {categorys.map((category: Category) =>(
                                <DropdownItem
                                    key={category.name}
                                    color="default"
                                    >
                                    {category.name}
                                </DropdownItem> 
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-lg m-2 p-2 w-[60%] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                                className="ml-2 w-[10%] h-[10%]"
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
                        <Button onPress={onOpen}>
                            {Object.values(selected).filter(Boolean).length === 0 ? "Miestai" :
                            Object.values(selected).filter(Boolean).length > 1 ?
                            Object.values(selected).filter(Boolean).length : citys
                            .filter((_, index) => selected[index])
                            .map((citys, index) => <div key={index}>{citys.name}</div>)}
                            <DownArrow className="ml-2 w-[50%] h-[50%]"></DownArrow>
                        </Button>
                        <Button color="primary" className="w-[15%] ml-2 font-semibold text-white bg-rose-600 hover:bg-rose-600/70 transition-all" onPress={() => console.log("Search clicked")}>
                            Ieškoti
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default SearchBar;