const express = require("express");
const { getRedditPosts } = require("./../routes/reddit");
const { getNewTweets } = require("./../routes/twitter");
const Mention = require("./Mention");

const mentionsInterface = class Interface {
  async getNewestMentions(companies) {
    let mentions = {
      Reddit: [],
      Twitter: []
    };

    let promises = [];

    for (const company of companies) {
      promises.push(getRedditPosts(company, "new", "all"));
      promises.push(getNewTweets(company));
    }

    let posts = await Promise.all(promises);
    for (const post of posts) {
      if(post[0]){
        mentions[post[0].platform] = [...mentions[post[0].platform], ...post];
      }
    }
    return mentions;
  }

  async getAllMentions(companies) {
    let allMentions = {
      Reddit: [],
      Twitter: []
    };
    for (const company of companies) {
      await Mention.find({ company: company }, (err, mentions) => {
        for(const mention of mentions){
          allMentions[mention.platform].push(mention);
        }
      });
    }
    return allMentions;
  }
};

module.exports = mentionsInterface;
