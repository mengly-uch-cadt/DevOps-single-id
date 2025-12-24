import { Router } from "express";
import usersRoutes from "./users.routes";
import accessesRoutes from "./accesses.routes";
import authRoutes from "./auth.routes";
import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";

const router = Router();

router.use("/public", publicRoutes);
router.use("/private", privateRoutes);

router.use("/sid/users", usersRoutes);
router.use("/sid/accesses", accessesRoutes);
router.use("/sid", authRoutes);

export default router;
