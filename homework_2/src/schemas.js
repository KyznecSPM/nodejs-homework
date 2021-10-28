import Joi from 'joi';

export const schemas = {
  createUserPOST: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(4).max(130).required()
  }),
  updateUserInfoPUT: Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(4).max(130).required()
  }),
  getAutoSuggestUsersGET: Joi.object().keys({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().integer().required()
  })
};
