import { lazy } from "react";
import withSuspense from "../utils/withSuspense";

export const NotFoundPage = withSuspense(
  lazy(() => import("../pages/NotFoundPage"))
);

export const IndexPage = withSuspense(lazy(() => import("../pages/Index")));

export const ProfilePage = withSuspense(
  lazy(() => import("../pages/UserProfile"))
);

export const UsersPage = withSuspense(lazy(() => import("../pages/Users")));

export const SignUpPage = withSuspense(lazy(() => import("../pages/AddUser")));

export const EditUserPage = withSuspense(
  lazy(() => import("../pages/EditUser"))
);

export const ProductsPage = withSuspense(
  lazy(() => import("../pages/Product"))
);

export const InventoryPage = withSuspense(
  lazy(() => import("../pages/Inventory"))
);

export const AddProductsPage = withSuspense(
  lazy(() => import("../pages/AddNewProduct"))
);

export const EditProductsPage = withSuspense(
  lazy(() => import("../pages/EditProduct"))
);

export const SalesOrderPage = withSuspense(
  lazy(() => import("../pages/SalesOrderList"))
);

export const NewSalesOrderPage = withSuspense(
  lazy(() => import("../pages/AddSalesOrder"))
);

export const LoginPage = withSuspense(lazy(() => import("../pages/Login")));
