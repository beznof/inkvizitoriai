import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react"
import PasswordVisiblityEye from "@/static/PasswordVisiblityEye";
import { ToastProvider } from "@heroui/toast";

const LoginPage: React.FC = () => {
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    },500)
  }

  return (
    <div className="w-screen h-screen bg-zinc-100">
      <ToastProvider/>
      {/* Main container */}
      <div className="flex flex-row items-center justify-center w-full h-full">

        {/* Left side */}
        <div className="items-center justify-center hidden w-1/2 h-full md:flex">
          <div className="w-[95%] h-[95%] rounded-lg bg-rose-500">
            kazka veliau
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center justify-center flex-grow h-full min-h-full">
          <div className="flex flex-col items-center justify-center mb-5 w-[60%] gap-y-3 select-none">
            <p className="font-bold text-[30px] text-rose-500 line-clamp-2 tracking-wide text-left mb-2 leading-10"
            >
              Welcome back,<br/><span className="text-stone-600">we've missed you!</span>
            </p>
            <p className="font-normal text-black">Sign into your existing account</p>
          </div>
          {/* Form */}
          <form className="flex flex-col w-[400px] items-center justify-center" onSubmit={handleSubmit}>
            {/* Email field */}
            <Input label="Email" type="email" placeholder="Enter your email address" isDisabled={isLoading}
              value={email} onValueChange={setEmail}
              className="mb-5"
            />

            {/* Password field */}
            <Input label="Password" type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password" radius="lg" isDisabled={isLoading} 
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
            <div className="px-3 pt-1 mt-5 font-normal w-fit border-t-1 border-rose-600/50 text-[14px]">
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