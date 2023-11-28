import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import {
  IndexPage,
  NotFoundPage,
  LoginPage,
  ProfilePage,
  ProductsPage,
  AddProductsPage,
  UsersPage,
  InventoryPage,
  EditProductsPage,
  EditUserPage,
  SalesOrderPage,
  NewSalesOrderPage,
  RegisterPage,
  SearchProductsPage,
} from "./pages";
import Page from "../components/Page/Page";
// import { AuthProvider } from "../context/AuthenticationContext";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { AxiosInterceptor } from "../providers/axios";
import AddUser from "../pages/AddUser";

const Router = () => {
  return (
    <AxiosInterceptor>
      {/* <AuthProvider> */}
      <Routes>
        <Route
          path={routes.index}
          element={
            <PrivateRoute>
              <Page>
                <IndexPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route path={routes.signup} element={<RegisterPage />} />
        <Route
          path={routes.profile}
          element={
            <PrivateRoute>
              <Page>
                <ProfilePage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.searchProducts}
          element={
            <PrivateRoute>
              <Page>
                <SearchProductsPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.products}
          element={
            <PrivateRoute>
              <Page>
                <ProductsPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.addProduct}
          element={
            <PrivateRoute>
              <Page>
                <AddProductsPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.inventory}
          element={
            <PrivateRoute>
              <Page>
                <InventoryPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.users}
          element={
            <PrivateRoute>
              <Page>
                <UsersPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editUser}
          element={
            <PrivateRoute>
              <Page>
                <EditUserPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.adduser}
          element={
            <PrivateRoute>
              <Page>
                <AddUser />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editProduct}
          element={
            <PrivateRoute>
              <Page>
                <EditProductsPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.sales}
          element={
            <PrivateRoute>
              <Page>
                <SalesOrderPage />
              </Page>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.newSales}
          element={
            <PrivateRoute>
              <Page>
                <NewSalesOrderPage />
              </Page>
            </PrivateRoute>
          }
        />

        <Route path={routes.login} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* </AuthProvider> */}
    </AxiosInterceptor>
  );
};

export default Router;
