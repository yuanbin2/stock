import useComment from "../Hooks/useComment";
import { Box, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
const MyComment = () => {
  const { data: comments, isLoading, isError } = useComment();

  if (!comments || comments.length === 0) {
    return <Text>没有做过任何评论</Text>;
  }
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
            <Text>股票ID: {comment.stock}</Text>
            <Text>{comment.content}</Text>
            <Text>{format(new Date(comment.time), "yyyy-MM-dd HH:mm:ss")}</Text>
          </Box>
        ))}
    </VStack>
  );
};

export default MyComment;
