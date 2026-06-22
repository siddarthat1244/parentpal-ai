import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const interestOptions = [
  "Unicorns",
  "Dinosaurs",
  "Space",
  "Animals",
  "Cars",
  "Princesses",
  "Drawing",
  "Music",
  "Books",
];

function ChildProfilePage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [readingLevel, setReadingLevel] = useState("");
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    const profile = {
      name,
      birthDate,
      gender,
      readingLevel,
      allergies,
      notes,
      interests,
    };

    localStorage.setItem("parentpal_child_profile", JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Child Profile
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Save your child’s details so ParentPal can personalize answers.
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Child profile saved successfully.
        </Alert>
      )}

      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <TextField
              label="Child Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Birth Date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
            </TextField>

            <TextField
              select
              label="Reading Level"
              value={readingLevel}
              onChange={(e) => setReadingLevel(e.target.value)}
              fullWidth
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>

            <Box>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Interests
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {interestOptions.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    clickable
                    color={interests.includes(interest) ? "primary" : "default"}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </Stack>
            </Box>

            <TextField
              label="Allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Example: Peanuts, milk, eggs"
              fullWidth
            />

            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything ParentPal should know"
              multiline
              minRows={3}
              fullWidth
            />

            <Button variant="contained" size="large" onClick={handleSave}>
              Save Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChildProfilePage;