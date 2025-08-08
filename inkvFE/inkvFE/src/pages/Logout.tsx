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
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-full gap-16">
            <p className="text-5xl font-bold text-center">You are about to be <span className="text-red-600">logged out</span> </p>
            
            <div className="flex flex-row items-center justify-center w-[60%] gap-5">
              <Button className="flex-grow text-lg font-semibold text-white transition-all p-7 bg-stone-500 hover:bg-stone-500/70"
                onPress={handleSubmit} type="button"
              >
                Continue
              </Button>
              <Button className="w-[60%] text-lg font-semibold text-white p-7 bg-rose-600 hover:bg-rose-600/70 transition-all"
                onPress={handleClick} type="button" 
              >
                Cancel
              </Button>
            </div>
            {error && 
              (<ErrorBox
                  error={error}
                  onClose={() => setError("")}
              />)
            }
        </div>
      </MainLayout>
    )
}

export default LogoutPage;