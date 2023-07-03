const generateCommentHTML = (comment) => `
    <p class="mt-2 comment-p">${comment.creation_date} ${comment.username}: ${comment.comment}</p>
`;

export default generateCommentHTML;
