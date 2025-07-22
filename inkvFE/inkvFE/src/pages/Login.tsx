import { Button } from "@heroui/button";
import React from "react"
import { triggerAnimation } from "@/utils/RegisterLogin";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/register-login/PasswordInput";
import EmailInput from "@/components/register-login/EmailInput";
import ErrorBox from "@/components/register-login/ErrorBox";
import GoBack from "@/static/GoBack";
import ROUTES from "@/enums/routes";
import useAPI from "@/utils/ClientAPI";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    //Checks if any fields are empty
    if(!email || !password) {
      if(!email && emailInputRef.current) {
        triggerAnimation(emailInputRef.current, "animate-shake");
        setError("No email address has been provided");
      }
      else if(!password && passwordInputRef.current) {
        triggerAnimation(passwordInputRef.current, "animate-shake");
        setError("No password has been provided");
      }
      setIsLoading(false);
      return;
    }

    // Making request to backend api login
    try {
        const res = await useAPI("auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email: email, Password: password }) 
        })

        //Sets the data from response to object "data"
        const data = await res.json();
        
        if (res.status == 200) {
          navigate(ROUTES.HOME);
          return;
        } else {
          setError(data.message); //Sets error message shown to the user
          throw new Error();
        }
      } catch (err: any) {
        setError("Internal server error occured");
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <div className="w-screen min-h-screen overflow-y-auto bg-zinc-100">
      {/* Main container */}
      <div className="flex flex-col h-full min-h-screen md:flex-row bg-zinc-100/10 backdrop-blur-md">

        {/* Left side */}
        <div className="items-center justify-center hidden w-1/2 md:flex">
          <div className="w-[95%] h-[95%] rounded-lg bg-rose-500">
            kazka veliau
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center justify-center w-full px-6 py-12 overflow-auto md:w-1/2">
          <button className="absolute flex flex-row items-center justify-center transition-all duration-100 top-5 right-5 hover:opacity-50"
            onClick={() => navigate(-1)}
          >
            <GoBack className="size-5"/>
            <p className="text-xs font-light">Go back</p>
          </button>
          {/* Welcome message */}
          <div className="flex flex-col items-center justify-center mb-5 w-[80%] gap-y-3 select-none">
            <p className="mb-2 text-5xl font-bold tracking-wide text-center text-rose-500 fade-in"
            >
              Welcome back,<br/><span className="text-stone-600">we've missed you!</span>
            </p>
            <p className="font-normal text-black">Sign into your existing account</p>
          </div>
          {/* Error message box */}
          {error && 
            (<ErrorBox
              error={error}
              onClose={() => setError("")}
            />)
          }
          {/* Form */}
          <form className="flex flex-col w-full max-w-[400px] items-center justify-center" onSubmit={handleSubmit}>
            {/* Email field */}
            <EmailInput email={email} setEmail={setEmail} isLoading={isLoading} ref={emailInputRef}/>

            {/* Password field */}
            <PasswordInput password={password} setPassword={setPassword} text="Enter your password" isLoading={isLoading} ref={passwordInputRef}/>

            {/* Forgot your password ref */}
            <div className="flex flex-col items-end justify-center w-full pr-4 mb-5 -mt-4">
              <a href="/"
                className="text-[10px] font-normal underline text-black hover:text-rose-600 transition-colors duration-100"
                type="button"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit button */}
            <Button radius="lg" isLoading={isLoading} isDisabled={isLoading} type="submit"
              className="w-[60%] bg-gradient-to-tr from-rose-600 to-stone-500 font-semibold text-white"
            >
              Sign in
            </Button>

            {/* Don't have an account yet ref */}
            <div className="px-3 pt-1 mt-5 font-normal w-fit border-t-1 border-zinc-400/50 text-[14px]">
              Don't have an account yet?&nbsp;
              <a href="/register"
                type="button"
                className="font-semibold underline transition-colors duration-100 text-rose-600 hover:text-stone-600"
              >
                 Register now
              </a>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default LoginPage;