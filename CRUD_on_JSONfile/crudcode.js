const readline = require("readline-sync");
const fs = require('fs');

console.log("The menus are below.")
console.log("1. Create Player Data");
console.log("2. Read All Players Data");
console.log("3. Update Player Data");
console.log("4. Delete Player Data");
console.log("Please enter the menu option which operation you want to perfom.");
let menuOption = Number(readline.question());
do {

    if(menuOption < 1 || menuOption > 4) {
        console.log("Err: Invalid input. Please enter valid input.");
        menuOption = Number(readline.question());

    }
}
while (menuOption < 1 || menuOption > 4);

switch (menuOption) {
    case 1 :
        createPlayerData();
        break
    case 2 :
        showAllPlayersData();
        break
    case 3 :
        updatePlayerData();
        break
    case 4 :
        deletePlayerData();
        break
    default :
        break;
}

function player(id,firstname, lastname, runs, iplTeam, wickets, matchPlayed){
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.runs = runs;
    this.iplTeam = iplTeam;
    this.wickets = wickets;
    this.matchPlayed = matchPlayed;
}

function createPlayerData(){
    console.log("Enter ID of player")
    let id = readline.question();

    console.log("Enter first name of player")
    let firstname = readline.question();

    console.log("Enter last name of player")
    let lastname = readline.question();

    console.log("Enter the runs made by player")
    let runs = readline.question();

    console.log("Enter team name of player")
    let iplTeam = readline.question();

    console.log("Enter the wickets taken by player")
    let wickets = readline.question();

    console.log("Enter the match played by player")
    let matchPlayed = readline.question();
    
    let newPlayer = new player(id, firstname, lastname, runs, iplTeam, wickets, matchPlayed);

    fs.readFile('./config.json', null, (error, data) => {
        if(error){
            console.log('Failed to read data.');
        }

        if(data.length == 0 ){
            playersData = [];
            playersData.push(newPlayer);
        }
        else {
            playersData = JSON.parse(data);
            playersData.push(newPlayer);
        }
        fs.writeFile('./config.json', JSON.stringify(playersData), (err) => {
            if(err){
                console.log('Failed to write data.');
            }
            console.log('One player added.');
        })
    });

}

function showAllPlayersData(){
    fs.readFile('./config.json', null, (err, data) => {
        if(err){
            console.log('Failed to read data.');
            return;
        }

        if(data.length == 0){
            console.log('File empty');
            return;
        }
        let allPlayersData = JSON.parse(data);
        console.log(allPlayersData);
    })
}

function updatePlayerData(){
    console.log("Enter player ID");
    let id = readline.question();
    console.log("Enter player First Name");
    let firstname = readline.question();
    fs.readFile('./config.json', null , (error,data) => {
        if(error){
            console.log(error);
            return;
        }

        if(data.length == 0 ){
            console.log('Data not found.');
            return;
        }
        playersData = JSON.parse(data);
        let plyData;
        playersData.forEach((item, index ) => {
            if(item.id == id){
                item.firstname = firstname;
                plyData = item;
                console.log(item);
                return;
            }
        });
        if(!plyData){
            console.log("This palyer doesn't exist");
        }
        fs.writeFile('./config.json', JSON.stringify(playersData), (err) => {
            if(err){
                console.log('Failed to write data.');
            }
            console.log("First Name of player has been updated.");
            return;
        });    

    });
}

function deletePlayerData(){
    console.log("Enter player ID to delete");
    id = readline.question();
    fs.readFile('./config.json', null , (error,data) => {
        if(error){
            console.log(error);
            return;
        }

        if(data.length == 0 ){
            console.log('Data not found.');
            return;
        }
        playersData = playersData = JSON.parse(data);
        let removedPlyr;
        playersData.forEach((item, index ) => {
            if(item.id == id){
                removedPlyr = playersData.splice(index, 1);
                fs.writeFile('./config.json', JSON.stringify(playersData), (err) => {
                    if(err){
                        console.log('Failed to write data.');
                    }
                    console.log("This palyer has been removed");
                    return;
                });    
            }
        });
        if(!removedPlyr){
            console.log("This palyer doesn't exist");
        }

    });
}



