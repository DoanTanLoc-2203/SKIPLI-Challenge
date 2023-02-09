import { Text } from "@chakra-ui/react";

const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <Text display={String(message).length > 0 ? "block" : "none"} color="#E53E3E" mt="0">
      {message}
    </Text>
  );
};

export default ErrorMessage;
