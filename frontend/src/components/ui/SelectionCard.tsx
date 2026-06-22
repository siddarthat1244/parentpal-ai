import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  emoji: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}

function SelectionCard({
  emoji,
  title,
  subtitle,
  selected,
  onClick,
}: Props) {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 5,
        transition: ".25s",
        cursor: "pointer",

        border: selected
          ? "2px solid #6366F1"
          : "2px solid transparent",

        background: selected
          ? "linear-gradient(135deg,#EEF2FF,#F5F3FF)"
          : "#FFF",

        boxShadow: selected
          ? "0 15px 40px rgba(99,102,241,.18)"
          : "0 8px 24px rgba(0,0,0,.05)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 20px 50px rgba(99,102,241,.18)",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent
          sx={{
            p: 3,
            textAlign: "center",
          }}
        >
          {selected && (
            <CheckCircleIcon
              color="primary"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
              }}
            />
          )}

          <Typography
            sx={{
              fontSize: 46,
              mb: 1,
            }}
          >
            {emoji}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={800}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SelectionCard;