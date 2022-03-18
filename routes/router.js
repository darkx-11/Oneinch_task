const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
//import * as ResolversController from "../controller/oneInch.js";
const ResolversController = require("../controller/oneInch");
//import { oneInchV4Swap } from "../controller/oneInch.js";

console.log("RESOLVER", ResolversController);
router.get("/oneinchmultiswap", ResolversController.oneInchv4multiswap);
router.get("/oneinchmultiquote", ResolversController.oneInchV4multiquote);

module.exports = router;
