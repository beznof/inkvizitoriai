import { Button } from "@heroui/button";
import React from "react"
import { triggerAnimation } from "@/utils/RegisterLogin";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/register-login/PasswordInput";
import EmailInput from "@/components/register-login/EmailInput";
import ErrorBox from "@/components/register-login/ErrorBox";
import GoBack from "@/static/GoBack";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [password, setPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("wbrtbtrbtrbtrfwafwafwafwafwafawfhthththththththtdwdwdwdwdwdwdwdwdwdwdw");

    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            if (!email && emailInputRef.current) triggerAnimation(emailInputRef.current, "animate-shake");
            if (!password && passwordInputRef.current) triggerAnimation(passwordInputRef.current, "animate-shake");
            if (!confirmPassword && confirmPasswordInputRef.current) triggerAnimation(confirmPasswordInputRef.current, "animate-shake");
            return;
        }

        if (password != confirmPassword) {
            setError("The passwords do not match");
            return;
        }

        // Should be replaced with register logic later

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/");
        }, 500)
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
                        <GoBack className="size-5" />
                        <p className="text-xs font-light">Go back</p>
                    </button>
                    {/* Welcome message */}
                    <div className="flex flex-col items-center justify-center mb-5 w-[80%] gap-y-3 select-none">
                        <p className="mb-2 text-5xl font-bold tracking-wide text-center text-rose-500 fade-in"
                        >
                            Welcome,<br /><span className="text-stone-600">nice to meet you!</span>
                        </p>
                        <p className="font-normal text-black">Create a new account</p>
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
                        <EmailInput email={email} setEmail={setEmail} isLoading={isLoading} ref={emailInputRef} />

                        {/* Password field */}
                        <PasswordInput password={password} setPassword={setPassword} text="Enter your password" isLoading={isLoading} ref={passwordInputRef} />

                        {/* Confirm password field */}
                        <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} text="Confirm your password" isLoading={isLoading} ref={confirmPasswordInputRef} />

                        {/* Submit button */}
                        <Button radius="lg" isLoading={isLoading} isDisabled={isLoading} type="submit"
                            className="w-[60%] bg-gradient-to-tr from-rose-600 to-stone-500 font-semibold text-white"
                        >
                            Sign up
                        </Button>

                        {/* Don't have an account yet ref */}
                        <div className="px-3 pt-1 mt-5 font-normal w-fit border-t-1 border-zinc-400/50 text-[14px]">
                            Already have an account?&nbsp;
                            <a href="/login"
                                type="button"
                                className="font-semibold underline transition-colors duration-100 text-rose-600 hover:text-stone-600"
                            >
                                Sign in here
                            </a>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default RegisterPage;