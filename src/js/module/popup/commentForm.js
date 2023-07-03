import { baseUrl, appId } from '../API/API.js';

const fetchComments = (refreshPopup) => {
  const itemId = 'item1';
  fetch(`${baseUrl}${appId}/comments?item_id=${itemId}`)
    .then((res) => res.json())
    .then((comments) => {
      refreshPopup(comments); // Pass the updated comments to refresh the popup
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error occurred while fetching comments:', error);
    });
};

const submitComment = (refreshPopup) => {
  const nameInput = document.getElementById('name-input');
  const insightsInput = document.getElementById('insights-input');

  const name = nameInput.value;
  const insights = insightsInput.value;

  const newComment = {
    item_id: 'item1',
    username: name,
    comment: insights,
  };

  fetch(`${baseUrl}${appId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  })
    .then((response) => {
      if (response.status === 201) {
        nameInput.value = '';
        insightsInput.value = '';
        refreshPopup();
        fetchComments(refreshPopup);
      } else {
        throw new Error('Error occurred while adding the comment');
      }
    })
    .catch((error) => {
      throw new Error(`Error occurred while adding the comment: ${error}`);
    });
};

export default submitComment;
