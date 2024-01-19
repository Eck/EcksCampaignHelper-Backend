//import express from "express"
import AIInteraction from "./models/ai-interaction.js"
import * as Database from "./database/initdatabase.js"
import {aiInteractionRouter} from "./routers/ai-interaction-router.js"
import {Race, EMPTY_RACE, raceSelectAllNonRandomStatement} from "./models/race.js";
import {Class, EMPTY_CLASS, classSelectAllNonRandomStatement} from "./models/class.js";
import {Gender, EMPTY_GENDER, genderSelectAllNonRandomStatement} from "./models/gender.js";
import {Character, EMPTY_CHARACTER} from "./models/character.js";
import {getRandomRace, getRandomClass, getRandomGender, fillInRandomCharacterDetails} from "./controllers/character.js"
//const app = new express();

// This file is what I plan to use to execute random bits of code as I start putting new systems in place.


// Testing AI Interaction inserts.
// let aiInteraction = AIInteraction.createFromPrompt("What is a weasel?");
// console.log(JSON.stringify(aiInteraction));


let db = Database.openDatabase();

// let raceList = await Database.executeSelectStatement(db, EMPTY_RACE, raceSelectAllNonRandomStatement);
//console.log(JSON.stringify(raceList));

// let race = await getRandomRace(db);
// console.log(JSON.stringify(race));



// let classList = await Database.executeSelectStatement(db, EMPTY_CLASS, classSelectAllNonRandomStatement);
//console.log(JSON.stringify(classList));

// let charClass = await getRandomClass(db);
// console.log(JSON.stringify(charClass));


//console.log(JSON.stringify(classList));

// let gender = await getRandomGender(db);
// console.log(JSON.stringify(gender));

let character = Character.createDefault();
await fillInRandomCharacterDetails(db, character);
console.log(JSON.stringify(character));

character.RaceID = 0
character.ClassID = 1
await fillInRandomCharacterDetails(db, character);
console.log(JSON.stringify(character));

character.RaceID = 0
character.ClassID = 1
await fillInRandomCharacterDetails(db, character);
console.log(JSON.stringify(character));
// app.set('db', db); 

// app.use("/", aiInteractionRouter);
// let insertedAIInteraction = await Database.insertData(db, aiInteraction);
// console.log(JSON.stringify(aiInteraction));
// console.log(JSON.stringify(insertedAIInteraction));

// let aiInteraction = AIInteraction.createDefault();
// let aiInteractions = await Database.selectAllData(db, aiInteraction);

//console.log(JSON.stringify(aiInteractions));

// app.listen(3141, () => 
// {
// 	console.log("Listening at http://localhost:3141")
// });

db.close();
