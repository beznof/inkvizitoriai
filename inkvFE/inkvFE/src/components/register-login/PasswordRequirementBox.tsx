import React from 'react';


type PasswordRequirementsProps = {
    lengthValidated: boolean;
    lowerValidated: boolean;
    upperValidated: boolean;
    numberValidated: boolean;
    symbolValidated: boolean;
};


const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
    lengthValidated,
    lowerValidated,
    upperValidated,
    numberValidated,
    symbolValidated,
}) => {
const allValid =
    lengthValidated &&
    lowerValidated &&
    upperValidated &&
    numberValidated &&
    symbolValidated;

    

    return (
        <div className="tracker-box w-full flex flex-col items-start text-left text-xs px-2 mb-3 gap-y-1">
            {allValid && (
                <p className="text-emerald-500">Your password is secure!</p>
            )}

            {!lengthValidated && (
                <div className="text-red-500 transition-opacity duration-300 opacity-100">
                    * At least 8 characters long
                </div>
            )}
            {!lowerValidated && (
                <div className="text-red-500 transition-opacity duration-300 opacity-100">
                    * At least 1 lowercase letter
                </div>
            )}
            {!upperValidated && (
                <div className="text-red-500 transition-opacity duration-300 opacity-100">
                    * At least 1 uppercase letter
                </div>
            )}
            {!numberValidated && (
                <div className="text-red-500 transition-opacity duration-300 opacity-100">
                    * At least 1 number
                </div>
            )}
            {!symbolValidated && (
                <div className="text-red-500 transition-opacity duration-300 opacity-100">
                    * At least 1 special symbol
                </div>
            )}
        </div>
    );
}
export default PasswordRequirements;
