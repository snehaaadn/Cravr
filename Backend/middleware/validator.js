import { body, validationResult } from 'express-validator';

const registerValidationRules = () => {
  return [
    body('username')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
      .escape(), 

    // EMAIL
    body('email')
      .trim()
      .isEmail().withMessage('Invalid email address format')
      .normalizeEmail(),

    // PHONE
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .isMobilePhone('en-IN').withMessage('Invalid mobile number detected')
      .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),

    // PASSWORD
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')

  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    success: false,
    message: "Validation Error",
    errors: extractedErrors,
  });
};

export {
  registerValidationRules,
  validate,
};