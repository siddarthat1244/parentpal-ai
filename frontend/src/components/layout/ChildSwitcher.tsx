import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useChildContext } from "../../context/ChildContext";
import { calculateAge } from "../../utils/calculateAge";

function ChildSwitcher() {
  const { children, activeChild, changeChild, refreshChildren } =
    useChildContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    refreshChildren();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen} startIcon={<ChildCareIcon />}>
        {activeChild ? activeChild.name : "Select Child"}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {children.map((child) => (
          <MenuItem
            key={child.id}
            onClick={() => {
              changeChild(child.id);
              setAnchorEl(null);
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
              <ChildCareIcon />
            </Avatar>

            <Box>
              <Typography fontWeight={600}>{child.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {calculateAge(child.birthDate)} years old
              </Typography>
            </Box>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem component={Link} to="/child-profile" onClick={() => setAnchorEl(null)}>
          <AddIcon sx={{ mr: 2 }} />
          Add / Edit Child
        </MenuItem>
      </Menu>
    </>
  );
}

export default ChildSwitcher;