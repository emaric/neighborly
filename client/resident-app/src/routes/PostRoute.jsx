import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import PostComponent from "../components/PostComponent";

const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(id: $postId) {
      id
      title
      content
      userId
      createdAt
    }
  }
`;


const PostRoute = () => {
  const { postId } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });

  // if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post.</p>;
  // if (!data?.getPost) return <p>Post not found.</p>;

  return (
    <PostComponent post={data?.getPost} />
  );
};

export default PostRoute;
