import { baseUrl, appId } from '../API/API.js';
import submitComment from './commentForm.js';
import generateCommentHTML from './commentshow.js';
import getCommentsLength from './commentCounter.js';

const openPopup = (data) => {
  if (!data) {
    return;
  }

  const itemId = 'item1';
  const fetchComments = () => {
    fetch(`${baseUrl}${appId}/comments?item_id=${itemId}`)
      .then((res) => res.json())
      .then((comments) => {
        const commentsLength = getCommentsLength(comments); // Get the comments length

        const uniqueComments = [
          ...new Set(comments.map((comment) => JSON.stringify(comment))),
        ].map((comment) => JSON.parse(comment));

        const commentsHTML = uniqueComments
          .map((comment) => generateCommentHTML(comment))
          .join('');

        const commentFormHTML = `
          <h2 class="mt-3">Add a comment</h2>
          <form id="comment-form">
            <input type="text" id="name-input" placeholder="Your name" required>
            <input type="text" id="insights-input" placeholder="Your insights" required>
            <button id="comment-button" type="submit">Comment</button>
          </form>
        `;

        const popupContent = `
          <div class="container popup-content">
            <i class="fa-solid fa-xmark close-btn"></i>
            <img src="${data.image.medium}" alt="#" class="popup-image">
            <p class="popup-name">Name: ${data.name}</p>
            <p class="popup-gender">Gender: ${data.gender}</p>
            <p class="popup-country">Country: ${data.country.name}</p>
            <p class="popup-timezone">Timezone: ${data.country.timezone}</p>
          </div>
          <h2>Comments (${commentsLength})</h2> 
          <div class="comment-border border border-light border-3 rounded-5">
            ${commentsHTML}
          </div>
          ${commentFormHTML}
        `;

        const popup = document.getElementById('popup');
        popup.innerHTML = popupContent;
        popup.style.display = 'block';

        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          popup.style.display = 'none';
        });

        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', (event) => {
          event.preventDefault();
          submitComment(fetchComments);
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error occurred while fetching comments:', error);
      });
  };

  fetchComments();
};

export default openPopup;
