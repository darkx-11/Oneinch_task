const express = require("express");
const router = express.Router();
const ResolversController = require("../controller/oneInch");

router.get("/oneinchmultiswap", ResolversController.oneInchv4multiswap);
router.get("/oneinchmultiquote", ResolversController.oneInchV4multiquote);

module.exports = router;
