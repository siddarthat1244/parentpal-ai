import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CakeIcon from "@mui/icons-material/Cake";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { ChildProfile } from "../../types/parent";
import { calculateAge } from "../../utils/calculateAge";

interface Props {
  childProfile: ChildProfile | null;
}

function ChildChatHeader({ childProfile }: Props) {
  if (!childProfile) {
    return (
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          No Child Profile
        </Typography>

        <Typography color="text.secondary">
          Create a child profile to receive personalized AI responses.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
        border: "1px solid #E5E7EB",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "primary.main",
            fontSize: 28,
          }}
        >
          <ChildCareIcon fontSize="large" />
        </Avatar>

        <Box flex={1}>
          <Typography variant="h5" fontWeight={800}>
            {childProfile.name || "Child"}
          </Typography>

          <Typography color="text.secondary">
            Personalized parenting support
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
        <Chip
          icon={<CakeIcon />}
          label={`${calculateAge(childProfile.birthDate)} years`}
          color="primary"
        />

        <Chip
          icon={<MenuBookIcon />}
          label={childProfile.readingLevel || "Reading not set"}
          variant="outlined"
        />

        {childProfile.allergies && (
          <Chip
            icon={<WarningAmberIcon />}
            label={`Allergies: ${childProfile.allergies}`}
            color="warning"
            variant="outlined"
          />
        )}

        {childProfile.interests?.map((interest) => (
          <Chip key={interest} label={interest} variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}

export default ChildChatHeader;