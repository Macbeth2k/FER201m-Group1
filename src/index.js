import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routers/common/ErrorPage';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css';


// Common
import Customer from './layout/Customer';
import Home from './routers/common/Home';
import Products from './routers/common/Products';
import ProductDetail from './routers/common/ProductDetail';
import ShoppingCart from './routers/common/ShoppingCart';
import CheckOut from './routers/common/CheckOut';
import ConfirmCheckOut from './routers/common/ConfirmCheckOut'
import Report from './routers/common/Report'
import Profile from './routers/common/Profile'
import Comment from './routers/common/Comment'
import Orders from './routers/common/Orders'
import OrderDetail from './routers/common/OrderDetail'
import LoginLayout from './layout/LoginLayout'
import Login from './routers/common/Login';
import Register from './routers/common/Register';
import ForgotPassword from './routers/common/ForgotPassword'
// Admin
import Admin from './layout/Admin';
import ManageProducts from './routers/admin/ManageProducts'
import ManageCategories from './routers/admin/ManageCategories'
import ManageBrands from './routers/admin/ManageBrands'
import ManageAccounts from './routers/admin/ManageAccounts'
import EditProductDetail from './routers/admin/product/EditProductDetail'
import EditCategoryDetail from './routers/admin/category/EditCategoryDetail'
import EditBrandDetail from './routers/admin/brand/EditBrandDetail'
import EditAccountDetail from './routers/admin/EditAccountDetail'

// Customer-agent
import CustomerAgent from './layout/CustomerAgent'
import ManageMessages from './routers/customer-agent/ManageMessages'
import ManageDeliveries from './routers/customer-agent/ManageDeliveries'
import ManageComments from './routers/customer-agent/ManageComments'
import ViewOrder from './routers/customer-agent/ViewOrder'
import EditDeliveryDetail from './routers/customer-agent/EditDeliveryDetail'
import EditCustomerAccount from './routers/customer-agent/EditCustomerAccount'

// Delivery-agent
import DeliveryAgent from './layout/DeliveryAgent'
import DeiveryOrders from './routers/delivery-agent/DeliveryOrders'
import EditDeliveryOrder from './routers/delivery-agent/EditDeliveryOrder'

// Owner
import Owner from './layout/Owner'
import ManageRealProducts from './routers/owner/ManageRealProducts'
import ManageVouchers from './routers/owner/ManageVouchers'
import ManageEvents from './routers/owner/ManageEvents'
import ManageReports from './routers/owner/ManageReports'
import DecideReports from './routers/owner/DecideReports'
import OwnerDashboard from './routers/owner/OwnerDashboard'
import EditVoucherDetail from './routers/owner/EditVoucherDetail'
import EditEventDetail from './routers/owner/EditEventDetail'
import DeliveryOrders from './routers/delivery-agent/DeliveryOrders';



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Customer />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'products/:id',
          element: <ProductDetail />
        },
        {
          path: 'cart',
          element: <ShoppingCart />
        },

        {
          path: 'confirm-checkout',
          element: <ConfirmCheckOut />
        },
        {
          path: 'report',
          element: <Report />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'comment/:id',
          element: <Comment />
        },
        {
          path: 'orders',
          element: <Orders />
        },
        {
          path: 'order/:id',
          element: <OrderDetail />
        },
      ]
    },
    {
      path: 'checkout',
      element: <CheckOut />
    },
    {
      path: '/login',
      element: <LoginLayout />,
      children: [
        {
          path: '',
          element: <Login />
        },
        {
          path: '/login/register',
          element: <Register />
        },
        {
          path: '/login/forgot-password',
          element: <ForgotPassword />
        }
      ]
    },
    {
      path: '/admin',
      element: <Admin />,
      children: [
        {
          path: '/admin/products',
          element: <ManageProducts />
        },
        {
          path: '/admin/categories',
          element: <ManageCategories />
        },
        {
          path: '/admin/brands',
          element: <ManageBrands />
        },
        {
          path: '/admin/accounts',
          element: <ManageAccounts />
        },
        {
          path: '/admin/products/:id/edit',
          element: <EditProductDetail />
        },
        {
          path: '/admin/categories/:id/edit',
          element: <EditCategoryDetail />
        },
        {
          path: '/admin/brands/:id/edit',
          element: <EditBrandDetail />
        },
        {
          path: '/admin/accounts/:id/edit',
          element: <EditAccountDetail />
        },
        {
          path: '/admin/brands/:id/add',
          element: <EditAccountDetail /> //thay component
        },
        {
          path: '/admin/categories/:id/add',
          element: <EditAccountDetail /> //thay component
        },
      ]
    },
    {
      path: 'customer-agent',
      element: <CustomerAgent />,
      children: [
        {
          path: '/customer-agent/:id/messages',
          element: <ManageMessages />
        },
        {
          path: '/customer-agent/:id/deliveries',
          element: <ManageDeliveries />
        },
        {
          path: '/customer-agent/:id/comments',
          element: <ManageComments />
        },
        {
          path: '/customer-agent/:id/orders',
          element: <ViewOrder />
        },
        {
          path: '/customer-agent/:id/deliveries/detail',
          element: <EditDeliveryDetail />
        },
        {
          path: '/customer-agent/:id/account',
          element: <EditCustomerAccount />
        },
      ]
    },
    {
      path: 'delivery-agent',
      element: <DeliveryAgent />,
      children: [
        {
          path: '/delivery-agent/orders',
          element: <DeiveryOrders />
        },
        {
          path: '/delivery-agent/order/:id',
          element: <EditDeliveryOrder />
        }
      ],
    },
    {
      path: 'owner',
      element: <Owner />,
      children: [
        {
          path: '/owner/products',
          element: <ManageRealProducts />
        },
        {
          path: '/owner/vouchers',
          element: <ManageVouchers />
        },
        {
          path: '/owner/events',
          element: <ManageEvents />
        },
        {
          path: '/owner/reports',
          element: <ManageReports />
        },
        {
          path: '/owner/decide-reports',
          element: <DecideReports />
        },
        {
          path: '/owner/dashboard',
          element: <OwnerDashboard />
        },
        {
          path: '/owner/vouchers/:id',
          element: <EditVoucherDetail />
        },
        {
          path: '/owner/events/:id',
          element: <EditEventDetail />
        },
      ],
    },

  ],
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
