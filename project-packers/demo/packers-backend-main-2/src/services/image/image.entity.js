import path from 'path';

//statics
import { badRequest, serverErr } from '../../utils/statics';

/**
 * @param getImage function is used to serve an image
 * @param req.params contains the image id.
 * @returns the image
 */
export const getImage = () => async (req, res) => {
  try {
    const imageId = req.params.imageId;
    imageId ? res.status(200).sendFile(path.join(path.resolve(), 'images', imageId)) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};