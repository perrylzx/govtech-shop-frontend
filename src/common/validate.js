import Joi from 'joi';
import { ItemPriceMax, ItemTitleMaxLength } from '../contants';

export const validatePutData = (data) => {
  const PutItemSchema = Joi.object({
    name: Joi.string().max(ItemTitleMaxLength),
    price: Joi.number().max(ItemPriceMax),
    id: Joi.string().required().length(36)
  })
    .min(2)
    .message('Please provide an update to your item');

  const { error } = PutItemSchema.validate(data);
  return error;
};

export const validatePostData = (data) => {
  const PostItemSchema = Joi.object({
    name: Joi.string().max(ItemTitleMaxLength).required(),
    price: Joi.number().max(ItemPriceMax).required()
  });

  const { error } = PostItemSchema.validate(data);
  return error;
};
