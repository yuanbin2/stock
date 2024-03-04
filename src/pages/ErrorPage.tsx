import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={4}>
        Oops! Something went wrong.
      </Heading>
      <Text fontSize="lg" mb={4}>
        The page you are looking for could not be found.
      </Text>
      <Button as={Link} to="/" colorScheme="blue" size="md">
        Go back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
