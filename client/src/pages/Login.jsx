import {
  Button,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Select,
  useToast,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { phoneCode } from "../constants/phoneCode";
import { handleShowMessage } from "../helpers/showMessage";
import { formatPhoneError, requiredError } from "../helpers/validate";
import { Post } from "../services/axios.service";

export default function Login() {
  const [phone, setPhone] = useState({
    number: "",
    code: "",
  });
  const [error, setError] = useState({
    number: "",
    code: "",
  });
  const [accessCode, setAccessCode] = useState("");
  const [isVerifyStep, setIdVeriyStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handleLogin = async () => {
    const { number, code } = phone;
    const newError = { ...error };
    let isValid = true;
    const phoneEmptyError = requiredError(number, "Phone number");
    const phoneFormatError = formatPhoneError(code + number, "Phone number");

    newError.code = requiredError(code, "Country code");
    newError.number = phoneEmptyError ? phoneEmptyError : phoneFormatError;
    if (newError.code || newError.number) isValid = false;
    setError(newError);

    if (isValid) {
      setIsLoading(true);
      const response = await Post(
        "/create",
        { phoneNumber: code + number },
        handleShowMessage(toast)
      );
      setIsLoading(false);
      if (response) setIdVeriyStep(true);
    }
  };

  const handleResentCode = async () => {
    const { number, code } = phone;
    setIsLoading(true);
    await Post(
      "/create",
      { phoneNumber: code + number },
      handleShowMessage(toast)
    );
    setIsLoading(false);
  };

  const handleVerifyCode = async () => {
    const { number, code } = phone;
    setIsLoading(true);
    const response = await Post(
      "/create/verify",
      { phoneNumber: code + number, accessCode },
      handleShowMessage(toast)
    );
    if (response) {
      navigate("/");
      localStorage.setItem("phoneNumber", code + number);
    }
    setIsLoading(false);
  };

  const handleChange = (key) => (event) => {
    setPhone({
      ...phone,
      [key]: event?.target?.value,
    });
  };

  const handleInputCode = (value) => {
    setAccessCode(value);
  };

  return (
    <VStack spacing="10px" w="100%" textAlign="center">
      {isVerifyStep ? (
        <>
          <VStack spacing="16px">
            <HStack justifyContent="center">
              <PinInput isDisabled={isLoading} onChange={handleInputCode}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button
              colorScheme="blue"
              variant="link"
              mt="0"
              onClick={handleResentCode}
              isDisabled={isLoading}
              isLoading={isLoading}
              loadingText="Sending..."
            >
              Resend access code
            </Button>
            <Button
              colorScheme="green"
              isDisabled={isLoading}
              onClick={handleVerifyCode}
            >
              Verify
            </Button>
          </VStack>
        </>
      ) : (
        <>
          <HStack w="100%" justifyContent="center" flexWrap="wrap" spacing="16px">
            <Select
              value={phone?.code}
              onChange={handleChange("code")}
              placeholder="Country"
              maxW="150px"
              isInvalid={error?.code}
              isDisabled={isLoading}
            >
              {phoneCode
                .sort((a, b) => {
                  if (a?.name > b?.name) return 1;
                  else return -1;
                })
                .map((country, idx) => {
                  return (
                    <option key={idx} value={country?.dial_code}>
                      {`${country?.code}(${country?.dial_code})`}
                    </option>
                  );
                })}
            </Select>
            <Input
              type="number"
              placeholder="Phone number"
              maxW="300px"
              w="100%"
              value={phone?.number}
              isInvalid={error?.number}
              onChange={handleChange("number")}
              isDisabled={isLoading}
            />
            <Button
              colorScheme="blue"
              mt="0"
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Sending..."
            >
              Send
            </Button>
          </HStack>
          <ErrorMessage message={error?.code} />
          <ErrorMessage message={error?.number} />
        </>
      )}
    </VStack>
  );
}
