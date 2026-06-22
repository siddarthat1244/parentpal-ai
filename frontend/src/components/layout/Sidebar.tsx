import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const drawerWidth = 260;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #E5E7EB",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          ParentPal AI
        </Typography>
      </Toolbar>

      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/ask">
          <ListItemIcon><ChatIcon /></ListItemIcon>
          <ListItemText primary="AI Chat" />
        </ListItemButton>

        <ListItemButton component={Link} to="/stories">
        <ListItemIcon><AutoStoriesIcon /></ListItemIcon>
        <ListItemText primary="Stories" />
      </ListItemButton>

        <ListItemButton>
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary="Meal Planner" />
        </ListItemButton>

        <ListItemButton component={Link} to="/child-profile">
        <ListItemIcon><ChildCareIcon /></ListItemIcon>
        <ListItemText primary="Child Profile" />
      </ListItemButton>
      <ListItemButton component={Link} to="/favorite-stories">
       <ListItemIcon><FavoriteIcon /></ListItemIcon>
      <ListItemText primary="Favorites" />
      </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;