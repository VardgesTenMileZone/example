import LoginContainer from "./containers/LoginContainer/LoginContainer";
import TicketsContainer from "./containers/TicketsContainer/TicketsContainer";
import ViewContainer from "./containers/ViewContainer/ViewContainer";
import ReportsContainer from './containers/ReportsContainer/ReportsContainer';
import MarketingContainer from './containers/MarketingContainer/MarketingContainer';
import PassengerNotificationsContainer from "./containers/PassengerNotificationsContainer/PassengerNotificationsContainer";
import UsersContainer from "./containers/UsersContainer/UsersContainer";
import UsersViewContainer from "./containers/UsersViewContainer/UsersViewContainer";
import UserDiscountContainer from "./containers/UserDiscuntContainer/UserDiscountContainer";
import CommissionContainer from "./containers/CommissionContainer/CommissionContainer";
import ProductContainer from './containers/ProductContainer/ProductContainer';
import ProductViewContainer from './containers/ProductViewContainer/ProductViewContainer';
import ViewNotificationsContainer from "./containers/ViewNotificationsContainer/ViewNotificationsContainer";
import AddNotificationContainer from "./containers/AddNotificationContainer/AddNotificationContainer";
import UpdateMountainNotificationContainer from "./containers/UpdateMountainNotificationContainer/UpdateMountainNotificationContainer";

export const Routes = [
  {
    isNavBar: true,
    isExact: true,
    path: "/",
    name: "Login",
    component: LoginContainer
  },
  {
    isNavBar: true,
    isExact: true,
    isPrivate: true,
    path: "/tickets",
    name: "Tickets",
    component: TicketsContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/tickets/view`,
    name: "View",
    component: ViewContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/reports`,
    name: "reports",
    component: ReportsContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/marketing`,
    name: "marketing",
    component: MarketingContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/customer-messaging`,
    name: "customer-messaging",
    component: PassengerNotificationsContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/users`,
    name: "users",
    component: UsersContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/users/view`,
    name: "users/view",
    component: UsersViewContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/users/discount`,
    name: "users/discount",
    component: UserDiscountContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/commission`,
    name: "/commission",
    component: CommissionContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/products`,
    name: "/products",
    component: ProductContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/product/:id`,
    name: "product view",
    component: ProductViewContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/notifications`,
    name: "view notifications",
    component: ViewNotificationsContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/add-notifiy`,
    name: "view notifications",
    component: AddNotificationContainer
  },
  {
    isExact: true,
    isPrivate: true,
    path: `/update-notification`,
    name: "update notifications",
    component: UpdateMountainNotificationContainer
  }
];

export default Routes;

