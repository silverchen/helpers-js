var validatejs = require("validate.js");

export const DEFAULT_REQUIRED_ERR_MSG = '^This is a required field';

const REGEX = {
  EMAIL: /^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i,
  SG_PHONE_NUMBER: /^(\+65)?[89]\d{7}$/i,
  PH_PHONE_NUMBER: /^(\+63)?[9]\d{9}$/i
};

var validation = {
  required: {
    presence: {
      message: DEFAULT_REQUIRED_ERR_MSG
    }
  },

  email: {
    presence: {
      message: DEFAULT_REQUIRED_ERR_MSG
    },
    format: {
      pattern: REGEX.EMAIL,
      message: '^Please enter a valid email address'
    }
  },

  password: {
    presence: {
      message: DEFAULT_REQUIRED_ERR_MSG
    },
    length: {
      minimum: 8,
      maximum: 16,
      message: '^Your password must be at least 8 characters and not more than 16 characters'
    }
  },

  confirmPassword: {
    presence: {
      message: DEFAULT_REQUIRED_ERR_MSG
    },
    equality: {
      attribute: 'password',
      message: '^Password not match'
    }
  },

  phoneNumber: {
    presence: {
      message: DEFAULT_REQUIRED_ERR_MSG
    },
    format: {
      pattern: REGEX.PH_PHONE_NUMBER,
      message: '^Please enter a valid phone number'
    }
  }
}

export const ValidationType = {
  REQUIRED: 'required',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  PHONE_NUMBER: 'phoneNumber'
};

export const validate = (validationType, value) => {
  var values = {};
  values[validationType] = value;

  var constraints = {};
  constraints[validationType] = validation[validationType];

  const result = validatejs(values, constraints);
  if (result) {
    return result[validationType][0];
  }

  return null;
}

export const validateWithObjects = (validationType, objects) => {
  var values = {};
  values = objects;

  var constraints = {};
  constraints[validationType] = validation[validationType];

  const result = validatejs(values, constraints);
  if (result) {
    return result[validationType][0];
  }

  return null;
}
