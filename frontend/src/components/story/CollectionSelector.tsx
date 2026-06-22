import { Grid, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";
import { STORY_COLLECTIONS } from "../../data/storyCollections";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function CollectionSelector({ value, onChange }: Props) {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose Story Collection
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {STORY_COLLECTIONS.map((collection) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={collection.id}>
            <SelectionCard
              emoji={collection.emoji}
              title={collection.title}
              subtitle={`${collection.stories.length} stories`}
              selected={value === collection.id}
              onClick={() => onChange(collection.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CollectionSelector;