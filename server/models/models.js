import { database } from "../database/database.js";
import initModels from "./init-models.js";

export const models = initModels(database);