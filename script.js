let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Declare the const we dont want this to change this is just to get the ids from the HTML to connect with this specific script
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

 
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText= document.querySelector("#goldText");
// the s is supposed to be on caps otherwise pathing wont work
const monsterStats = document.querySelector("#monsterStats");
// another issue with pathing I should look at how I name this on HTML
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power:"10"
    },
    {
        name: "dagger",
        power:"30"
    },
    {
        name:"claw hammer",
        power: 30
    },
    {
        name: "sword",
        power: 100
    }
    
];

const monsters = [
    {
        name: "Slime",
        level: 1,
        health: 20
    },
    {
        name: "Beast",
        level: 2,
        health: 50
    },
    {
        name:"Dragon",
        level: 3,
        health: 100
    }
];

//arrays can store objects, and to avoid repeat youself code inside this array we will have all locations
const locations = [
    {   //this is my first property in here,this object will be called when the button 1 is listen to by JS
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
        //make sure to separe every keyvalue pair with a comma

    },

    {
        name: "store",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store."
    },

    {
        name: "cave ",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [figthSlime, figthBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "figth",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text:"You are fighting a monster."

    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text:"You have slain the monster, the monster screams Arg!. You have gained experience points and find gold"

    },
    {
        name: "lose",
        "button text": ["Replay!", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text:"YOU DIE. ☠️"

    },
    {
        name: "Win",
        "button text": ["Replay!", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text:"YOU WIN THE GAME!🙌"

    }
];

// initialize buttons 

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;




function update (location){
    /* this function is accesing the information stored in location and updating accordinly*/
    monsterStats.style.display = "none";
    /* I need to know how to access CSS property display and change value to block so that the stats show up
      usually the game works when I comment this out*/
    button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
    

    

	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    

  

    text.innerText = location.text;
};

function goTown(){
    //we need to call the update function, and pass in the correct parameter, in this case since I wrote the first element we need to pass it on the 0 value
    update(locations[0]);
};


function goStore() {
    update(locations[1]);   
     /*there is also another way of doing this but is is longer however it works for smaller code
     button1.innerText="Buy 10 health (10 gold)";
     button2.innerText="Buy weapon (30 gold)";
     button3.innerText="Go to town square";
     
     button1.onclick = buyHealth;
     button2.onclick = buyWeapon;
     button3.onclick = goTown;
    
     text.innerText="You enter the store."
     */  
};

function goCave() {
    update(locations[2]); 
};

function buyHealth(){
    if(gold >= 10) {
     
        gold = gold-10
        health = health+10
        //this will update the amount displayed 
        goldText.innerText = gold;
        healthText.innerText = health;

    }else {
        text.innerText = "You do not have enough gold to buy health."
    }
};

function buyWeapon() {
    if (currentWeapon < weapons.length-1){
        if (gold >= 30) {
            gold = gold - 30;
            currentWeapon = currentWeapon + 1;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon;
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have:" + inventory;
        } else {
            text.innerText = "You do not have enought gold to purchase a weapon."
        };

    }else{
        text.innerText = "You already have the most powerful weapon"
        button2.innerText = "seel weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
};

function sellWeapon(){
 if (inventory.length > 1){
    gold = gold + 15;
    goldText.innerText = gold;
    // we use the let keyword because we want the current weapon to use the local scope
    let currentWeapon = inventory.shift();
    text.innerText = "You sold the" + currentWeapon;
    text.innerText = text.innerText + "In the inventory you have:" + inventory;
 } else text.innerText ="Don't sell your only weapon!";
}

function fightDragon() {
    console.log("Fighting dragon")
};

function figthSlime(){ 
    
    fighting = 0;
    goFight();

}
function figthBeast(){
    fighting = 1;
    goFight();

}

function goFight() {
    /* tried this out but it wont work since the pathing when the const
    didnt work in the first place that is why I needed to go back and look 
     button1.innerText="Attack";
     button2.innerText="Dodge";
     button3.innerText="Run";
     
     button1.onclick = attack;
     button2.onclick = dodge;
     button3.onclick = goTown;
     
     text.innerText="You are fighting a monster."
     */
     update(locations[3]);
     monsterHealth = monsters[fighting].health;
     monsterStats.style.display = "block";
     monsterNameText.innerText = monsters[fighting].name;
     monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The" + monsters[fighting].name + "attacks.";
    text.innerText += "You attact it with your" + weapons[currentWeapon].name;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1 ;
    healthText.innerText= health;
    monsterHealthText.innerText = monsterHealth;

    if(health <= 0){
        lose();
    } else if (monsterHealth <=0){
        fighting === 2? winGame(): defeatMonster();  
    }
 
}

function dodge () {
    text.innerText= "You dodge the attack from the "+ monsters[fighting].name +"."
}

function defeatMonster( ){
    gold += Math.floor(monsters[fighting].level*6.7); 
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose (){
    update(locations[5]);
}

function winGame() {
    update(location[6]);
}

function restart() {
    xp=0;
    health= 100;
    gold=50;
    currentWeapon= 0 ;
    inventory=["stick"];
    goldText.innerText= health;
    xpText.innerText= xp,
    goTown();
}