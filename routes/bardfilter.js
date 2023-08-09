import { Bard } from "googlebard";

let cookies = `__Secure-1PSID=ZAhS1eKEzflD4lGRro60L1oodoQwGmUrGdUFrVBBoNxfI_vJ6h9hlpCQbeMdnl37ejKLkg.`;
let bot = new Bard(cookies);
import express from "express";

const router = express.Router();



router.get("/", async (req, res) => {
let response = await bot.ask("Hello world!");
console.log(response);

});

export default router;
