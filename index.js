'use strict';

const request = require('request');
const utils = {
  /**
   * Gets a random item from given array.
   * @param {Array} list - an array.
   * @returns {*} random item fron the array.
   */
  getRandom(list) {
    return list[Math.floor(Math.random() * (list.length - 1))];
  }
};

const keys = require('./keys.json');

module.exports = {
  /**
   * Gets source of an image related to the query.
   * @param {string} query - topic of the image.
   * @return {Promise} promise handler.
   */
  getSource: function(query) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://danbooru.donmai.us/posts.json?tags=${query}`,
        auth: {
          user: keys.user,
          pass: keys.key
        }
      }, (error, response, body) => {
        if (error || response.statusCode >= 400) {
          reject({
            error,
            response
          });
        } else {
          const data = JSON.parse(body);

          const source = utils.getRandom(data);

          resolve({
            url: source.file_url,
            source: `https://danbooru.donmai.us/posts/${source.id}`,
          });
        }
      });
    });
  }
};
