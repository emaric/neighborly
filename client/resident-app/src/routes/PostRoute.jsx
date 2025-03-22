import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
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

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
    }
  }
`;

const GET_COMMENT_COUNT = gql`
  query GetCommentCount($parentId: String!) {
    getCommentCountByParentId(parentId: $parentId)
  }
`;

const PostRoute = () => {
  const { postId } = useParams(); // Get postId from URL
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });

  const [post, setPost] = useState(null);
  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (data?.getPost) {
      const fetchedPost = {
        ...data.getPost,
        user: { username: "Loading..." }, // Placeholder for user
        comment_count: 0, // Placeholder for comments
      };

      setPost(fetchedPost);

      // Fetch user details
      fetchUser({ variables: { userId: data.getPost.userId } }).then(
        ({ data }) => {
          if (data?.getUser) {
            setPost((prev) => ({ ...prev, user: data.getUser }));
          }
        }
      );

      // Fetch comment count
      fetchCommentCount({ variables: { parentId: data.getPost.id } }).then(
        ({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setPost((prev) => ({
              ...prev,
              comment_count: data.getCommentCountByParentId,
            }));
          }
        }
      );
    }
  }, [data, fetchUser, fetchCommentCount]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post.</p>;
  if (!post) return <p>Post not found.</p>;

  return <PostComponent post={post} />;
};

export default PostRoute;
