import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react"
import PasswordVisiblityEye from "@/static/PasswordVisiblityEye";
import { ToastProvider } from "@heroui/toast";
import { triggerAnimation } from "@/utils/RegisterLogin";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!email || !password) {
      if(!email && emailInputRef.current) triggerAnimation(emailInputRef.current, "animate-shake");
      if(!password && passwordInputRef.current) triggerAnimation(passwordInputRef.current, "animate-shake");
      return;
    }

    // Should be replaced with login logic later
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    },500)
  }

  return (
    <div className="w-screen h-screen bg-zinc-100">
      <ToastProvider/>
      {/* Main container */}
      <div className="flex flex-row items-center justify-center w-full h-full bg-zinc-100/10 backdrop-blur-md">

        {/* Left side */}
        <div className="items-center justify-center hidden w-1/2 h-full md:flex">
          <div className="w-[95%] h-[95%] rounded-lg bg-rose-500">
            kazka veliau
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center justify-center flex-grow h-full min-h-full">
          <div className="flex flex-col items-center justify-center mb-5 w-[80%] gap-y-3 select-none">
            <p className="font-bold text-[50px] text-rose-500 line-clamp-2 tracking-wide text-center mb-2 hidden md:block fade-in"
            >
              Welcome back,<br/><span className="text-stone-600">we've missed you!</span>
            </p>
            <p className="font-normal text-black">Sign into your existing account</p>
          </div>
          {/* Form */}
          <form className="flex flex-col w-[400px] items-center justify-center" onSubmit={handleSubmit}>
            {/* Email field */}
            <Input type="email" placeholder="Enter your email address" isDisabled={isLoading}
              value={email} onValueChange={setEmail}
              className="mb-5"
              classNames={{
                input: "!text-black placeholder:text-zinc-500 ",
                inputWrapper: `border rounded-lg border-zinc-300/50
                 group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-zinc-300
                 h-[50px]
                 hover:!ring-2 hover:!ring-zinc-300
                 !bg-zinc-100 hover:!bg-zinc-100
                 !transition-all !duration-200`,
              }}
              ref={emailInputRef}
            />

            {/* Password field */}
            <Input type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password" radius="lg" isDisabled={isLoading} 
              value={password} onValueChange={setPassword}
              endContent={
                <button
                  onMouseDown={() => setIsPasswordVisible(true)}
                  onMouseUp={() => setIsPasswordVisible(false)}
                  type="button"
                >
                  <PasswordVisiblityEye className="pointer-events-none size-5 fill-zinc-400"/>
                </button>
              }
              className="mb-2"
              classNames={{
                input: "!text-black placeholder:text-zinc-500 ",
                inputWrapper: `border rounded-lg border-zinc-300/50
                 group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-zinc-300
                 h-[50px]
                 hover:!ring-2 hover:!ring-zinc-300
                 !bg-zinc-100 hover:!bg-zinc-100
                 !transition-all !duration-200`,
              }}
              ref={passwordInputRef}
            />

            {/* Forgot your password ref */}
            <div className="flex flex-col items-end justify-center w-full pr-4 mb-5">
              <a href="/"
                className="text-[10px] font-normal underline text-black hover:text-rose-600 transition-colors duration-200"
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
              <a href="/"
                type="button"
                className="font-semibold underline transition-colors duration-200 text-rose-600 hover:text-stone-600"
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