import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SidebarSection from "./SidebarSection";
import { useChildContext } from "../../context/ChildContext";
import { calculateAge } from "../../utils/calculateAge";

const drawerWidth = 300;

function Sidebar() {
  const location = useLocation();
  const { children, activeChild, changeChild, refreshChildren } =
    useChildContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openChildMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    refreshChildren();
    setAnchorEl(event.currentTarget);
  };

  const closeChildMenu = () => {
    setAnchorEl(null);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <HomeIcon />,
      to: "/",
    },
    {
      label: "AI Chat",
      icon: <ChatIcon />,
      to: "/ask",
    },
    {
      label: "Storybook",
      icon: <AutoStoriesIcon />,
      to: "/stories",
    },
    {
      label: "Story Library",
      icon: <FavoriteIcon />,
      to: "/favorite-stories",
    },
    {
      label: "Activities",
      icon: <PaletteIcon />,
      to: "/activities",
    },
    {
      label: "Meal Planner",
      icon: <RestaurantIcon />,
      to: "/meal-planner",
    },
    {
      label: "Child Profiles",
      icon: <ChildCareIcon />,
      to: "/child-profile",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #E5E7EB",
          bgcolor: "#FFFFFF",
          p: 2,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={900}>
          🧸 ParentPal
        </Typography>

        <Typography color="text.secondary" fontSize={14}>
          AI Parenting Companion
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
          border: "1px solid #E5E7EB",
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <ChildCareIcon />
          </Avatar>

          <Box flex={1}>
            <Typography fontWeight={800}>
              {activeChild?.name || "No Child"}
            </Typography>

            <Typography color="text.secondary" fontSize={13}>
              {activeChild?.birthDate
                ? `${calculateAge(activeChild.birthDate)} years old`
                : "Select active child"}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={openChildMenu}
          sx={{ mt: 2, borderRadius: 3 }}
        >
          Switch Child
        </Button>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeChildMenu}>
        {children.map((child) => (
          <MenuItem
            key={child.id}
            onClick={() => {
              changeChild(child.id);
              closeChildMenu();
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
              <ChildCareIcon />
            </Avatar>

            <Box>
              <Typography fontWeight={700}>{child.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {calculateAge(child.birthDate)} years old
              </Typography>
            </Box>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem component={Link} to="/child-profile" onClick={closeChildMenu}>
          <AddIcon sx={{ mr: 2 }} />
          Add / Edit Child
        </MenuItem>
      </Menu>

      <Divider />

      <SidebarSection title="Main" />

      <List disablePadding>
        {navItems.map((item) => {
          const active = isActive(item.to);

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.to}
              selected={active}
              sx={{
                borderRadius: 3,
                mx: 0.5,
                my: 0.5,
                transition: "0.25s",
                color: active ? "white" : "text.primary",
                bgcolor: active ? "#6366F1 !important" : "transparent",
                "&:hover": {
                  bgcolor: active ? "#6366F1" : "#EEF2FF",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "white" : "primary.main",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 800 : 600,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <SidebarSection title="Settings" />

      <List disablePadding>
        <ListItemButton
          sx={{
            borderRadius: 3,
            mx: 0.5,
            my: 0.5,
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>

          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
      </List>

      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 4,
          bgcolor: "#F8FAFC",
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography fontWeight={800}>Siddartha</Typography>
        <Typography color="text.secondary" fontSize={13}>
          ParentPal Builder
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;