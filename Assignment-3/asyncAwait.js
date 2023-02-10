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

var readContent = () => {
    return new Promise(function(resolve, reject) {
        fs.readFile('./config.json',"utf-8",(err,data) =>{
            if(err) reject(err);
            resolve(JSON.parse(data));

        })
    });
}

const writeContent = (data) => {
    return new Promise(function(resolve, reject) {
        fs.writeFile('./config.json',JSON.stringify(data),(err) =>{
            if(err) reject(err);
            resolve(console.log("success"));

        })
    });
}


startApp = async() => {
    var loop = true;
    while(loop) {
        console.log("The menus are below.\n1. Create Player Data\n2. Read All Players Data\n3. Update Player Data\n4. Delete Player Data\n5. Exit")
        let menus = [1,2,3,4,5];

        let menuOption = Number(await rlAsync("Please enter the menu option which operation you want to perfom.\n"));

        while (!menus.includes(menuOption)){
                menuOption = Number(await rlAsync("Err: Invalid input. Please enter valid input.\n"));
        }       
    
        switch (menuOption) {
            case 1 : {
                const id = await rlAsync("Enter ID of player\n");
                const name = await rlAsync("Enter name of player\n");
                const runs = await rlAsync("Enter the runs made by player\n");        
                const iplTeam = await rlAsync("Enter team name of player\n");       
                const wickets = await rlAsync("Enter the wickets taken by player\n");        
                const matchPlayed = await rlAsync("Enter the match played by player\n");
            
                const data = await readContent();
                data.push({id,name,runs,iplTeam,wickets,matchPlayed});
                await writeContent(data);
                console.log("One player has been added.");
                break;
            }
            case 2 : {
                
                console.log(await readContent());
                break;
            }
            case 3 :{
                const plyId = await rlAsync("Enter player ID\n");
                const plrname = await rlAsync("Enter player Name\n");
                let plrsData = await readContent();
                let flag = false;
                plrsData.forEach(element => {
                    if(element.id == plyId){
                        element.name = plrname;
                        flag = true;
                    }
                });
                if(flag == true){
                    console.log(plrsData);
                    await writeContent(plrsData);
                    console.log("Name has been updated.")
                }
                else
                    console.log("Player not found");
                break;
            }
            case 4 :
                dPlyId = await rlAsync("Enter player ID to delete\n");
                const plrsData = await readContent();
                plrsData.forEach((element, index) => {
                    if(element.id == dPlyId){
                        dPlyr = plrsData.splice(index, 1);
                    }
                });
                if(dPlyr){
                    await writeContent(plrsData);
                    console.log("Player has been deleted.")
                }
                else
                    console.log("Player not found");
                break;
            case 5:
                loop = false;
                break;
            default :
                break;
        }
    }
}

startApp().then(()=>{
    console.log("Thanks for visiting.");
    return 1 ;
}).catch((e)=>{
    throw e;
});
