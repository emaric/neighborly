import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_HELP_REQUESTS = gql`
  query GetHelpRequests {
    getHelpRequests {
      id
      title
      description
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

function HelpRequestListComponent() {
  const { error, data, loading } = useQuery(GET_HELP_REQUESTS);
  const [helpRequests, setHelpRequests] = useState([]);

  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (error) {
      setHelpRequests([]);
    } else if (data?.getHelpRequests) {
      const initialHelpRequests = data.getHelpRequests.map((helpRequest) => ({
        ...helpRequest,
        user: { username: null },
        comment_count: null,
        link: `/help-requests/${helpRequest.id}`,
        descriptionPreview:
          helpRequest.description.length > 100
            ? helpRequest.description.substring(0, 100) + "..."
            : helpRequest.description,
      }));
      setHelpRequests(initialHelpRequests);

      initialHelpRequests.forEach((helpRequest) => {
        fetchUser({ variables: { userId: helpRequest.userId } }).then(({ data }) => {
          if (data?.getUser) {
            setHelpRequests((prev) =>
              prev.map((req) =>
                req.id === helpRequest.id ? { ...req, user: data.getUser } : req
              )
            );
          }
        });

        fetchCommentCount({ variables: { parentId: helpRequest.id } }).then(({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setHelpRequests((prev) =>
              prev.map((req) =>
                req.id === helpRequest.id
                  ? { ...req, comment_count: data.getCommentCountByParentId }
                  : req
              )
            );
          }
        });
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
      <h2 className="mb-4">Help Requests</h2>
      <Row>
        {helpRequests.map((helpRequest) => (
          <Col key={helpRequest.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <Link to={helpRequest.link} className="post-link">
                    {helpRequest.title}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By{" "}
                  <strong>
                    {helpRequest.user.username == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      helpRequest.user.username
                    )}
                  </strong>
                </Card.Subtitle>
                <Card.Text className="post-content">
                  {helpRequest.descriptionPreview}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                <small>
                  {new Date(Number(helpRequest.createdAt)).toLocaleString()}
                </small>
                <Link to={helpRequest.link} className="text-decoration-none">
                  <Badge bg="secondary">
                    {helpRequest.comment_count == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      helpRequest.comment_count
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

export default HelpRequestListComponent;
