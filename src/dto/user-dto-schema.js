import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
function validateSignUpForm(req, res, next) {
  const schema = [
    body("displayName").notEmpty().withMessage("Display name is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
  Promise.all(schema.map((validation) => validation.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          fs.unlinkSync(path.join("image/profile", req.file.filename));
        }
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    })
    .catch(next);
}
export default validateSignUpForm;
