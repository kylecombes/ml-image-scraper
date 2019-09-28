import axios from 'axios';

// TODO: Put your API key here
const SERP_API_KEY = null;

const API_URL = `https://serpapi.com/search?tbm=isch&api_key=${SERP_API_KEY}&q=`;

export const getImages = (query, number=100) => {
  return new Promise(async resolve => {
    let res = [];
    let queryPromises = [];

    const numBatches = Math.ceil(number / 100);
    for (let b = 0; b < numBatches; ++b) {
      queryPromises.push(axios.get(API_URL + query + '&ijn=' + b)
        .then(res => res.data.images_results)
        .then(images => {
          for (let i = 0; i < images.length; ++i) {
            res.push(images[i].original);
          }
        }));
    }
    await Promise.all(queryPromises);
    resolve(res);
  });
};
