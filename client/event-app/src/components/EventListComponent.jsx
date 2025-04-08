import { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  Row,
  Col,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Loader from "./UI/Loader";

const GET_EVENTS = gql`
  query GetEvents {
    getEvents {
      id
      title
      description
      location
      datetime
      userId
      volunteers
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

const EventListComponent = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);
  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount] = useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    const _events =
      data?.getEvents?.map((event) => {
        return {
          ...event,
          link: `/events/${event.id}`,
          user: { username: null },
          comment_count: null,
        };
      }) || [];

    setEvents(_events);

    _events.forEach((event) => {
      fetchUser({ variables: { userId: event.userId } }).then(({ data }) => {
        if (data?.getUser) {
          setEvents((prev) =>
            prev.map((e) =>
              e.id === event.id ? { ...e, user: data.getUser } : e
            )
          );
        }
      });

      fetchCommentCount({
        variables: { parentId: event.id },
      }).then(({ data }) => {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === event.id
              ? { ...e, comment_count: data?.getCommentCountByParentId || 0 }
              : e
          )
        );
      });
    });
  }, [data, loading, error]);

  return (
    <Container>
      <h2 className="mb-4">Community Events</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}
      <Row xs={1} md={2} lg={3} className="g-4">
        {events.map((event) => (
          <Col key={event.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <Link to={event.link}>{event.title}</Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  📅 {new Date(Number(event.datetime)).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>{event.description}</Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    📍 <strong>Location:</strong> {event.location}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    👤 <strong>Organizer:</strong>{" "}
                    {event.user.username == null ? (
                      <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                    ) : (
                      event.user.username
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    🙋‍♂️ <strong>Volunteers:</strong>{" "}
                    {event.volunteers.length > 0 ? (
                      <>
                        {event.volunteers.length}
                        <br />
                        {event.volunteers.slice(0, 2).join(", ")}
                        {event.volunteers.length > 2 && "..."}
                      </>
                    ) : (
                      <span>🙅‍♀️ No volunteers yet</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-muted d-flex justify-content-between align-items-center small">
                Created on {new Date(Number(event.createdAt)).toLocaleString()}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventListComponent;
