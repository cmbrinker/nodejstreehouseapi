const https = require('https');
const http = require('http');

function printError(error) {
  console.error(error.message);
}

function get(username) {
  function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} total points in Javascript`;
    console.log(message);
  }
  try {
    const request = https.get(`https:teamtreehouse.com/${username}.json`, (res) => {
      if(res.statusCode === 200) {
        let body = "";
        res.on('data', (data) => {
          body += data.toString();
        });
        res.on('end', () => {
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          };
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
        const statusCodeError = new Error(message); //created because printError prints out an error.message
        printError(statusCodeError);
      }
    });
    request.on('error', error => printError(error));
  } catch (error) {
    printError(error);
  };
}

module.exports.get = get; //making the module's function available externally
