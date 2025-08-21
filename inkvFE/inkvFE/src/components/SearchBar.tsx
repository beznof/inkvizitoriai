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
import {Input} from "@heroui/input";

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
        setSelectedKeys(new Set(["Visos kategorijos"]));
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
                                <>
                                    <DropdownItem key="Visos kategorijos">
                                        Visi kategorijos
                                    </DropdownItem>
                                    {categorys.map((category: Category) => (
                                        <DropdownItem
                                            key={category.name}
                                            color="default"
                                        >
                                            {category.name}
                                        </DropdownItem>
                                    ))}
                                </>
                            </DropdownMenu>
                        </Dropdown>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-zinc-300 rounded-lg m-2 p-2 w-[60%] focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalContent className="h-[80%]">
                            {(onClose: () => void) => (
                                <>
                                <ModalHeader className="flex flex-col gap-1">Miestai</ModalHeader>
                                <ModalBody className="overflow-y-auto">
                                    {citys.map((citys,index) =>(
                                        <div key={index} className="flex items-center flex-wrap">
                                            <input
                                                type="checkbox"
                                                checked={selected[index] || false}
                                                onChange={() => handleChange(index)}
                                                className="w-5 h-5 appearance-none border border-zinc-400 rounded-md checked:bg-rose-500 checked:before:content-['✓']  flex items-center justify-center"
                                            /><div className="ml-2">{citys.name}</div>
                                        </div>
                                    ))}
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="font-semibold text-white bg-rose-600 hover:bg-rose-600/70 transition-all" onPress={onClose}>
                                        Uždaryti
                                    </Button>
                                </ModalFooter>
                                </>
                            )}
                            </ModalContent>
                        </Modal>
                        <Button onPress={onOpen} className="w-[15%]">
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