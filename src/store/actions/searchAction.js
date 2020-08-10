import gql from "graphql-tag";
import _ from "lodash";
import { client } from '../../apollo'

import {
  BUSLINE_DEP_FILTERS,
  BUSLINE_OPERATORS,
  BUSLINE_RET_FILTERS,
  BUSLINE_STOPS,
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SWAP_DEPARTURE_DESTINATION,
  SEARCH_REQUEST_RESET
} from "../constants";

export const useCreditAction = () => ({ type: "USE_CREDIT" });

const getStopsFromItems = items => {
  const spots = {
    pickup: null,
    dropoff: null,
    coordinates: { pickup: [], dropoff: [] }
  };
  if (!items) return spots;
  // get pickup, dropoff locations
  const coordinates = { pickup: [], dropoff: [] };
  const pickup = [];
  const dropoff = [];
  items.forEach(item => {
    const { pickUp, dropOff, pickupLocations, dropoffLocations } = item;
    if (pickUp && dropOff) {
      const { supplierPickupName } = pickUp;
      if (supplierPickupName && pickupLocations) {
        pickup.push(supplierPickupName);
        // defining unique values
        coordinates.pickup.push({
          name: supplierPickupName,
          latitude: pickupLocations.lat,
          longitude: pickupLocations.lng
        });
      }
    }
    if (dropOff) {
      const { supplierDropoffName } = dropOff;
      if (supplierDropoffName && dropoffLocations) {
        dropoff.push(supplierDropoffName);
        coordinates.dropoff.push({
          name: supplierDropoffName,
          latitude: dropoffLocations.lat,
          longitude: dropoffLocations.lng
        });
      }
    }
  });
  // remove duplicates
  spots.pickup = [...new Set(pickup)];
  spots.dropoff = [...new Set(dropoff)];
  spots.coordinates.pickup = _.uniqBy(coordinates.pickup, "name");
  spots.coordinates.dropoff = _.uniqBy(coordinates.dropoff, "name");

  // if empty array, set null
  if (spots.pickup.length === 0) spots.pickup = null;
  if (spots.dropoff.length === 0) spots.dropoff = null;

  return spots;
};
const getOperatorsFromItems = items => {
  let operators = [];
  if (!items) return operators;
  items.forEach(item => {
      operators.push({
        key: item.productName,
        displayValue: item.operatorDisplayName
      });
  });
  operators = _.uniqBy(operators, 'key');
  return operators;
};
// ------------------------------------
// Actions
// ------------------------------------

export const resetSearchRequest = () => ({
  type: SEARCH_REQUEST_RESET,
})

export const searchRequest = input => ({
  type: SEARCH_REQUEST,
  searchParameters: input
});

export const searchRequestSuccess = (
  count,
  startRoutes,
  endRoutes,
  discounts
) => ({
  type: SEARCH_REQUEST_SUCCESS,
  count,
  startDateList: startRoutes,
  endDateList: endRoutes,
  discounts
});

export const setBuslieStops = (depSpots, retSpots) => ({
  type: BUSLINE_STOPS,
  depSpots,
  retSpots
});
export const setBuslineOperators = (depOperators, retOperators) => ({
  type: BUSLINE_OPERATORS,
  depOperators,
  retOperators
});

export const setDepFilters = depFilters => ({
  type: BUSLINE_DEP_FILTERS,
  depFilters
});

export const setRetFilters = retFilters => ({
  type: BUSLINE_RET_FILTERS,
  retFilters
});

export const swapDepartureAndDestination = () => ({
  type: SWAP_DEPARTURE_DESTINATION
});

export const search = (input) => async dispatch => {
  dispatch(searchRequest(input));
  const {
    data: {
      routes: { startRoutes, endRoutes, discounts, count }
    }
  } = await client.query({
    query: gql`
      query routes(
        $traveler: TravelerInput!
        $from: String!
        $to: String!
        $startDate: String!
        $endDate: String
      ) {
        routes(
          from: $from
          to: $to
          startDate: $startDate
          endDate: $endDate
          traveler: $traveler
        ) {
          count
          discounts
          startRoutes {
            productCode
            productName
            dropoffLocations {
              lng
              lat
            }
            pickupLocations {
              lng
              lat
            }
            price
            roundTripPrice
            operatorDisplayName
            operatorLogo
            tax {
              type
              value
            }
            currency
            symbol
            date
            options {
              tourDepartureTime
            }
            pickUp {
              supplierPickupCode
              supplierPickupTime
              supplierPickupName
            }
            dropOff {
              supplierDropoffCode
              supplierDropoffName
              supplierDropoffTime
            }
            memberOnly
            pickupName
            dropoffName
            memberDetails {
              productCode
              productType
              productName
              pickUp {
                supplierPickupCode
                supplierPickupTime
                supplierPickupName
              }
              pickupName
              dropoffName
              dropOff {
                supplierDropoffCode
                supplierDropoffName
                supplierDropoffTime
              }
              price
              roundTripPrice
              tax {
                type
                value
              }
              currency
              symbol
            }
          }
          endRoutes {
            productCode
            productName
            pickupName
            dropoffName
            dropoffLocations {
              lng
              lat
            }
            pickupLocations {
              lng
              lat
            }
            price
            operatorDisplayName
            roundTripPrice
            tax {
              type
              value
            }
            currency
            operatorLogo
            symbol
            date
            options {
              tourDepartureTime
            }
            pickUp {
              supplierPickupCode
              supplierPickupTime
              supplierPickupName
            }
            dropOff {
              supplierDropoffCode
              supplierDropoffName
              supplierDropoffTime
            }
            memberOnly
            memberDetails {
              productCode
              productType
              productName
              pickupName
              dropoffName
              pickUp {
                supplierPickupCode
                supplierPickupTime
                supplierPickupName
              }
              dropOff {
                supplierDropoffCode
                supplierDropoffName
                supplierDropoffTime
              }
              price
              roundTripPrice
              tax {
                type
                value
              }
              currency
              symbol
            }
          }
        }
      }
    `,
    variables: input
  });

  const depSpots = getStopsFromItems(startRoutes);
  const retSpots = getStopsFromItems(endRoutes);
  const depOperators = getOperatorsFromItems(startRoutes);
  const retOperators = getOperatorsFromItems(endRoutes);
  dispatch(setBuslieStops(depSpots, retSpots));
  dispatch(setBuslineOperators(depOperators, retOperators));

  return dispatch(
    searchRequestSuccess(count, startRoutes, endRoutes, discounts)
  );
};

export const actions = {
  search,
  searchRequest,
  setDepFilters,
  setRetFilters,
  swapDepartureAndDestination
};
