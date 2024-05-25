import {Route, Routes} from "react-router-dom";
import HeaderComponent from "../components/Header/HeaderComponent";
import FooterComponent from "../components/Footer/FooterComponent";
import HomeScreen from "../pages/User/HomeScreen/HomeScreen";
import LoginScreen from "../pages/User/LoginScreen/LoginScreen";
import RegisterScreen from "../pages/User/RegisterScreen/RegisterScreen";
import RegisterConfirmScreen from "../pages/User/RegisterConfirmScreen/RegisterConfirmScreen";
import ForgotPasswordScreen from "../pages/User/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordConfirm from "../pages/User/ForgotPasswordConfirm/ForgotPasswordConfirm";
import ExchangeScreen from "../pages/User/ExchangeScreen/ExchangeScreen";
import CartScreen from "../pages/User/CartScreen/CartScreen";
import OrderScreen from "../pages/User/OrderScreen/OrderScreen";
import CollectionScreen from "../pages/User/CollectionsScreen/CollectionScreen";
import AccountDetail from "../pages/User/AccountDetailScreen/AccountDetail";
import SizeSelectorScreen from "../pages/User/SizeSelectorScreen/SizeSelectorScreen";
import OrderTrackingScreen from "../pages/User/OrderTrackingScreen/OrderTrackingScreen";
import ProductDetailScreen from "../pages/User/ProductDetailScreen/ProductDetailScreen";
import SearchScreen from "../pages/User/SearchScreen/SearchScreen";

const Router = () => {
    return (
        <div>
            <HeaderComponent/>
            <Routes>
                <Route path={'/'} element={<HomeScreen/>}/>
                <Route path={'/home'} element={<HomeScreen/>}/>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={'/product-detail/:id'} element={<ProductDetailScreen/>}/>
                <Route path={'/register'} element={<RegisterScreen/>}/>
                <Route path={'/register-confirm'} element={<RegisterConfirmScreen/>}/>
                <Route path={'/forgot-password'} element={<ForgotPasswordScreen/>}/>
                <Route path={'/forgot-password-confirm'} element={<ForgotPasswordConfirm/>}/>
                <Route path={'/exchange'} element={<ExchangeScreen/>}/>
                <Route path={'/cart'} element={<CartScreen/>}/>
                <Route path={'/order'} element={<OrderScreen/>}/>
                <Route path={'/categories'} element={<CollectionScreen/>}/>
                <Route path={'/account-detail'} element={<AccountDetail/>}/>
                <Route path={'/size-selector'} element={<SizeSelectorScreen/>}/>
                <Route path={'/order-tracking'} element={<OrderTrackingScreen/>}/>
                <Route path={'/order-tracking'} element={<OrderTrackingScreen/>}/>
                <Route path={'/size-selector'} element={<SizeSelectorScreen/>}/>
                <Route path={'/search'} element={<SearchScreen/>}/>
            </Routes>
            <FooterComponent/>
        </div>
    );
}
export default Router;
