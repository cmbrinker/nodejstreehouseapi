//Problem: We need a simple way to look at user's badge count and JS points
//Solution: Use Node.js to connect to Treehouse's API to get Profile Info to print out

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

const users = [
  "chalkers",
  "alenaholligan",
  "davemcfarland",
  "chrisbrinker"
];

users.forEach(getProfile); //shortened version of users.forEach(function(username) {getProfile(username)}) because there's only 1 arguement

const argvUsers = process.argv.slice(2); //accepting argv arguements from the console and disregarding the first 2 results of the returned array
argvUsers.forEach(getProfile); //specifying specific users not necessarily contained in the users array, profile.argv and slice() practice
