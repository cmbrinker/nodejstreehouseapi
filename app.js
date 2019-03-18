const profile = require('./profile.js');

const argvUsers = process.argv.slice(2); //accepting argv arguements from the console and disregarding the first 2 results of the returned array
argvUsers.forEach(profile.get); //specifying specific users not necessarily contained in the users array, profile.argv and slice() practice
