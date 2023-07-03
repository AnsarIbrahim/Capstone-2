const getCommentsLength = (comments) => {
  const uniqueComments = [
    ...new Set(comments.map((comment) => JSON.stringify(comment))),
  ].map((comment) => JSON.parse(comment));

  return uniqueComments.length;
};

export default getCommentsLength;
