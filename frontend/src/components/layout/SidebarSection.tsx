import { Typography } from "@mui/material";

interface Props {
  title: string;
}

function SidebarSection({ title }: Props) {
  return (
    <Typography
      sx={{
        mt: 3,
        mb: 1,
        px: 2,
        fontSize: 12,
        fontWeight: 800,
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {title}
    </Typography>
  );
}

export default SidebarSection;