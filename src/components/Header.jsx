import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";

import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "./auth/Auth";
import { useHistory } from "react-router-dom";

function Header() {
	const { currentUser } = useContext(AuthContext);
	const currentUserEmail = currentUser ? currentUser.email : "";
	const dispatch = useDispatch();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	useEffect(() => {
		if (!currentUser) {
			history.push("/login");
		}
	}, [currentUser]);

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
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			{currentUser ? (
				<Box>
					<MenuItem onClick={() => handleMenuClose("/profile")}>Профиль</MenuItem>
					<MenuItem onClick={logOut}>Выйти</MenuItem>
				</Box>
			) : (
				<MenuItem onClick={logIn}>Войти</MenuItem>
			)}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<Typography variant='body2'>Меню:</Typography>
			{currentUser ? (
				<Box>
					<MenuItem onClick={() => handleMenuClose("/profile")}>Профиль</MenuItem>
					<MenuItem onClick={logOut}>Выйти</MenuItem>
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
					<Typography variant='h4' component='h1' sx={{ flexGrow: 1 }} color='HighlightText'>
						Ваше резюме
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Typography sx={{ color: "white" }}>{currentUserEmail}</Typography>
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'>
							<AccountCircle />
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
							<MoreIcon />
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
