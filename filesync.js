var fs = require('fs');

// append json data in a file sync
filedata = fs.readFileSync('./config.json');
filedataJson = JSON.parse(filedata);
newJson = {"firstname":"Ishan","lastname":"Kishan","runs":3000,"iplTeam":"Mumbai","wickets":1,"matchPlayed":22};
filedataJson.push(newJson);
fs.writeFileSync('./config.json', JSON.stringify(filedataJson));
console.log('One new player added');


// append json data in a file async
fs.readFile('./config.json', null, (error, data) => {
    if(error){
        console.log('Failed to read data.');
    }
    jsonData = JSON.parse(data);
    jsonData.push({"firstname":"Surya Kumar","lastname":"Yadav","runs":1500,"iplTeam":"Gujrat","wickets":2,"matchPlayed":30});
    fs.writeFile('./config.json', JSON.stringify(jsonData), (err) => {
        if(err){
            console.log('Failed to write data.');
        }
        console.log('One player added.');
    })
});












