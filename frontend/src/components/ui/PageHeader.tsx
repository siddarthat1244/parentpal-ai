import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

function PageHeader({ title, subtitle }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          mb: 1,
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;