import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../resources/BasicResources";
import useCustomLogin from "../hooks/useCustomLogin";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getCartItemAsync } from "../slices/cartSlice";
import useCustomCart from "../hooks/useCustomCart";
import PersonIcon from "@mui/icons-material/Person";

const host = `${API_SERVER_HOST}/api/user`;

let settings = [];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  maxHeight: "75%",
  scroll: "auto",
  bgcolor: "background.paper",
  border: "2px solid #82b1ff",
  boxShadow: 24,
  p: 4,
};

const BasicMenu = ({ children }) => {
  const { doLogout, loginState, isLogin, isRememberMe } = useCustomLogin();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { cartItems } = useCustomCart();
  console.log(cartItems);

  if (!loginState.username || loginState.username === undefined) {
    settings = ["Profile", "Account", "Dashboard", "Login"];
  } else {
    settings = ["Profile", "Account", "Dashboard", "Logout"];
  }

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenuItem = (setting) => {
    switch (setting) {
      case "Profile":
        if (loginState.username === "") {
          navigate("/login");
        } else {
          navigate(`/user/details/${loginState.username}`);
        }
        break;
      case "Account":
        if (loginState.username === "") {
          navigate("/login");
        } else {
          navigate("/user/account");
        }
        break;
      case "Dashboard":
        if (loginState.username === "") {
          navigate("/login");
        } else {
          navigate("/user/dashboard");
        }
        break;
      case "Login":
        navigate("/login");
        break;
      case "Logout":
        doLogout();
        navigate("/");
        break;
      default:
        break;
    }

    // 메뉴 닫기 등 다른 동작 수행
    handleCloseUserMenu();
  };

  function handleOpenCart() {
    if (loginState.username === "") {
      navigate("/login");
    }
    setOpen(true);
  }

  useEffect(() => {
    if (isLogin) {
      dispatch(getCartItemAsync(isRememberMe));
    }
  }, [isLogin, dispatch, isRememberMe]);

  let totalPrice = 0;

  if (cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price * cartItems[i].qty;
    }
  }

  return (
    <>
      <AppBar
        position='relative'
        color='appbar'
        sx={{
          width: "75vw",
          height: "4rem",
          float: "right",
          borderRadius: "10px",
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-around",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <Button component={Link} to='/products/list?category=1'>
              <Typography sx={{ fontSize: "2em" }}>인테리어</Typography>
            </Button>
            <Button component={Link} to={"/products/list?category=2"}>
              <Typography sx={{ fontSize: "2em" }}>전자기기</Typography>
            </Button>
            <Button component={Link} to='/products/list?category=3'>
              <Typography sx={{ fontSize: "2em" }}>공구</Typography>
            </Button>
            <Button component={Link} to='/community'>
              <Typography sx={{ fontSize: "2em" }}>리뷰</Typography>
            </Button>
            <Box>
              <Tooltip title='Open Menu'>
                <IconButton onClick={handleOpenUserMenu}>
                  {(!loginState || !loginState.profileImage) && (
                    <>
                      <Avatar alt='U'>
                        <PersonIcon fontSize='large' />
                      </Avatar>
                    </>
                  )}
                  {loginState && loginState.profileImage && (
                    <Avatar
                      alt={loginState.username}
                      src={`${host}/view/us_${loginState.profileImage}`}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title='Open Cart'>
                <IconButton art='cart' onClick={handleOpenCart}>
                  <Avatar>
                    <ShoppingCartIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleClickMenuItem(setting);
                    }}
                  >
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        {children}
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <Box sx={modalStyle}>
            {!isLogin && (
              <Typography variant='h6' component='h2'>
                로그인이 필요합니다.
              </Typography>
            )}
            {isLogin && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    {loginState.nickname}의 장바구니
                  </Typography>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    이름
                  </Typography>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    수량
                  </Typography>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    가격
                  </Typography>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    가격 합
                  </Typography>
                </div>
                {cartItems && cartItems !== undefined && !cartItems.error && (
                  <>
                    <List>
                      {Array.isArray(cartItems) ? (
                        <>
                          {cartItems.map((cartItem, index) => (
                            <ListItem
                              // key={cartItem.cino}
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  src={`${API_SERVER_HOST}/api/products/view/s_${cartItem.imageFile}`}
                                />
                              </ListItemAvatar>
                              <Typography>{cartItem.pname}</Typography>
                              <Typography>{cartItem.qty}</Typography>
                              <Typography>{cartItem.price}</Typography>
                              <Typography>
                                {cartItem.price * cartItem.qty}
                              </Typography>
                            </ListItem>
                          ))}
                        </>
                      ) : (
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={`${API_SERVER_HOST}/api/products/view/s_${cartItems.imageFile}`}
                            />
                          </ListItemAvatar>
                          <Typography>{cartItems.pname}</Typography>
                          <Typography>{cartItems.qty}</Typography>
                          <Typography>{cartItems.price}</Typography>
                        </ListItem>
                      )}
                    </List>
                    <Box
                      sx={{
                        display: "flex",
                        margin: "auto",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography sx={{ marginTop: "0.5rem" }}>
                        총 주문 금액 : {totalPrice}원
                      </Typography>
                      <Button
                        sx={{
                          float: "right",
                        }}
                      >
                        <Typography color='secondary'>주문하기</Typography>
                      </Button>
                    </Box>
                  </>
                )}
                {(!cartItems || cartItems === undefined) && (
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    상품이 없습니다.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BasicMenu;
