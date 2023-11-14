module.exports = function replaceTemplate(template, product) {
  let output = template;
  output = output.replace(/{PRODUCTNAME}/g, product.productName);
  output = output.replace(/{IMAGE}/g, product.image);
  output = output.replace(/{PRICE}/g, product.price);
  output = output.replace(/{FROM}/g, product.from);
  output = output.replace(/{PRODUCTNUTRIENT}/g, product.nutrients);
  output = output.replace(/{QUANTITY}/g, product.quantity);
  output = output.replace(/{DESCRIPTIONS}/g, product.description);
  output = output.replace(/{ID}/g, product.id);

  return output;
};
