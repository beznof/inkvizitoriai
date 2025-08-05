import React from "react"
import { Button } from "@heroui/button";
import MainLayout from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import useAPI from "@/utils/ClientAPI";
import ROUTES from "@/enums/routes";
import ErrorBox from "@/components/register-login/ErrorBox";


const LogoutPage: React.FC = () => {
    const [error, setError] = React.useState<string>("");

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(-1);
    };

    const handleSubmit = async () => {
      try {
        const res = await useAPI("auth/logout", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        
        if (res.status == 200) {
          navigate(ROUTES.HOME);
          return;
        } else {
          setError("Failed to logout out"); //Sets error message shown to the user
          throw new Error();
        }
      } catch (err: any) {
        setError("Internal server error occured");
      }
    }

    return (
        <div className="h-screen overflow-hidden">
            <MainLayout>
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-bold">You are about to be <span className="text-red-600">logout</span> out</h2>
                <Button className="bg-stone-500 hover:bg-stone-600 text-white font-semibold mt-4 p-5 m-5"
                onPress={handleSubmit} type="button"
                >
                Confirm
                </Button>
                <Button className="w-32 bg-rose-600 hover:bg-rose-800 text-white font-semibold"
                onPress={handleClick} type="button" 
                >
                Cancel
                </Button>
                {error && 
                (<ErrorBox
                    error={error}
                    onClose={() => setError("")}
                />)
                }
            </div>
            </MainLayout>
        </div>   
    )
}

export default LogoutPage;