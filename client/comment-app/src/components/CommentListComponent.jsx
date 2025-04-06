import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card, Button, Spinner } from "react-bootstrap";
import CreateCommentComponent from "./CreateCommentComponent";

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

const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(id: $commentId) {
      id
    }
  }
`;

const CommentListComponent = ({ parentId, user }) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { parentId },
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    refetch();
  }, [parentId, refetch]);

  useEffect(() => {
    if (data?.getCommentsByParentId) {
      setComments(data.getCommentsByParentId);
    }
  }, [data]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Error loading comments.</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          user={user}
          onDelete={() => {
            setComments((c) => [...c.filter((c) => c.id !== comment.id)]);
          }}
        />
      ))}
    </>
  );
};

const CommentItem = ({ comment, user, onDelete }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const {
    data: countData,
    refetch: refetchReplyCount,
    loading: loadingReplyCount,
  } = useQuery(GET_COMMENT_COUNT, {
    variables: { parentId: comment.id },
  });
  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: comment.userId },
  });
  const [deleteComment, { loading: loadingDelete }] = useMutation(
    DELETE_COMMENT,
    {
      variables: { commentId: comment.id },
    }
  );

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleToggleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleDelete = () => {
    deleteComment();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="fw-bold">
          {userData?.getUser?.username || "Loading..."}
        </Card.Title>
        <Card.Text>{comment.content}</Card.Text>
        <small className="text-muted">
          {new Date(Number(comment.createdAt)).toLocaleString()}
        </small>

        <div className="d-flex gap-2 mt-2">
          {loadingReplyCount && (
            <Spinner size="sm" animation="border" as="span" />
          )}
          {!loadingReplyCount && countData?.getCommentCountByParentId > 0 && (
            <Button
              variant="link"
              onClick={handleShowReplies}
              className="p-0 ms-2"
              disabled={loadingDelete}
            >
              {countData.getCommentCountByParentId} Replies
            </Button>
          )}
          <Button
            disabled={loadingDelete}
            variant="link"
            onClick={handleToggleReply}
            className="p-0"
          >
            {showReplyForm ? "Cancel Reply" : "Reply"}
          </Button>

          {user?.id === comment.userId && (
            <Button
              variant="link"
              onClick={handleDelete}
              className="p-0 text-danger"
              disabled={loadingDelete}
            >
              Delete
              {loadingDelete && (
                <Spinner size="sm" animation="border" as="span" />
              )}
            </Button>
          )}
        </div>

        {showReplyForm && (
          <div className="mt-2 ms-3 border-start ps-2">
            <CreateCommentComponent
              parentId={comment.id}
              onSuccess={() => {
                setShowReplyForm(false);
                refetchReplyCount();
              }}
            />
          </div>
        )}

        {showReplies && (
          <div className="mt-2 ms-3 border-start ps-2">
            <div className="ps-2">
              <CommentListComponent
                parentId={comment.id}
                user={user}
                onDelete={() => refetchReplyCount()}
              />
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentListComponent;
