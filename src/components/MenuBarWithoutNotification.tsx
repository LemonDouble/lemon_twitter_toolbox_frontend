import { AppBar, Badge, Box, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle } from "@mui/icons-material";

export interface MenuBarWithoutNotificationProps {
}


export default function MenuBarWithoutNotification({}:MenuBarWithoutNotificationProps){
    const [anchorEl , setAnchorEl] = useState<null | HTMLElement>(null);
    
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
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
                        <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={""}
                        aria-haspopup="true"
                        onClick={()=> {}}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}