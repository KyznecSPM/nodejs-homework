import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { PERMISSION } from '../config/constants';

const joiValidator = createValidator();

const PERMISSION_VALUES = Object.values(PERMISSION);

export const validator = {
  createUserPOST: joiValidator.body(
    Joi.object().keys({
      login: Joi.string().required(),
      password: Joi.string().alphanum().required(),
      age: Joi.number().integer().min(4).max(130).required()
    })
  ),
  updateUserInfoPUT: joiValidator.body(
    Joi.object().keys({
      id: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().alphanum().required(),
      age: Joi.number().integer().min(4).max(130).required()
    })
  ),
  getAutoSuggestUsersGET: joiValidator.query(
    Joi.object().keys({
      loginSubstring: Joi.string().required(),
      limit: Joi.number().integer().required()
    })
  ),
  createGroupPOST: joiValidator.body(
    Joi.object().keys({
      name: Joi.string().required(),
      permissions: Joi.array()
        .items(Joi.string().valid(...PERMISSION_VALUES))
        .required()
    })
  ),
  updateGroupPUT: joiValidator.body(
    Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      permissions: Joi.array()
        .items(Joi.string().valid(...PERMISSION_VALUES))
        .required()
    })
  )
};
