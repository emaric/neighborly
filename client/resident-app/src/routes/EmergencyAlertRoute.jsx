import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import EmergencyAlertComponent from "../components/EmergencyAlertComponent";

const GET_EMERGENCY_ALERT = gql`
  query GetEmergencyAlert($emergencyAlertId: ID!) {
    getEmergencyAlert(id: $emergencyAlertId) {
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

const EmergencyAlertRoute = () => {
  const { emergencyAlertId } = useParams();
  const { data, loading, error } = useQuery(GET_EMERGENCY_ALERT, {
    variables: { emergencyAlertId },
  });

  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [fetchUser] = useLazyQuery(GET_USER);
  const [fetchCommentCount, { loading: loadingCommentCount }] =
    useLazyQuery(GET_COMMENT_COUNT);

  useEffect(() => {
    if (data?.getEmergencyAlert) {
      const fetchedEmergencyAlert = {
        ...data.getEmergencyAlert,
        user: { username: "Loading..." },
        comment_count: 0,
      };

      setEmergencyAlert(fetchedEmergencyAlert);

      // Fetch user details
      fetchUser({ variables: { userId: data.getEmergencyAlert.userId } }).then(
        ({ data }) => {
          if (data?.getUser) {
            setEmergencyAlert((prev) => ({ ...prev, user: data.getUser }));
          }
        }
      );

      // Fetch comment count
      fetchCommentCount({ variables: { parentId: data.getEmergencyAlert.id } }).then(
        ({ data }) => {
          if (data?.getCommentCountByParentId !== undefined) {
            setEmergencyAlert((prev) => ({
              ...prev,
              comment_count: data.getCommentCountByParentId,
            }));
          }
        }
      );
    }
  }, [data, fetchUser, fetchCommentCount]);

  if (loading) return <p>Loading emergency alert...</p>;
  if (error) return <p>Error loading emergency alert.</p>;
  if (!emergencyAlert) return <p>Emergency alert not found.</p>;

  return (
    <EmergencyAlertComponent emergencyAlert={emergencyAlert} loadingCommentCount={loadingCommentCount} />
  );
};

export default EmergencyAlertRoute;
