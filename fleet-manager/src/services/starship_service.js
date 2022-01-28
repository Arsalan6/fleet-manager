import axios from 'axios';
import constants from '../config/constants';

/**
 * Fetches starship list
 * @param searchParam
 * @returns starshipList
 */
async function getStarshipList(searchParam) {
  let STARSHIP_LIST_ENDPOINT = `${constants.api.url.server}${constants.api.url.starship.getAll}`;
  if (searchParam) {
    STARSHIP_LIST_ENDPOINT = STARSHIP_LIST_ENDPOINT + `/?search=${searchParam}`
  }
  const response = await axios.get(STARSHIP_LIST_ENDPOINT);
  return response.data.results;
}

const starshipService = {
  getStarshipList
}

export default starshipService;
