import React from "react";
import { Input } from "@heroui/input";

type EmailInputProps = {
  email: string;
  setEmail: (value: string) => void;
  isLoading: boolean;
  className?: string;
}

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps> (
  ({ email, setEmail, isLoading, className}, ref) => {

    return (
      <Input type="email" placeholder="Enter your email address" isDisabled={isLoading} isInvalid={false}
        value={email} onValueChange={setEmail}
        className={`mb-5 ${className ?? ""}`}
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

EmailInput.displayName = "EmailInput";

export default EmailInput;