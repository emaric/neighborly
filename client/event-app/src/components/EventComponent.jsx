import React from "react";
import {
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Spinner,
  Badge,
} from "react-bootstrap";

const EventComponent = ({
  event,
  loadingUser,
  loadingCommentCount,
  canVolunteer,
  handleVolunteer,
}) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Row>
          {/* Left Column: Event Details */}
          <Col md={8}>
            <Card.Title>{event.title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              📅 {new Date(Number(event.datetime)).toLocaleString()}
            </Card.Subtitle>

            <Card.Text>{event.description}</Card.Text>

            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                📍 <strong>Location:</strong> {event.location}
              </ListGroup.Item>
              <ListGroup.Item>
                👤 <strong>Organizer:</strong>{" "}
                {loadingUser ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  event.user.username
                )}
              </ListGroup.Item>
            </ListGroup>

            {canVolunteer && (
              <Button
                variant="primary"
                onClick={() => handleVolunteer(event.id)}
              >
                🙋 Volunteer for this
              </Button>
            )}
          </Col>

          {/* Right Column: Volunteers */}
          <Col md={4} className="mt-4 mt-md-0">
            <h5>🙋‍♂️ Volunteers ({event.volunteers.length})</h5>
            {event.volunteers.length > 0 ? (
              <ul className="mb-0 mt-2 ps-3">
                {event.volunteers.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-2">🙅‍♀️ No volunteers yet</div>
            )}
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="text-muted d-flex justify-content-between align-items-center small">
        Created on {new Date(Number(event.createdAt)).toLocaleDateString()}
        <Badge bg="secondary">
          {loadingCommentCount ? (
            <Spinner
              as="span"
              animation="border"
              style={{ width: "0.8rem", height: "0.8rem" }}
              role="status"
              aria-hidden="true"
              className="me-1"
            />
          ) : (
            event.comment_count
          )}{" "}
          comments
        </Badge>
      </Card.Footer>
    </Card>
  );
};

export default EventComponent;
