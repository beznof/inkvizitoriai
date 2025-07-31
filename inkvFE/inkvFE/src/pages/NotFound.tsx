import MainLayout from "@/layouts/MainLayout"
import Bricks from "@/static/Bricks";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="flex flex-col justify-center py-[80px] items-center w-fit m-auto select-none">
                <div className="flex flex-row justify-center gap-x-10 mb-10 pb-5 border-b-1">            
                    <Bricks className="size-72 fill-stone-500"/>
                    <div className="flex flex-col justify-center text-center">
                        <p className="font-bold text-9xl font-mono text-rose-500">
                            404
                        </p>
                        <p className="font-semibold text-lg font-sans">
                            Sorry, but we couldn't find the page you were looking for...
                        </p>
                    </div>
                </div>

                <Button 
                    radius="lg" 
                    className="w-[70%] bg-stone-500 font-semibold text-white"
                    onPress={() => navigate(-1)}    
                >
                    Go back
                </Button>
            </div>
        </MainLayout>
    )
}

export default NotFound;