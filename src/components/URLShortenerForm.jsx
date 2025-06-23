import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const URLShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
  const dummyResult = urls.map((item, idx) => {
    const shortcode = item.shortcode || `url${Date.now()}${idx}`;
    const longUrl = item.longUrl;

    // Save to localStorage so it can be used during redirection
    localStorage.setItem(`short_${shortcode}`, longUrl);

    return {
      longUrl,
      shortUrl: `http://localhost:3000/${shortcode}`,
      expiry: item.validity ? `${item.validity} min` : '30 min (default)'
    };
  });

  setResults(dummyResult);
};



  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {urls.map((url, idx) => (
        <Paper key={idx} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="subtitle1">URL #{idx + 1}</Typography>
          <TextField
            label="Long URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={url.longUrl}
            onChange={e => handleChange(idx, 'longUrl', e.target.value)}
          />
          <TextField
            label="Validity (in minutes)"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            value={url.validity}
            onChange={e => handleChange(idx, 'validity', e.target.value)}
          />
          <TextField
            label="Preferred Shortcode (optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={url.shortcode}
            onChange={e => handleChange(idx, 'shortcode', e.target.value)}
          />
        </Paper>
      ))}

      <Button variant="outlined" onClick={addField} disabled={urls.length >= 5} style={{ marginRight: 10 }}>
        Add Another URL
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <Box marginTop={4}>
          <Typography variant="h6">Shortened URLs:</Typography>
          {results.map((res, i) => (
            <Box key={i} marginY={1}>
              <Typography><b>Original:</b> {res.longUrl}</Typography>
              <Typography><b>Shortened:</b> <a href={res.shortUrl}>{res.shortUrl}</a></Typography>
              <Typography><b>Expires in:</b> {res.expiry}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default URLShortenerForm;
