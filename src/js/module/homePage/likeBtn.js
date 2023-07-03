import { baseUrl, appId } from '../API/API.js';

const getReaction = async () => {
  const url = `${baseUrl}${appId}/likes`;
  const result = await fetch(`${url}`);
  const data = await result.json();
  return data;
};

const displayReaction = async (likeCounts) => {
  const totalLikes = await getReaction();
  totalLikes.forEach((totalLike) => {
    likeCounts.forEach((likeCount) => {
      if (totalLike.item_id === likeCount.id) {
        likeCount.textContent = `${totalLike.likes} likes`;
      }
    });
  });
};

const sendReactionToApi = async (likeBtn, likeCounts) => {
  likeBtn.addEventListener('click', async (e) => {
    const reactions = { item_id: `${e.target.id}` };
    const url = `${baseUrl}${appId}/likes`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(reactions),
    };

    await fetch(`${url}`, requestOptions);
    displayReaction(likeCounts);

    // Change heart icon to full icon with color
    likeBtn.classList.toggle('far');
    likeBtn.classList.toggle('fas');
    likeBtn.style.color = likeBtn.classList.contains('fas') ? 'purple' : '';
  });
};

const attachLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  const likeCounts = document.querySelectorAll('.like-count');
  likeButtons.forEach((likeButton) => sendReactionToApi(likeButton, likeCounts));
  displayReaction(likeCounts);
};

export default attachLikeButtonListeners;
