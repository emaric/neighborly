import { GraphQLClient, gql } from "graphql-request";
import { COMMENT_PORT, RESIDENT_PORT } from "../../common/config.js";

const postServiceUrl = `http://localhost:${RESIDENT_PORT}/graphql`;
const commentServiceUrl = `http://localhost:${COMMENT_PORT}/graphql`;

const postClient = new GraphQLClient(postServiceUrl);
const commentClient = new GraphQLClient(commentServiceUrl);

async function getCommentsByParentId(parentId) {
  try {
    const { getCommentsByParentId: commentData } = await commentClient.request(
      gql`
        query GetCommentsByParentId($parentId: String!) {
          getCommentsByParentId(parentId: $parentId) {
            id
            content
            userId
          }
        }
      `,
      { parentId }
    );

    const comments = commentData;
    const _comments = comments.map(async (c) => ({
      content: c.content,
      userId: c.userId,
      replies: await getCommentsByParentId(c.id),
    }));
    const allComments = await Promise.all(_comments);
    return allComments;
  } catch (e) {
    throw new Error("Error fetching comments.");
  }
}

export async function getPostDetails(postId) {
  try {
    const { getPost: postData } = await postClient.request(
      gql`
        query GetPost($postId: ID!) {
          getPost(id: $postId) {
            title
            content
            userId
          }
        }
      `,
      { postId }
    );

    const post = postData;
    const comments = await getCommentsByParentId(postId);

    return {
      post,
      comments,
    };
  } catch (e) {
    throw new Error("Error fetching post details.");
  }
}
