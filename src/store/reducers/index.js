import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ticketsReducer from './TicketsReducer';
import searchReducer from "./searchReducer";
import findTripsReducer from './findTripsReducer';
import bookReducer from './bookReducer';
import reportsReducer from './ReportsReducer';
import marketingReducer from './MarketingReducer';
import notificationsReducer from "./Notifications";
import productsReducer from './ProductsReducer';

export default combineReducers({
  auth: AuthReducer,
  marketing: marketingReducer,
  tickets: ticketsReducer,
  search: searchReducer,
  book: bookReducer,
  findTrips: findTripsReducer,
  reports: reportsReducer,
  notification:notificationsReducer,
  products: productsReducer
});
