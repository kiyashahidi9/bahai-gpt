import config from '../utils/config.js';
import { AuthorizationError, LLMError, ValidationError } from '../utils/customErrors.js';
import spConfig from '../llm/spConfig.js';
import { augmentInput } from '../llm/rag.js';
import { queryNewChat } from '../models/chats.js';
import { classifyQuery } from '../llm/helpers.js';
import { getRelevantChunks } from '../llm/rag.js';
import openai from '../llm/openaiClient.js';
export async function queryLLM(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const userQuery = req.body.query;
    const chatHistory = req.body.history;
    const conversationId = Number(req.params.conversation_id);
    // CLASSIFY QUERY
    const classify = await classifyQuery(userQuery, chatHistory);
    const category = classify?.category;
    const searchQuery = classify?.searchQuery ?? userQuery;
    console.log(category);
    let systemPrompt;
    let relevantChunks;
    // CATEGORY PIPELINES
    if (category === 'explainGeneralConcept') {
        relevantChunks = await getRelevantChunks(searchQuery);
        systemPrompt = spConfig.EXPLAIN_GENERAL_CONCEPT_SP;
    }
    else if (category === 'explainSpecificQuote') {
        relevantChunks = await getRelevantChunks(searchQuery);
        systemPrompt = spConfig.EXPLAIN_SPECIFIC_QUOTE_SP;
    }
    else if (category === 'getRandomQuote') {
        relevantChunks = await getRelevantChunks(searchQuery);
        systemPrompt = spConfig.GET_RANDOM_QUOTE_SP;
    }
    else if (category === 'simpleFact') {
        systemPrompt = spConfig.SIMPLE_FACT_SP;
    }
    else if (category === 'notRelevant') {
        systemPrompt = spConfig.NOT_RELEVANT_SP;
    }
    else if (category === 'interpretation') {
        systemPrompt = spConfig.INTERPRETATION_SP;
    }
    else if (category === 'funsies') {
        systemPrompt = spConfig.FUNSIES_SP;
    }
    else {
        throw new LLMError('Unknown Category');
    }
    const response = await openai.responses.create({
        model: config.GPT_MODEL,
        input: augmentInput(userQuery, chatHistory, relevantChunks),
        instructions: systemPrompt,
    });
    const createdChat = await queryNewChat(userId, 'assistant', response.output_text, conversationId);
    res.status(201).json(createdChat);
}
export async function newTitleSummary(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const userQuery = req.body.query;
    const response = await openai.responses.create({
        model: config.GPT_MODEL,
        input: [{ role: "user", content: userQuery }],
        instructions: spConfig.TITLE_SUMMARY_SP
    });
    res.status(200).json(response.output_text);
}
//# sourceMappingURL=llmControllers.js.map