import express from "express";
const router = express.Router();
import {
  oneInchV4multiswap,
  oneInchV4multiquote,
} from "../controller/oneInch.js";

router.get("/oneinchmultiswap", oneInchV4multiswap);
router.get("/oneinchmultiquote", oneInchV4multiquote);
export { router as oneinchRouter };
