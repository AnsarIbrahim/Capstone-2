import openPopup from './popup.js';

const attachCommentButtonListeners = () => {
  const commentButtons = document.querySelectorAll('.comment-button');
  commentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const tvApi = button.getAttribute('data-tvapi');
      const response = await fetch(tvApi);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      openPopup(data);
    });
  });
};

export default attachCommentButtonListeners;
