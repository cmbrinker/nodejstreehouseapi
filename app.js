//A node.js app that retrieves profile information from the Treehouse API searching by username

const https = require('https');

function getProfile(username) {
  function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} total points in Javascript`;
    console.log(message);
  }

  const request = https.get(`https:teamtreehouse.com/${username}.json`, (res) => {
    let body = "";
    res.on('data', (data) => {
      body += data.toString();
    });
    res.on('end', () => {
      const profile = JSON.parse(body);
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
  });
}

getProfile("chrisbrinker");
