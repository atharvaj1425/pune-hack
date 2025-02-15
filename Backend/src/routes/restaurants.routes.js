import { Router } from "express";
import {  donateFoodItem, addFoodItem, getFoodItems, foodDonationHistory, checkDeliveryStatus } from "../controllers/restaurant.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// router.route("/login").post(loginRestaurantUser)
router.route("/addFoodItem").post(verifyUserJWT,  authorizeRoles("restaurant"), addFoodItem)
router.route("/getfoodItems").get(verifyUserJWT,  authorizeRoles("restaurant"), getFoodItems)
router.route("/donateFood").post(verifyUserJWT,  authorizeRoles("restaurant"), donateFoodItem)
router.route("/deliveryStatus").get(verifyUserJWT,  authorizeRoles("restaurant"), checkDeliveryStatus)
router.route("/donationHistory").get(verifyUserJWT,  authorizeRoles("restaurant"), foodDonationHistory)
export default router;