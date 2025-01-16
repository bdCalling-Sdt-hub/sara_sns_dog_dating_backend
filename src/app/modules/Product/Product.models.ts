// File: product.model.ts
// Description: Mongoose model for Product module

import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './Product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Product = model<TProduct, ProductModel>('Product', productSchema);
