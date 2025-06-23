import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const StatsPage = () => {
  const sampleStats = [
    {
      shortUrl: 'http://localhost:3000/abc123',
      createdAt: '2025-06-23T12:00:00Z',
      expiresAt: '2025-06-23T12:30:00Z',
      totalClicks: 3,
      clicks: [
        { time: '2025-06-23T12:05:00Z', source: 'Chrome', location: 'India' },
        { time: '2025-06-23T12:10:00Z', source: 'Firefox', location: 'USA' },
        { time: '2025-06-23T12:20:00Z', source: 'Edge', location: 'Nepal' },
      ]
    }
  ];

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>

      {sampleStats.map((stat, index) => (
        <Paper key={index} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
          <Typography><b>Short URL:</b> {stat.shortUrl}</Typography>
          <Typography>Created At: {stat.createdAt}</Typography>
          <Typography>Expires At: {stat.expiresAt}</Typography>
          <Typography>Total Clicks: {stat.totalClicks}</Typography>
          <Box mt={2}>
            {stat.clicks.map((click, i) => (
              <Box key={i} ml={2} mt={1}>
                <Typography>- {click.time} | {click.source} | {click.location}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StatsPage;
