import moment from "moment";
import {
  BUSLINE_DEP_FILTERS,
  BUSLINE_OPERATORS,
  BUSLINE_RET_FILTERS,
  BUSLINE_STOPS,
  SEARCH_REQUEST,
  SEARCH_REQUEST_RESET,
  SEARCH_REQUEST_SUCCESS,
  SWAP_DEPARTURE_DESTINATION,
  GET_CREDITS
} from "../constants";

const initialState = {
  loading: null,
  loaded: null,
  error: null,
  startDateList: null,
  endDateList: null,
  coordinates: null,
  credits: null,
  count: 0,
  useCredit: false,
  useSnowPasses: false,
  searchParameters: {
    from: null,
    to: null,
    startDate: moment(new Date()).toISOString(),
    endDate: null,
    traveler: {
      adult: 1,
      total: 1
    }
  },

  // bus stops (departure/return + pickup/dropoff)
  stops: {
    dep: {
      pickup: null,
      dropoff: null
    },
    ret: {
      pickup: null,
      dropoff: null
    }
  },
  // bus operators
  operators: {
    dep: {
      productName: null
    },
    ret: {
      productName: null
    }
  },

  // ticket filter conditions (departure/return + pickup/dropoff + stop+time)
  depFilters: {
    pickupStop: null,
    pickupTime: null,
    dropoffStop: null,
    dropoffTime: null,
    operators: null
  },
  retFilters: {
    pickupStop: null,
    pickupTime: null,
    dropoffStop: null,
    dropoffTime: null,
    operators: null
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_REQUEST]: (state, input) => ({
    ...state,
    loading: true,
    loaded: false,
    searchParameters: input.searchParameters
  }),
  [SEARCH_REQUEST_RESET] : (state, input) => ({
    ...state,
    loading: null,
    loaded: null,
    searchParameters: {
      from: null,
      to: null,
      startDate: moment(new Date()).toISOString(),
      endDate: null,
      traveler: {
        adult: 1,
        total: 1
      }
    },
    depFilters: {
      pickupStop: null,
      pickupTime: null,
      dropoffStop: null,
      dropoffTime: null,
      operators: null
    },
  }),
  USE_CREDIT: state => ({
    ...state,
    useCredit: !state.useCredit
  }),
  USE_SNOW_PASSES: state => ({
    ...state,
    useSnowPasses: !state.useSnowPasses
  }),

  [GET_CREDITS.PENDING]: state => ({
    ...state,
    loading: true,
    loaded: false
  }),
  [GET_CREDITS.SUCCESS]: (state, { data: { balance } }) => ({
    ...state,
    loading: false,
    loaded: true,
    balance: balance / 100
  }),
  [GET_CREDITS.ERROR]: (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  }),

  [SEARCH_REQUEST_SUCCESS]: (state, { count, startDateList, endDateList, discounts }) => ({
    ...state,
    count,
    startDateList,
    endDateList,
    loaded: true,
    loading: false,
    discounts
  }),

  [BUSLINE_STOPS]: (state, { depSpots, retSpots }) => {
    return {
      ...state,
      coordinates: depSpots.coordinates,
      stops: {
        dep: {
          pickup: depSpots.pickup,
          dropoff: depSpots.dropoff
        },
        ret: {
          pickup: retSpots.pickup,
          dropoff: retSpots.dropoff
        }
      }
    }
  },
  [BUSLINE_OPERATORS]: (state, { depOperators, retOperators }) => ({
    ...state,
    operators: {
      dep: {
        productName: depOperators
      },
      ret: {
        productName: retOperators
      }
    }
  }),

  [BUSLINE_DEP_FILTERS]: (state, { depFilters }) => ({
    ...state,
    depFilters
  }),

  [BUSLINE_RET_FILTERS]: (state, { retFilters }) => ({
    ...state,
    retFilters
  }),
  [SWAP_DEPARTURE_DESTINATION]: state => ({
    ...state,
    searchParameters: {
      ...state.searchParameters,
      from: state.searchParameters.to,
      to: state.searchParameters.from
    }
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
