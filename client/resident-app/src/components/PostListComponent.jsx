import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      contentPreview
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

  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (error) {
      setPosts([]);
    } else if (data?.getPosts) {
      const initialPosts = data.getPosts.map((post) => ({
        ...post,
        user: { username: null },
        comment_count: null,
        link: `/posts/${post.id}`,
      }));
      setPosts(initialPosts);

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
                  <Link to={post.link} className="post-link">
                    {post.title}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By{" "}
                  <strong>
                    {post.user.username == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      post.user.username
                    )}
                  </strong>
                </Card.Subtitle>
                <Card.Text className="post-content">
                  {post.contentPreview}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                <small>
                  {new Date(Number(post.createdAt)).toLocaleString()}
                </small>
                <Link to={post.link} className="text-decoration-none">
                  <Badge bg="secondary">
                    {post.comment_count == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      post.comment_count
                    )}{" "}
                    comments
                  </Badge>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostListComponent;
