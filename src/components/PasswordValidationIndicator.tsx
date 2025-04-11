import { DataList } from "@chakra-ui/react";
import { CiCircleRemove, CiCircleCheck } from "react-icons/ci";

interface PasswordValidationIndicatorProps {
  errors: { message: string; isValid: boolean }[];
}

export default function PasswordValidationIndicator({
  errors,
}: PasswordValidationIndicatorProps) {
  return (
    <DataList.Root variant="subtle" style={{ gap: "4px", width: "100%" }}>
      {errors.map((error, index) => {
        const iconColor = error.isValid ? "green" : "red";
        const textColor = error.isValid ? "gray.900" : "gray.500";
        const Icon = error.isValid ? CiCircleCheck : CiCircleRemove;

        return (
          <DataList.Item
            key={index}
            style={{ marginBottom: "2px", width: "100%" }}
          >
            <DataList.ItemLabel
              color={textColor}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {error.message}
              <Icon
                style={{
                  color: iconColor,
                  fontSize: "20px",
                }}
              />
            </DataList.ItemLabel>
          </DataList.Item>
        );
      })}
    </DataList.Root>
  );
}
