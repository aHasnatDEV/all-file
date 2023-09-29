import deleteImages from '../../utils/deleteImages';
import Products from './product.schema';


// statics
import { badRequest, serverErr } from '../../utils/statics';

// these are the set to validate the request query.
const allowedQuery = new Set(['page', 'limit', 'id', '_id', 'paginate', 'sortBy', 'category', 'subcategory', 'name', 'status', 'tags', 'search']);

/**
 * @param registerProduct function is used to register a product from the products collection
 * @param {Object} req This is the req object.
 * @returns
 */
export const registerProduct = ({ db, imageUp, lyra }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined) || Object.keys(req.body.data).every((k) => req.body.data[k] !== '' || req.body.data[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    if (req.body.price <= 0 || req.body.tax < 0 || req.body.fee < 0 || req.body.quantity <= 0) return res.status(400).send(badRequest);
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    }
    else if (req.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    const product = await db.create({ table: Products, key: req.body });

    // insert product data for orama search
    await lyra.insert('product', {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price
    });
    product ? res.status(200).send(product) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getAllProducts function is used to get all the products to the products collection
 * there is page query and other queries for this function which page of the data it need to show
 * @returns all the products
 */
export const getAllProducts = ({ db }) => async (req, res) => {
  try {
    if (req.query.status === 'all') delete req.query.status;
    const product = await db.find({ table: Products, key: { query: req.query, allowedQuery: allowedQuery, populate: { path: 'category subcategory' } } });
    product ? res.status(200).send(product) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getSingleProduct function is used to get a signle product from the products collection
 * @param req.params.id This is the id of the product.
 * @returns the product
 */
export const getSingleProduct = ({ db }) => async (req, res) => {
  try {
    const product = await db.findOne({ table: Products, key: { id: req.params.id, populate: { path: 'category' } } });
    product ? res.status(200).send(product) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param updateProduct function updates the single product by id
 * @param req.params.id is the id of the product sent in the params
 * @returns the product after update
 */
export const updateProduct = ({ db, imageUp, lyra }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    const product = await db.findOne({ table: Products, key: { id: req.params.id } });
    if (req.body?.removeImages?.length>0) {
      await deleteImages(req.body.removeImages);
      product.images = product.images.filter(
        (img) => !req.body.removeImages.includes(img)
      );
      delete req.body.removeImages;
    }
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    }
    else if (req?.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    product.images = [...(product.images || []), ...(req.body.images || [])];
    delete req.body?.images;
    Object.keys(req.body || {}).forEach(param => product[param] = req.body[param]);
    await product.save();

    // remove previously inserted search data
    await lyra.remove('product', req.params.id);
    // insert updated product data for orama search
    await lyra.insert('product', {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price
    });
    product ? res.status(200).send(product) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param removeProduct function removes the product by id
 * @param req.params.id is the id of the product sent in the params
 * @returns success or failed
 */
export const removeProduct = ({ db, lyra }) => async (req, res) => {
  try {
    if (!req.body.id.length) return res.status(400).send(badRequest);
    const productsToDelete = await db.find({ table: Products, key: { query: { '_id': { '$in': req.body.id } }, allowedQuery: allowedQuery, paginate: false } });
    if (productsToDelete.length < 1) return res.status(400).send({ message: 'Product not found', status: false });
    const imagePathsToDelete = productsToDelete.reduce(async (acc, product) => {
      await lyra.remove('product', product._id.toString());
      acc.push(...product.images);
      return acc;
    }, []);
    await deleteImages(imagePathsToDelete);
    const deleteResult = await db.removeAll({ table: Products, key: { id: { '$in': req.body.id } } });
    deleteResult.deletedCount ? res.status(400).send({ message: 'Product not found', status: false }) : res.status(200).send({ message: 'Deleted Successfully', status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};