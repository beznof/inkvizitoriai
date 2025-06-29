import { useState } from "react";

export const usePasswordValidation = () => {
    
    //validation states
    const [lowerValidated, setLowerValidated]=useState(false);
    const [upperValidated, setUpperValidated]=useState(false);
    const [lengthValidated, setLengthValidated]=useState(false);
    const [numberValidated, setNumberValidated]=useState(false);
    const [symbolValidated, setSymbolValidated]=useState(false);

    const validatePassword = (password: string) => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp("(?=.*[~`!@#$%^&*()_\\-+={[\\]}|\\\\:;\"'<,>.?/])");
        const length = new RegExp('(?=.{8,})');

        setLowerValidated(lower.test(password));
        setUpperValidated(upper.test(password));
        setNumberValidated(number.test(password));
        setSymbolValidated(special.test(password));
        setLengthValidated(length.test(password));


    };
    return {
        validatePassword,
        lowerValidated,
        upperValidated,
        lengthValidated,
        numberValidated,
        symbolValidated,
    };
};
