import PasswordVisiblityEye from "@/static/PasswordVisiblityEye";
import React from "react";
import { Input } from "@heroui/input";
type PasswordInputProps = {
  password: string;
  setPassword: (value: string) => void;
  text: string;
  isLoading: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

}



const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps> (
  ({ password, setPassword, text, isLoading, className, onChange, onFocus, onBlur }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

    return (
        <Input type={isPasswordVisible ? "text" : "password"} placeholder={ text } radius="lg" isDisabled={isLoading} 
                value={password} onValueChange={setPassword} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
                endContent={
                  <button
                    onMouseDown={() => setIsPasswordVisible(true)}
                    onMouseUp={() => setIsPasswordVisible(false)}
                    type="button"
                  >
                    <PasswordVisiblityEye className="pointer-events-none size-5 fill-zinc-400"/>
                  </button>
                }
                className={`mb-2 ${className ?? ""}`}
                classNames={{
                  input: "!text-black placeholder:text-zinc-500 ",
                  inputWrapper: `border rounded-lg border-zinc-300/50
                  group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-zinc-300
                  h-[50px]
                  hover:!ring-2 hover:!ring-zinc-300
                  !bg-zinc-100 hover:!bg-zinc-100
                  !transition-all !duration-100`,
                }}
                ref={ref}
        />
    )
  }
)
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;