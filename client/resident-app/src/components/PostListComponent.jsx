import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
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

function PostListComponent() {
  const { error, data, loading } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);

  // useLazyQuery for user and comment count
  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (error) {
      setPosts([]);
    } else if (data?.getPosts) {
      // Initialize posts with placeholders
      const initialPosts = data.getPosts.map((post) => ({
        ...post,
        user: { username: "Loading..." }, // Placeholder
        comment_count: 0, // Placeholder
      }));
      setPosts(initialPosts);

      // Fetch user and comment count for each post
      initialPosts.forEach((post) => {
        fetchUser({ variables: { userId: post.userId } }).then(({ data }) => {
          if (data?.getUser) {
            setPosts((prev) =>
              prev.map((p) =>
                p.id === post.id ? { ...p, user: data.getUser } : p
              )
            );
          }
        });

        fetchCommentCount({ variables: { parentId: post.id } }).then(
          ({ data }) => {
            if (data?.getCommentCountByParentId !== undefined) {
              setPosts((prev) =>
                prev.map((p) =>
                  p.id === post.id
                    ? { ...p, comment_count: data.getCommentCountByParentId }
                    : p
                )
              );
            }
          }
        );
      });
    }
  }, [data, error, fetchUser, fetchCommentCount]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container>
      <h2 className="mb-4">News/Discussions</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <a href="#" className="post-link">
                    {post.title}
                  </a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By <strong>{post.user.username}</strong>
                </Card.Subtitle>
                <Card.Text className="post-content">{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <Badge bg="secondary">{post.comment_count} comments</Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostListComponent;
