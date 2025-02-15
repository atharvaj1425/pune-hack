import { Router } from "express";
import { addFoodItem, getFoodItems, addSingleMeal, getSingleMeals } from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// router.route("/login").post(loginUser)

router.route("/getFoodItems").get(verifyUserJWT, authorizeRoles("individual"), getFoodItems)

// router.route("/getFoodItems").get(verifyUserJWT, authorizeRoles(['individuals']), getFoodItems);

router.route("/addFoodItem").post(verifyUserJWT,authorizeRoles("individual"),  addFoodItem)

router.route("/addMeal").post(verifyUserJWT, authorizeRoles("individual"), addSingleMeal)

router.route("/getMeal").get(verifyUserJWT, authorizeRoles("individual"), getSingleMeals)
export default router;