import express from "express"
import AIInteraction from "./models/ai-interaction.js"
import * as Database from "./database/initdatabase.js"
import {aiInteractionRouter} from "./routers/ai-interaction-router.js"
const app = new express();

// This file is what I plan to use to execute random bits of code as I start putting new systems in place.


// Testing AI Interaction inserts.
// let aiInteraction = AIInteraction.createFromPrompt("What is a weasel?");
// console.log(JSON.stringify(aiInteraction));


let db = Database.openDatabase();
app.set('db', db); 

app.use("/", aiInteractionRouter);
// let insertedAIInteraction = await Database.insertData(db, aiInteraction);
// console.log(JSON.stringify(aiInteraction));
// console.log(JSON.stringify(insertedAIInteraction));

// let aiInteraction = AIInteraction.createDefault();
// let aiInteractions = await Database.selectAllData(db, aiInteraction);

//console.log(JSON.stringify(aiInteractions));

app.listen(3141, () => 
{
	console.log("Listening at http://localhost:3141")
});

//db.close();
