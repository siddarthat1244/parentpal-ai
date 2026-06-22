import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
}

function QuickActionCard({ title, description, icon, to }: Props) {
  return (
    <Card
      component={Link}
      to={to}
      sx={{
        height: "100%",
        textDecoration: "none",
        borderRadius: 5,
        transition: "0.25s",
        boxShadow: "0 10px 30px rgba(99,102,241,.08)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 45px rgba(99,102,241,.18)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography fontSize={42}>{icon}</Typography>

          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>

          <Typography color="text.secondary">{description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default QuickActionCard;