import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputProps = ChakraInputProps & {
  name: string;
  label?: string;
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl id={name} isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        {...rest}
        ref={ref}
        size="lg"
        focusBorderColor="blue.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: "gray.900" }}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
