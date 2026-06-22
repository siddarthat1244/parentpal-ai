import { Card, CardContent, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: number | string;
  icon: ReactNode;
}

function StatCard({ label, value, icon }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: "0 10px 30px rgba(99,102,241,.08)",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography fontSize={34}>{icon}</Typography>

          <div>
            <Typography variant="h5" fontWeight={800}>
              {value}
            </Typography>

            <Typography color="text.secondary">{label}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatCard;