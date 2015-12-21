const fs = require('fs');
const meetups = JSON.parse(fs.readFileSync('site/data/meetups.json').toString());

meetups.forEach((meetup) => {
    console.log('Writing', meetup.on, meetup.title);
    fs.writeFileSync(`site/data/meetups/${meetup.on}.json`, JSON.stringify(meetup, null, 2), 'utf8');
});