const fs = require('fs');
const rl = require('readline').createInterface(
    process.stdin, process.stdout);;


const rlAsync = msg => {
    return new Promise(resolve => {
        rl.question(msg, userRes => {
        resolve(userRes);
        });
    });
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
    
function createPlayerData(id, firstname, lastname, runs, iplTeam, wickets, matchPlayed) {
    
    let newPlayer = new player(id, firstname, lastname, runs, iplTeam, wickets, matchPlayed);

    fs.readFile('./config.json', null, (error, data) => {
        if(error){
            console.log('Failed to read data.',error);
            return;
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
                console.log('Failed to write data.',err);
                return;
            }
            console.log('One player added.');
            return;
        })
    });

}
    
function showAllPlayersData(){
    fs.readFile('./config.json', null, (err, data) => {
        if(err){
            console.log('Failed to read data.',err);
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
    
function updatePlayerData(id, firstname){
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
            return;
        }
        fs.writeFile('./config.json', JSON.stringify(playersData), (err) => {
            if(err){
                console.log('Failed to write data.');
                return;
            }
            console.log("First Name of player has been updated.");
            return;
        });    

    });
}
    
function deletePlayerData(id){
    
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

startOperations = async() => {

    console.log("The menus are below.")
    console.log("1. Create Player Data");
    console.log("2. Read All Players Data");
    console.log("3. Update Player Data");
    console.log("4. Delete Player Data");
    console.log("5. Exit");

    let menus = [1,2,3,4,5];

    let menuOption = Number(await rlAsync("Please enter the menu option which operation you want to perfom.\n"));

    while (!menus.includes(menuOption)){
            menuOption = Number(await rlAsync("Err: Invalid input. Please enter valid input.\n"));
    }
    

    switch (menuOption) {
        case 1 :
            let id = await rlAsync("Enter ID of player\n");
            let firstname = await rlAsync("Enter first name of player\n");
            let lastname = await rlAsync("Enter last name of player\n");       
            let runs = await rlAsync("Enter the runs made by player\n");        
            let iplTeam = await rlAsync("Enter team name of player\n");       
            let wickets = await rlAsync("Enter the wickets taken by player\n");        
            let matchPlayed = await rlAsync("Enter the match played by player\n");
        
            createPlayerData(id, firstname, lastname, runs, iplTeam, wickets, matchPlayed);
            break;
        case 2 :
            
            showAllPlayersData();
            break;
        case 3 :
            let plyId = await rlAsync("Enter player ID\n");
            let fname = await rlAsync("Enter player First Name\n");
            updatePlayerData(plyId, fname);
            break;
        case 4 :
            dPlyId = await rlAsync("Enter player ID to delete\n");
            deletePlayerData(dPlyId);
            break;
        case 5:
            break;
        default :
            break;
    }
}

console.log(startOperations());

