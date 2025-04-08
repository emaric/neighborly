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

const GET_COMMENT_COUNT = gql`
  query GetCommentCount($parentId: String!) {
    getCommentCountByParentId(parentId: $parentId)
  }
`;

const EventRoute = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  const [event, setEvent] = useState(null);
  const [fetchUser, { loading: loadingUser }] = useLazyQuery(GET_USER);
  const [fetchCommentCount, { loading: loadingCommentCount }] =
    useLazyQuery(GET_COMMENT_COUNT);

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

      fetchCommentCount({ variables: { parentId: data.getEvent.id } }).then(
        ({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setEvent((prev) => ({
              ...prev,
              comment_count: data.getCommentCountByParentId || 0,
            }));
          }
        }
      );
    }
  }, [data, fetchUser, fetchCommentCount]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error loading event.</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <EventComponent
      event={event}
      loadingCommentCount={loadingCommentCount}
      loadingUser={loadingUser}
    />
  );
};

export default EventRoute;
