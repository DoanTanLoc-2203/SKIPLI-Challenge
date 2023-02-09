export const handleShowMessage = (toast) => (message, code) => {
  toast &&
    toast({
      title: `Status code: ${code}`,
      description: message,
      status: code == 200 ? "success" : "error",
      duration: 3000,
      variant: "top-accent",
      isClosable: true,
      position: "top-right"
    });
};
