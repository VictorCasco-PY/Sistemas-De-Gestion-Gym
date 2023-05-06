import initModels from "./init-models.js"
import {database} from "../database/database.js";

export const models = initModels(database);
