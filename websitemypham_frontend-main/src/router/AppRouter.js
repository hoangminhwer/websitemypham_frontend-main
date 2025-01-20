import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import HomePage from "../pages/Homepage";
import ShopPage from "../pages/ShopPage";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import SearchPage from "../pages/SearchPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import ProductDetailsPage from "../pages/ProductDetailPage";

import AdminLayout from "../admin/layouts/AdminLayout";
import DashboardPage from "../admin/pages/DashboardPage";
import AddProductPage from "../admin/pages/AddProductPage";
import AdminProductPage from "../admin/pages/AdminProductPage";
import AdminOrdersPage from "../admin/pages/AdminOrdersPage";
import AdminDetailOrderPage from "../admin/pages/AdminDetailOrderPage";
import AdminAccountPage from "../admin/pages/AdminAccountPage";
import AdminTransportPage from "../admin/pages/AdminTransportPage";

import AdminDetailShippingPage from "../admin/pages/AdminDetailShippingPage";
import EditAccountPage from "../admin/pages/EditAccountPage";
import AdminCustomerDetailPage from "../admin/pages/AdminCustomerDetailPage";

import EditProductPage from "../admin/pages/EditProductPage";
import AdminDetailProduct from "../admin/pages/AdminDetailProduct";
import AddTransportPage from "../admin/pages/AddTransportPage";

import EditTransport from "../admin/pages/EditTransport";
import AdminTransactionPage from "../admin/pages/AdminTransactionPage";
import AdminPaymentPage from "../admin/pages/AdminPaymentPage";

import AddAccountPage from "../admin/pages/AddAccountPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFaild from "../pages/PaymentFaild";
import CheckOrder from "./CheckOrder";
import OrderDetail from "../components/Account/OrderDetail";
import ProfileFormPage from "../admin/pages/ProfileFormPage";
import AdminReportPage from "../admin/pages/AdminReportPage";
import BackupPage from "../admin/pages/BackupPage";
import AdminCategoriesPage from "../admin/pages/AdminCategoriesPage";
import AddCategoryPage from "../admin/pages/AddCategoryPage";
import EditCategoryPage from "../admin/pages/EditCategoryPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Routes cho trang chính */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <ShopPage />
            </Layout>
          }
        />
        <Route
          path="/shop/category/:categoryId"
          element={
            <Layout>
              <ShopPage />
            </Layout>
          }
        />
        <Route
          path="/account"
          element={
            <Layout>
              <AccountPage />
            </Layout>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <Layout>
              <OrderDetail />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <CheckoutPage />
            </Layout>
          }
        />
        <Route
          path="/payment-success"
          element={
            <Layout>
              <PaymentSuccess />
            </Layout>
          }
        />
        <Route
          path="/payment-failure"
          element={
            <Layout>
              <PaymentFaild />
            </Layout>
          }
        />
        shop/category/2
        <Route
          path="/checkorder"
          element={
            <Layout>
              <CheckOrder />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
          <Route
          path="/forgot-pasword"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
           <Route 
          path="/reset-password" 
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          } 
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterPage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path="/shop/:productID"
          element={
            <Layout>
              <ProductDetailsPage />
            </Layout>
          }
        />
        {/* Routes cho admin */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              {" "}
              <DashboardPage />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              {" "}
              <DashboardPage />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/admin/order"
          element={
            <AdminLayout>
              <AdminOrdersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/order/detail/:id"
          element={
            <AdminLayout>
              <AdminDetailOrderPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/transport"
          element={
            <AdminLayout>
              <AdminTransportPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/transport/detail/:id"
          element={
            <AdminLayout>
              <AdminDetailShippingPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/account"
          element={
            <AdminLayout>
              <AdminAccountPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/account/addaccount"
          element={
            <AdminLayout>
              <AddAccountPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/account/editaccount/:id"
          element={
            <AdminLayout>
              <EditAccountPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/account/:id"
          element={
            <AdminLayout>
              <AdminCustomerDetailPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminLayout>
              <AdminProductPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/product/addproduct"
          element={
            <AdminLayout>
              {" "}
              <AddProductPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/product/editproduct/:id"
          element={
            <AdminLayout>
              <EditProductPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/product/detail/:id"
          element={
            <AdminLayout>
              <AdminDetailProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/shipments/addshipmentfromorder/:id"
          element={
            <AdminLayout>
              <AddTransportPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/shipments/editshipment/:id"
          element={
            <AdminLayout>
              <EditTransport />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/transaction"
          element={
            <AdminLayout>
              <AdminTransactionPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/payment"
          element={
            <AdminLayout>
              <AdminPaymentPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/report"
          element={
            <AdminLayout>
              <AdminReportPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <ProfileFormPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/backup"
          element={
            <AdminLayout>
              <BackupPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminLayout>
              <AdminCategoriesPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <AdminLayout>
              <AddCategoryPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/edit-category/:id"
          element={
            <AdminLayout>
              <EditCategoryPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
