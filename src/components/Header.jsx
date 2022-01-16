import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "./auth/Auth";
import { useHistory } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
function Header() {
	const { currentUser } = useContext(AuthContext);
	const currentUserEmail = currentUser ? currentUser.email : "";
	const dispatch = useDispatch();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = (path) => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push(path);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const logOut = () => {
		handleMenuClose("/login");
		dispatch({ type: "LOG_OUT" });
	};
	const logIn = () => {
		handleMenuClose("/login");
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			id={menuId}
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}>
			{currentUser ? (
				<Box>
					<MenuItem onClick={() => handleMenuClose("/startpage")}>
						<ListItemIcon>
							<ArticleIcon fontSize='small' />
						</ListItemIcon>
						Главная
					</MenuItem>
					<MenuItem onClick={() => handleMenuClose("/profile")}>
						<ListItemIcon>
							<AccountCircleIcon fontSize='small' />
						</ListItemIcon>
						Профиль
					</MenuItem>
					<MenuItem onClick={logOut}>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						Выйти
					</MenuItem>
				</Box>
			) : (
				<MenuItem onClick={logIn}>Войти</MenuItem>
			)}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			anchorEl={mobileMoreAnchorEl}
			id={mobileMenuId}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			sx={{ mt: 3 }}>
			{currentUser ? (
				<Box>
					<MenuItem onClick={() => handleMenuClose("/startpage")}>
						<ListItemIcon>
							<ArticleIcon fontSize='small' />
						</ListItemIcon>
						Главная
					</MenuItem>
					<MenuItem onClick={() => handleMenuClose("/profile")}>
						<ListItemIcon>
							<AccountCircleIcon fontSize='small' />
						</ListItemIcon>
						Профиль
					</MenuItem>
					<MenuItem onClick={logOut}>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						Выйти
					</MenuItem>
				</Box>
			) : (
				<MenuItem onClick={logIn}>Войти</MenuItem>
			)}
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<Typography variant='h4' component='h1' sx={{ flexGrow: 1 }} color='white'>
						Ваше резюме
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					{/*<Typography sx={{ color: "white" }}>{currentUserEmail}</Typography>*/}
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'>
							<Avatar sx={{ bgcolor: deepOrange[500], textTransform: "uppercase" }}>{currentUserEmail[0]}</Avatar>
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<Avatar sx={{ bgcolor: deepOrange[500], textTransform: "uppercase" }}>{currentUserEmail[0]}</Avatar>
							{/*<ListIcon fontSize='large' />*/}
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}

export default Header;
