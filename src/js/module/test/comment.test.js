import generateCommentHTML from '../popup/commentshow.js';

test('generateCommentHTML should generate correct comment HTML', () => {
  const comment = {
    creation_date: '2023-06-28',
    username: 'JohnDoe',
    comment: 'This is a test comment.',
  };

  const expectedHTML = `<p class="mt-2 comment-p">${comment.creation_date} ${comment.username}: ${comment.comment}</p>`;

  const generatedHTML = generateCommentHTML(comment);

  expect(generatedHTML.trim()).toBe(expectedHTML.trim());
});
