import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_EMERGENCY_ALERTS = gql`
  query GetEmergencyAlerts {
    getEmergencyAlerts {
      id
      message  
      location
      urgencyLevel
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

function EmergencyAlertListComponent() {
  const { error, data, loading } = useQuery(GET_EMERGENCY_ALERTS);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);

  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (error) {
      setEmergencyAlerts([]);
    } else if (data?.getEmergencyAlerts) {
      const initialEmergencyAlerts = data.getEmergencyAlerts.map((alert) => ({
        ...alert,
        user: { username: null },
        comment_count: null,
        link: `/emergency-alerts/${alert.id}`,
      }));
      setEmergencyAlerts(initialEmergencyAlerts);

      initialEmergencyAlerts.forEach((alert) => {
        fetchUser({ variables: { userId: alert.userId } }).then(({ data }) => {
          if (data?.getUser) {
            setEmergencyAlerts((prev) =>
              prev.map((a) =>
                a.id === alert.id ? { ...a, user: data.getUser } : a
              )
            );
          }
        });

        fetchCommentCount({ variables: { parentId: alert.id } }).then(({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setEmergencyAlerts((prev) =>
              prev.map((a) =>
                a.id === alert.id
                  ? { ...a, comment_count: data.getCommentCountByParentId }
                  : a
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
      <h2 className="mb-4">Emergency Alerts</h2>
      <Row>
        {emergencyAlerts.map((alert) => (
          <Col key={alert.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <Link to={alert.link} className="post-link">
                    {alert.message}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By{" "}
                  <strong>
                    {alert.user.username == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      alert.user.username
                    )}
                  </strong>
                </Card.Subtitle>
                <Card.Text className="post-content">
                  {alert.message}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                <small>
                  {new Date(Number(alert.createdAt)).toLocaleString()}
                </small>
                <Link to={alert.link} className="text-decoration-none">
                  <Badge bg="secondary">
                    {alert.comment_count == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      alert.comment_count
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

export default EmergencyAlertListComponent;
