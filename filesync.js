var fs = require('fs');
// const config = require('./config.json');
// console.log(config);

// read json from file using async
// fs.readFile('./config.json', null, (error,data) => {
//     if(error){
//         console.log(error);
//         return;
//     }

//     console.log("async method");
//     console.log(JSON.parse(data));
// })

// read json from file using sync
// const data = fs.readFileSync('./config.json');
// console.log("sync method");
// console.log(JSON.parse(data));

// write json in a file using async method
// const x = {"color" : "red", "new":"yes"};
// data = fs.writeFile('./config.json', JSON.stringify(x),(error) =>{
//     if(error){
//         console.log('An error has occurred');
//         return;
//     }
//     console.log('Data written');
// });

// write json in a file using sync method
// const x = {"color" : "red", "new":"yes"};
// data = fs.writeFileSync('./config.json', JSON.stringify(x));
// console.log('Data has written');

// append json in a file using async method
// fs.readFile('./config.json', null, (error, data) => {
//     if(error){
//         console.log('Failed to read data.');
//     }
//     jsonData = JSON.parse(data);
//     jsonData[0].createdAt = Date();
//     fs.writeFile('./config.json', JSON.stringify(jsonData), (err) => {
//         if(err){
//             console.log('Failed to write updated data to file.');
//         }
//         console.log('json data appended.');

//     })
// });

filedata = fs.readFileSync('./config.json');
filedataJson = JSON.parse(filedata);
filedataJson[0].jersyColor = "blue";
filedataJson[0].new = "no";

fs.writeFileSync('./config.json', JSON.stringify(filedataJson));
console.log('json data updated.');









