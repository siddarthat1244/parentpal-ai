import { Outlet } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import ChildSwitcher from "./ChildSwitcher";

function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
              ParentPal AI
            </Typography>

            <ChildSwitcher />
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;