const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require('../controllers/postController');
const comment_controller =require("../controllers/commentController");

//*-----------------Posts---------------------------

router.get("/", post_controller.index) //? Maybe do list here instead?

router.get("/posts/create", post_controller.post_create_get);
router.post("/posts/create", post_controller.post_create_post);

router.get("/posts/:id/delete", post_controller.post_delete_get);
router.post("/posts/:id/delete", post_controller.post_delete_post);

router.get("/posts/:id/update", post_controller.post_update_get);
router.post("/posts:id/update", post_controller.post_update_post);

router.get("/posts/:id", post_controller.post_detail);

//?---------------------User------------------------------
router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);

router.get("/sign-in", user_controller.user_signin_get);
// router.post("/sign-in", user_controller.user_signin_post);

router.get("/user/:id/delete", user_controller.user_delete_get);
router.post("/user/:id/delete", user_controller.user_delete_post);

router.get("/user/:id/update", user_controller.user_update_get);
router.post("/user:id/update", user_controller.user_update_post);

router.get("/user/:id", user_controller.user_detail);

//* ---------------------Comments--------------------------------- not sure if i need all this if comments and posts on same page?
// router.get("/posts/create", post_controller.post_create_get);
// router.post("/posts/create", post_controller.post_create_post);

// router.get("/posts/:id/delete", post_controller.post_delete_get);
// router.post("/posts/:id/delete", post_controller.post_delete_post);

// router.get("/posts/:id/update", post_controller.post_update_get);
// router.post("/posts:id/update", post_controller.post_update_post);

// router.get("/posts/:id", post_controller.post_detail);

module.exports = router