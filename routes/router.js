const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
//import * as ResolversController from "../controller/oneInch.js";
const ResolversController = require("../controller/oneInch");
//import { oneInchV4Swap } from "../controller/oneInch.js";

console.log("RESOLVER", ResolversController);
router.get("/oneinchswap", ResolversController.oneInchv4Swap);
router.get("/oneinchquote", ResolversController.oneInchV4quote);

module.exports = router;
