import attachLikeButtonListeners from './likeBtn.js';
import generateCardHtml from '../popup/comment.js';
import attachCommentButtonListeners from '../popup/commentBtn.js';
import itemCounter from './itemCounter.js';

import { TvAPI } from '../API/API.js';

const home = document.getElementById('card');

const id = 6; // Set the desired range of IDs, e.g., from 1 to 10

const ListApi = async () => {
  const fetchPromises = Array.from({ length: id }, (_, i) => i + 1)
    .map((i) => `${TvAPI}${i}`)
    .map((tvApi) => fetch(tvApi));

  try {
    const responses = await Promise.all(fetchPromises);

    await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const cardHtml = generateCardHtml(data);
        home.innerHTML += cardHtml;
      }),
    );

    itemCounter(id); // Call itemCounter with the desired count
    attachCommentButtonListeners();
    attachLikeButtonListeners(); // Attach event listeners after the buttons are added to the DOM
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export default ListApi;
