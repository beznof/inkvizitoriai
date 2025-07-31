import React from "react"
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";


const LogoutPage: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate(-1);
    };
    return (
        
        <DefaultLayout>
            <h2 className="text-2xl font-bold">You are about to be logged out <span className="text-red-600">logout</span></h2>
                <Button className="bg-stone-500 hover:bg-stone-600 text-white font-semibold mt-4 p-5 m-5"
                >
                Confirm
                </Button>
                <Button className="w-32 bg-rose-600 hover:bg-rose-800 text-white font-semibold mt-4 p-5"
                onPress={handleClick} type="button" 
                >
                Cancel
                </Button>
        </DefaultLayout>
    )
}

export default LogoutPage;