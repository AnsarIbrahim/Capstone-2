import getCommentsLength from '../popup/commentCounter.js';

describe('getCommentsLength', () => {
  it('should return the correct length of unique comments', () => {
    const comments = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' },
      { id: 3, text: 'Comment 3' },
      { id: 2, text: 'Comment 2' },
    ];

    const expectedLength = 3;

    const result = getCommentsLength(comments);

    expect(result).toBe(expectedLength);
  });

  it('should return 0 if comments array is empty', () => {
    const comments = [];

    const expectedLength = 0;

    const result = getCommentsLength(comments);

    expect(result).toBe(expectedLength);
  });
});
