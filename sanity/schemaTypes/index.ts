import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderTypes } from "./orderTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, orderTypes],
};
