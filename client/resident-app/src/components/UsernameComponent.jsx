import { memo } from "react";
import { Spinner } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
    }
  }
`;

function UsernameComponent({ userId }) {
    const { loading, data } = useQuery(GET_USER, {
        variables: { userId },
    });

    return (
        <>
            By{" "}
            <strong>
                {loading ? (
                    <Spinner
                        as="span"
                        animation="border"
                        style={{ width: "0.8rem", height: "0.8rem" }}
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                    />
                ) : (
                    data?.getUser?.username
                )}
            </strong>
        </>
    );
};

export default memo(UsernameComponent);