import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import EventComponent from "../components/EventComponent";

const GET_EVENT = gql`
  query GetEvent($eventId: ID!) {
    getEvent(id: $eventId) {
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

const EventRoute = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  const [event, setEvent] = useState(null);
  const [fetchUser, { loading: loadingUser }] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (data?.getEvent) {
      const fetchedEvent = {
        ...data.getEvent,
        user: { username: "Loading..." },
        comment_count: 0,
      };

      setEvent(fetchedEvent);

      fetchUser({ variables: { userId: data.getEvent.userId } }).then(
        ({ data }) => {
          if (data?.getUser) {
            setEvent((prev) => ({ ...prev, user: data.getUser }));
          }
        }
      );
    }
  }, [data, fetchUser]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error loading event.</p>;
  if (!event) return <p>Event not found.</p>;

  return <EventComponent event={event} loadingUser={loadingUser} />;
};

export default EventRoute;
