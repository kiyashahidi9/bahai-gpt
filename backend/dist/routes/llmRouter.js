import express from 'express';
import { queryLLM, newTitleSummary } from '../controllers/llmControllers.js';
const llmRouter = express.Router();
llmRouter.post('/new', newTitleSummary);
llmRouter.post('/:conversation_id', queryLLM);
export default llmRouter;
//# sourceMappingURL=llmRouter.js.map