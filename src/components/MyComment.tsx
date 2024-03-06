import useComment from "../Hooks/useComment";
import { Box, Text, VStack } from "@chakra-ui/react";
const MyComment = () => {
  const { data: comments, isLoading, isError } = useComment();

  if (isLoading) {
    return <Text>Loading comments...</Text>;
  }

  if (isError) {
    return <Text>Error fetching comments.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {comments &&
        comments.map((comment) => (
          <Box key={comment.id} borderWidth="1px" borderRadius="md" p={4}>
            <Text fontWeight="bold">Customer: {comment.customer}</Text>
            <Text>Stock: {comment.stock}</Text>
            <Text>{comment.content}</Text>
            <Text>{comment.time}</Text>
          </Box>
        ))}
    </VStack>
  );
};

export default MyComment;
