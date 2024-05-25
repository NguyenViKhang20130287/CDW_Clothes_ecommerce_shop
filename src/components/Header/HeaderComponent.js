import React, {useEffect, useState} from "react";
import LOGO from '../../assets/img/logo.webp'
import {IoCartOutline, IoSearchOutline, IoPersonOutline, IoCloseOutline} from "react-icons/io5";
import {HiBars3BottomLeft} from "react-icons/hi2";
import './HeaderComponent.css'
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import APIService from "../../services/APIService";
import ProductCardComponent from "../ProductCard/ProductCardComponent";


const HeaderComponent = () => {
    const [searchPopupShowStatus, setSearchPopupShowStatus] = useState(false)
    const [sidebarToggleStatus, setSidebarToggleStatus] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0);
    const cartItems = useSelector(state => state.root.cart);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const handleShowHideSearch = (e) => {
        e.preventDefault()
        if (searchPopupShowStatus === false)
            setSearchPopupShowStatus(true)
        else setSearchPopupShowStatus(false)
    }

    const handleToggleSidebar = (e) => {
        e.preventDefault()
        if (sidebarToggleStatus === false)
            setSidebarToggleStatus(true)
        else setSidebarToggleStatus(false)
    }

    const handleInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate('/search', { state: { keyword: searchKeyword } });
            setSearchPopupShowStatus(false);
        }
    };

    const findProduct = async () => {
        if (searchKeyword.trim() === '') {
            setSearchResult([]);
        } else {
            try {
                const searchResult = await new APIService().fetchData(`http://localhost:8080/api/v1/product/search?name=${searchKeyword}`);
                setSearchResult(searchResult);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        }
    }

    useEffect(() => {
        const newTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);

    useEffect(() => {
        findProduct();
    }, [searchKeyword])
    return (
        <div className={'main'}>
            <div className={'headerContainer'}>
                <div className={`searchPopup ${searchPopupShowStatus ? 'searchPopupShow' : ''}`}>
                    <div className={'searchWrapper'}>
                        <button className={'closeBtn'}
                                onClick={event => handleShowHideSearch(event)}>
                            <IoCloseOutline/>
                        </button>
                        <h3 className={'searchTitle'}>TÌM KIẾM</h3>
                        <div className={'searchInput'}>
                            <input placeholder={'Tìm kiếm sản phẩm...'}
                                   value={searchKeyword}
                                   onChange={handleInputChange}
                                   onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                            <button className={'searchBtn'} type={'button'} onClick={handleSearch}>Tìm kiếm</button>
                        </div>
                        <div className={'searchResult'}>
                            <div className={'searchResultList'}>
                                {searchResult.slice(0, 7).map((product, index) => (
                                    <ProductCardComponent image={product.thumbnail}
                                                          name={product.name}
                                                          price={product.price}
                                                          originPrice={product.price}/>
                                ))}
                                {searchResult.length > 7 && (
                                    <div className={'productCardItem'}>
                                        <div className={'itemImage'}>
                                            <span>Xem thêm</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`sidebarPopupResponsive ${sidebarToggleStatus ? 'sidebarResponsiveToggle' : ''}`}>
                    <button className={'closeBtn'}
                            onClick={event => handleToggleSidebar(event)}
                    >
                        <IoCloseOutline/>
                    </button>
                    <h3 className={'title'}>Danh mục</h3>
                    <div className={'sidebarWrapper'}>
                        <div className={'categoriesWrapper'}>
                            <div className={'categoryItem'}>
                                <span>Tất cả sản phẩm</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo thun</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Baby Tee</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo polo</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo sơ mi</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Áo khoác</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Hoodie</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Quần</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Quần nữ</span>
                            </div>
                            <div className={'categoryItem'}>
                                <span>Phụ kiện</span>
                            </div>
                        </div>
                        <div className={'sideBarItem'}>
                            <span>Đổi trả</span>
                        </div>
                        <div className={'sideBarItem'}>
                            <span>Bảng size</span>
                        </div>
                    </div>
                </div>
                <div className={'headerWrapper'}>
                    <div className={'leftContentResponsive'}>
                        <button className={'sideBar'}
                                onClick={event => handleToggleSidebar(event)}>
                            <HiBars3BottomLeft className={'icon'}/>
                        </button>
                    </div>
                    <div className={'leftContent'}>
                        <Link to={'/'} className={'home'}>TRANG CHỦ</Link>
                        <span className={'warranty'}>
                            <Link to={'/exchange'}>ĐỔI TRẢ</Link>
                        </span>
                    </div>
                    <div className={'centerContent'}>
                        <div className={'imageLogoWrapper'}>
                            <Link to={'/'}>
                                <img src={LOGO} alt={'logo'}/>
                            </Link>
                        </div>
                    </div>
                    <div className={'rightContent'}>
                        <span className={'sizeTable'}>
                            <Link to={'/size-selector'}>BẢNG SIZE</Link>
                        </span>
                        <div className={'groupBtn'}>
                            <button className={'btnIcons'} id={'searchBtn'} type={"button"}
                                    onClick={e => handleShowHideSearch(e)}>
                                <IoSearchOutline className={'icons'}/>
                            </button>
                            <button className={'btnIcons'} type={"button"}>
                                <Link to={'/cart'}>
                                    <IoCartOutline className={'icons'}/>
                                    <span className="cart-quantity">{totalQuantity}</span>
                                </Link>

                            </button>
                            <Link to={'/login'} className={'btnIcons'}>
                                <IoPersonOutline className={'icons'}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'categoriesContainer'}>
                <div className={'categoriesWrapper'}>
                    <div className={'categoryItem'}>
                        <span>Tất cả sản phẩm</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo thun</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Baby Tee</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo polo</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo sơ mi</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Áo khoác</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Hoodie</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Quần</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Quần nữ</span>
                    </div>
                    <div className={'categoryItem'}>
                        <span>Phụ kiện</span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default HeaderComponent;
