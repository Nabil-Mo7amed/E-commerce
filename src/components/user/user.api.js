const { signup, signin, protectedRoutes, allowedTo } = require("./user.auth");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("./user.service");

const router = require("express").Router();

router
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), createUser)
  .get(getUsers);
router
  .route("/:id")
  .get(getUser)
  .put(protectedRoutes, allowedTo("admin"), updateUser)
  .delete(deleteUser);
router.patch("/changePassword/:id", changePassword);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
