import * as Database from "../database/initdatabase.js"
import express from "express";
import {AIInteraction, EMPTY_AI_INTERACTION} from "../models/ai-interaction.js"
import {isRequiredParameterPresent, sendSuccessMessage} from "./utility.js"



// "/interactions/" is used on the aiInteractionRouter in the index.js file.
let aiInteractionRouter = express.Router();


// GET request: Retrieve all ai interactions
aiInteractionRouter.get("/",async (req,res)=>
{
	let db = req.app.get('db');
	let aiInteractions = await Database.selectAllData(db, EMPTY_AI_INTERACTION);
	res.send(JSON.stringify(aiInteractions,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
aiInteractionRouter.get("/:id",async (req,res)=>
{
	let id = req.params.id;
	let db = req.app.get('db');
	let aiInteraction = await Database.selectSingleData(db, EMPTY_AI_INTERACTION, id);
	res.send(JSON.stringify(aiInteraction,null,4));
});

// Create new AI Interactions
aiInteractionRouter.post("/", async (req, res) => {
	let userPrompt = req.body.userPrompt;
	let aiResponse = req.body.aiResponse;

	if(!isRequiredParameterPresent(res, userPrompt, "userPrompt"))
	{
		return;
	}

	let aiInteraction = null;
	// If we don't have a response yet, just create an interaction without one.
	if(!aiResponse || aiResponse == "")
	{
		aiInteraction = AIInteraction.createFromPrompt(userPrompt);
	}
	// Otherwise, we already have the prompt and response.
	else
	{
		aiInteration = new AIInteraction(userPrompt, aiResponse);
	}

	// Insert our object.
	let db = req.app.get('db');
	aiInteraction = await Database.insertData(db, aiInteraction);
	res.send(JSON.stringify(aiInteraction,null,4));
});

// Update AI Interaction
aiInteractionRouter.put("/", async (req, res) => {
	let aiInteractionID = req.body.aiInteractionID;
	let userPrompt = req.body.userPrompt;
	let aiResponse = req.body.aiResponse;

	if(!isRequiredParameterPresent(res, aiInteractionID, "aiInteractionID"))
	{
		return;
	}

	if(!isRequiredParameterPresent(res, userPrompt, "userPrompt"))
	{
		return;
	}

	if(!isRequiredParameterPresent(res, aiResponse, "aiResponse"))
	{
		return;
	}

	let aiInteraction = new AIInteraction(aiInteractionID, userPrompt, aiResponse);

	// update our object.
	let db = req.app.get('db');
	aiInteraction = await Database.updateData(db, aiInteraction);

	res.send(JSON.stringify(aiInteraction,null,4));
});


aiInteractionRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	if(!isRequiredParameterPresent(res, id, "id"))
	{
		return;
	}

	let aiInteraction = AIInteraction.createDefault();
	aiInteraction.setPrimaryKey(id);

	// Insert our object.
	let db = req.app.get('db');
	aiInteraction = await Database.deleteData(db, aiInteraction);

	sendSuccessMessage(res, `Successfully deleted AIInteraction with AIInteractionID: [${id}]` , null);
});


export {aiInteractionRouter}
