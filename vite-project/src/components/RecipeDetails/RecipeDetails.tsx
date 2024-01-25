import { Typography, Paper } from '@mui/material';

type Props = {
title: string;
description: string;
};

const RecipeDetails = ({ title, description }: Props) => (
<Paper elevation={1} style={{ padding: '20px', marginBottom: '20px' }}>
<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
{title}
</Typography>
<Typography variant="body1" component="p" sx={{ fontSize: '1rem' }}>
{description}
</Typography>
</Paper>
);

export default RecipeDetails;