import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import UsernameComponent from "./UsernameComponent";
import CommentCountComponent from "./CommentCountComponent";

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

function PostListComponent() {
  const { error, data, loading } = useQuery(GET_POSTS, { fetchPolicy: "cache-and-network" });

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
        {data?.getPosts?.map((post) => {
          const link = `/posts/${post.id}`;
          return (
            <Col key={post.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    <Link to={link} className="post-link">
                      {post.title}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <UsernameComponent userId={post.userId} />
                  </Card.Subtitle>
                  <Card.Text className="post-content">
                    {post.contentPreview}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                  <small>
                    {new Date(Number(post.createdAt)).toLocaleString()}
                  </small>
                  <Link to={link} className="text-decoration-none">
                    <CommentCountComponent parentId={post.id} />
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default PostListComponent;
