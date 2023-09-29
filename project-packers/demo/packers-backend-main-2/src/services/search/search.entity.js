import { schemas } from "../../controllers/search/schemas";

/**
 * @function getSearchResult function is used to serve global search result
 * @param req contains the request object
 * @param res contains the response object
 * @returns global serach result
 */
export const getSearchResult = ({db, lyra}) => async (req, res) => {
  try {
    if (!req.query.term) return res.status(400).send({message: 'Serach keyword must not be empty', status: false});

    const searchResult = [];

    for (const schema of Object.keys(schemas)) {
      const searchData = await lyra.search(schema, { term: req.query.term });

      if (searchData.count > 0) {
        searchResult.push({
          from: schema,
          data: searchData.hits.slice(0, 2).map((docs) => docs.document)
        });
      }
    }

    searchResult.length > 0 ? res.status(200).send(searchResult) : res.status(400).send({ message: 'Data Not Found', status: false});

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};