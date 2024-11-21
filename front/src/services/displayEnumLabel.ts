/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayCityNameEnum(field: API.ICityName) {
  return { Beijing: 'Beijing', Wuhan: 'Wuhan', Other: 'Other' }[field];
}
