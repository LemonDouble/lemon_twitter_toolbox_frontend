import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from "react";
import { ColorModeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../recoil/isLogin";

export interface MenuBarWithoutNotificationProps {
}


export default function MenuBarWithoutNotification({}:MenuBarWithoutNotificationProps){

    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginState);


    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const UserMenu = [{name : 'My Page', url : '/mypage'}, {name : 'Logout', url : '/logout'}];
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const colorMode = React.useContext(ColorModeContext);


    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="page logo"
                        sx={{ mr: 2 }}
                        onClick={() => isLogin ? navigate("/mypage") : navigate("/")}
                    >
                        <HomeRepairServiceIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Lemon Toolbox
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box>
                        <Tooltip title="Toggle dark mode">
                            <IconButton
                            size="large"
                            aria-label="turn on/off dark mode"
                            color="inherit"
                            onClick={colorMode.toggleColorMode}
                            >
                                <DarkModeIcon />
                            </IconButton>
                        </Tooltip>
                

                        {isLogin && <><Tooltip title="Open User Menu">
                            <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={""}
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt : '45px'}}
                        id="menu-userbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical:'top',
                            horizontal:'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical:'top',
                            horizontal:'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            {UserMenu.map((menu) =>(
                                <MenuItem key={menu.name} onClick={() => navigate(menu.url)}>
                                    <Typography textAlign="center">{menu.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}