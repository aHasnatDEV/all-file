import { getSearchResult } from "./search.entity";

export default function search() {
  /**
   * GET /serach
   * @description this route is used to global serach result.
   * @response global serach data.
   */
  this.route.get("/search", getSearchResult(this));
}
