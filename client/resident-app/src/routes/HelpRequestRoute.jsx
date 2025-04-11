import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import HelpRequestComponent from "../components/HelpRequestComponent";

const GET_HELP_REQUEST = gql`
  query GetHelpRequest($helpRequestId: ID!) {
    getHelpRequest(id: $helpRequestId) {
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

const HelpRequestRoute = () => {
  const { helpRequestId } = useParams();
  const { data, loading, error } = useQuery(GET_HELP_REQUEST, {
    variables: { helpRequestId },
  });

  const [helpRequest, setHelpRequest] = useState(null);
  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount, { loading: loadingCommentCount }] =
    useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (data?.getHelpRequest) {
      const fetchedHelpRequest = {
        ...data.getHelpRequest,
        user: { username: "Loading..." },
        comment_count: 0,
      };

      setHelpRequest(fetchedHelpRequest);

      // Fetch user details
      fetchUser({ variables: { userId: data.getHelpRequest.userId } }).then(
        ({ data }) => {
          if (data?.getUser) {
            setHelpRequest((prev) => ({ ...prev, user: data.getUser }));
          }
        }
      );

      // Fetch comment count
      fetchCommentCount({ variables: { parentId: data.getHelpRequest.id } }).then(
        ({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setHelpRequest((prev) => ({
              ...prev,
              comment_count: data.getCommentCountByParentId,
            }));
          }
        }
      );
    }
  }, [data, fetchUser, fetchCommentCount]);

  if (loading) return <p>Loading help request...</p>;
  if (error) return <p>Error loading help request.</p>;
  if (!helpRequest) return <p>Help request not found.</p>;

  return (
    <HelpRequestComponent helpRequest={helpRequest} loadingCommentCount={loadingCommentCount} />
  );
};

export default HelpRequestRoute;
