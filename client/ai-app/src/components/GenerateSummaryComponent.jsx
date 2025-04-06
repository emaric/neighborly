import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_POST_SUMMARY = gql`
  query GetPostSummary($postId: String!) {
    getPostSummary(postId: $postId) {
      summary
      updatedAt
    }
  }
`;

const SUMMARIZE_POST = gql`
  mutation SummarizePost($postId: String!) {
    summarizePost(postId: $postId, force: true) {
      summary
      updatedAt
    }
  }
`;

function GenerateSummaryComponent({ postId }) {
  const { data, loading, error } = useQuery(GET_POST_SUMMARY, {
    variables: { postId },
  });
  const [
    summarizePost,
    { loading: loadingNewSummary, error: errorSummarizing },
  ] = useMutation(SUMMARIZE_POST, {
    variables: { postId },
  });

  const [summary, setSummary] = useState({
    text: data?.getPostSummary?.summary,
    date: data?.getPostSummary?.updatedAt,
  });

  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const _summary = data?.getPostSummary;
    setSummary({
      text: _summary?.summary,
      date: _summary?.updatedAt
        ? new Date(Number(_summary?.updatedAt)).toLocaleString()
        : null,
    });
  }, [data]);

  const handleGenerate = async () => {
    setSummary(null);
    const { data } = await summarizePost();
    const _summary = data?.summarizePost;
    setSummary({
      text: _summary?.summary,
      date: _summary?.updatedAt
        ? new Date(Number(_summary?.updatedAt)).toLocaleString()
        : null,
    });
  };

  return (
    <Container>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setIsShowing(!isShowing)} variant="link">
          {isShowing ? "Hide" : "Show AI Generated Summary"}
        </Button>
      </div>

      {isShowing && (
        <Card className="mb-3">
          <Card.Body>
            {loading ||
              (loadingNewSummary && (
                <div className="text-muted">Loading...</div>
              ))}
            {error && <div className="text-danger">Error: {error.message}</div>}
            {errorSummarizing && (
              <div className="text-danger">
                Error: {errorSummarizing.message}
              </div>
            )}
            {summary?.text && (
              <div className="summary-text">
                <ReactMarkdown>{summary.text}</ReactMarkdown>
              </div>
            )}
            {!summary?.text && !loading && !loadingNewSummary && (
              <div className="text-muted">
                No summary generated yet. Please click "Generate Summary".
              </div>
            )}
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between align-items-center small text-muted">
            <div>
              {summary?.date && (
                <>
                  AI Generated Summary
                  <span className="mx-1">•</span>
                  {summary.date}
                </>
              )}
            </div>
            <Button
              onClick={handleGenerate}
              variant="link"
              disabled={loading || loadingNewSummary}
            >
              {summary?.text ? "Regenerate" : "Generate Summary"}
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default GenerateSummaryComponent;
