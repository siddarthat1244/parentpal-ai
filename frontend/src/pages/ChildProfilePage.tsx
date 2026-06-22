import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { ChildProfile } from "../types/parent";

const PROFILES_KEY = "parentpal_child_profiles";
const ACTIVE_CHILD_KEY = "parentpal_active_child_id";

const emptyProfile = (): ChildProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthDate: "",
  gender: "",
  readingLevel: "",
  allergies: "",
  notes: "",
  interests: [],
});

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
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [profile, setProfile] = useState<ChildProfile>(emptyProfile());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfiles = localStorage.getItem(PROFILES_KEY);
    const parsedProfiles = savedProfiles ? JSON.parse(savedProfiles) : [];

    setProfiles(parsedProfiles);

    const activeId = localStorage.getItem(ACTIVE_CHILD_KEY);
    const firstProfile = parsedProfiles[0];

    if (activeId) {
      const activeProfile = parsedProfiles.find(
        (item: ChildProfile) => item.id === activeId
      );

      if (activeProfile) {
        setSelectedId(activeProfile.id);
        setProfile(activeProfile);
        return;
      }
    }

    if (firstProfile) {
      setSelectedId(firstProfile.id);
      setProfile(firstProfile);
    }
  }, []);

  const updateField = (field: keyof ChildProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
    setSaved(false);
  };

  const handleNewProfile = () => {
    const newProfile = emptyProfile();
    setProfile(newProfile);
    setSelectedId(newProfile.id);
    setSaved(false);
  };

  const handleSelectProfile = (child: ChildProfile) => {
    setProfile(child);
    setSelectedId(child.id);
    localStorage.setItem(ACTIVE_CHILD_KEY, child.id);
    setSaved(false);
  };

  const handleSave = () => {
    if (!profile.name.trim()) {
      return;
    }

    const updatedProfiles = profiles.some((item) => item.id === profile.id)
      ? profiles.map((item) => (item.id === profile.id ? profile : item))
      : [profile, ...profiles];

    setProfiles(updatedProfiles);
    setSelectedId(profile.id);

    localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
    localStorage.setItem(ACTIVE_CHILD_KEY, profile.id);

    setSaved(true);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Child Profiles
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add multiple children and select which profile ParentPal should use.
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile saved successfully.
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ width: 280, borderRadius: 4 }}>
          <CardContent>
            <Button variant="contained" fullWidth onClick={handleNewProfile}>
              Add New Child
            </Button>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Saved Children
            </Typography>

            <List>
              {profiles.map((child) => (
                <ListItemButton
                  key={child.id}
                  selected={child.id === selectedId}
                  onClick={() => handleSelectProfile(child)}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemText
                    primary={child.name || "Unnamed Child"}
                    secondary={child.readingLevel || "No reading level"}
                  />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Child Name"
                value={profile.name}
                onChange={(e) => updateField("name", e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Birth Date"
                type="date"
                value={profile.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />

              <TextField
                select
                label="Gender"
                value={profile.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                fullWidth
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </TextField>

              <TextField
                select
                label="Reading Level"
                value={profile.readingLevel}
                onChange={(e) => updateField("readingLevel", e.target.value)}
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
                      color={
                        profile.interests.includes(interest)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => toggleInterest(interest)}
                    />
                  ))}
                </Stack>
              </Box>

              <TextField
                label="Allergies"
                value={profile.allergies}
                onChange={(e) => updateField("allergies", e.target.value)}
                placeholder="Example: Peanuts, milk, eggs"
                fullWidth
              />

              <TextField
                label="Notes"
                value={profile.notes}
                onChange={(e) => updateField("notes", e.target.value)}
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
    </Box>
  );
}

export default ChildProfilePage;