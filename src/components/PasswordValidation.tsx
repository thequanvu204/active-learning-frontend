import { Box } from "@chakra-ui/react";
import PasswordValidationIndicator from "./PasswordValidationIndicator";
import { useEffect } from "react";

const validatePassword = (password: string) => {
  return [
    {
      message: "The password needs to have at least 8 characters.",
      isValid: password.length >= 8,
    },
    {
      message: "The password needs to have at least one capital letter.",
      isValid: /[A-Z]/.test(password),
    },
    {
      message: "The password needs to have at least one lowercase letter.",
      isValid: /[a-z]/.test(password),
    },
    {
      message: "The password needs to have at least one special character.",
      isValid: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
    },
  ];
};

export const PasswordValidation = ({
  password,
  onValidationChange,
}: {
  password: string;
  onValidationChange?: (errors: string[]) => void;
}) => {
  const errors = validatePassword(password);
  const failedErrors = errors.filter((e) => !e.isValid).map((e) => e.message);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(failedErrors);
    }
  }, [password]);

  return (
    <Box mt={2}>
      <PasswordValidationIndicator errors={errors} />
    </Box>
  );
};
