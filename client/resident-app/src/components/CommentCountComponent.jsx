import { Badge, Spinner } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const GET_COMMENT_COUNT = gql`
  query GetCommentCount($parentId: String!) {
    getCommentCountByParentId(parentId: $parentId)
  }
`;

function CommentCountComponent({ parentId }) {
    const { loading, data } = useQuery(GET_COMMENT_COUNT, {
        variables: { parentId }
    }, {
        fetchPolicy: "cache-and-network"
    });

    return (
        <>
            <Badge bg="secondary">
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
                    data?.getCommentCountByParentId
                )}{" "}
                comments
            </Badge>
        </>
    );
};

export default CommentCountComponent