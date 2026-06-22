import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

function ChatInput({ value, loading, onChange, onSend }: Props) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your parenting question..."
        fullWidth
        multiline
        maxRows={4}
      />

      <Button
        variant="contained"
        size="large"
        endIcon={<SendIcon />}
        onClick={onSend}
        disabled={loading || !value.trim()}
        sx={{ minWidth: 140 }}
      >
        Send
      </Button>
    </Stack>
  );
}

export default ChatInput;