import { TvAPI } from '../API/API.js';

const generateCardHtml = (data) => `
  <div class="card col mt-3">
    <img src="${data.image.medium}" alt="#" class="mt-2"/>
    <p class="mt-2">${data.name}</p>
    <i class="fa-regular fa-heart like-button" id="${data.id}"></i>
    <p class="like-count" id="${data.id}">Likes</p>
    <button class="btn btn-outline-secondary btn-lg mt-2 mb-3 comment-button" data-tvapi="${TvAPI}${data.id}">Comment</button>
  </div>
`;

export default generateCardHtml;
