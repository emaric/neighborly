import { useState, useEffect } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Card, Button, Spinner } from "react-bootstrap";

const GET_COMMENTS = gql`
  query getCommentsByParentId($parentId: String!) {
    getCommentsByParentId(parentId: $parentId) {
      id
      parentId
      content
      userId
      createdAt
      updatedAt
    }
  }
`;

const GET_COMMENT_COUNT = gql`
  query getCommentCountByParentId($parentId: String!) {
    getCommentCountByParentId(parentId: $parentId)
  }
`;

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
    }
  }
`;

const CommentListComponent = ({ parentId }) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { parentId },
  });

  useEffect(() => {
    refetch();
  }, [parentId, refetch]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Error loading comments.</p>;

  return (
    <>
      {data?.getCommentsByParentId.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

const CommentItem = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [fetchReplies, { data, loading }] = useLazyQuery(GET_COMMENTS);
  const { data: countData } = useQuery(GET_COMMENT_COUNT, {
    variables: { parentId: comment.id },
  });
  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: comment.userId },
  });

  const handleShowReplies = () => {
    if (!showReplies) {
      fetchReplies({ variables: { parentId: comment.id } });
    }
    setShowReplies(!showReplies);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="fw-bold">
          {userData?.getUser?.username || "Loading..."}
        </Card.Title>
        <Card.Text>{comment.content}</Card.Text>
        <small className="text-muted">
          {new Date(comment.createdAt).toLocaleString()}
        </small>
        {countData?.getCommentCountByParentId > 0 && (
          <Button
            variant="link"
            onClick={handleShowReplies}
            className="p-0 ms-2"
          >
            {countData.getCommentCountByParentId} Replies
          </Button>
        )}
        {showReplies && (
          <div className="mt-2 ms-3 border-start ps-2">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <div className="ps-2">
                <CommentListComponent parentId={comment.id} />
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentListComponent;
