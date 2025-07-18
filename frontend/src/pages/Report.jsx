import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ReportForm = () => {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [details, setDetails] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Facility locations from the system
  const locations = [
    "Library Restroom - Ground Floor",
    "Student Center Restroom",
    "Engineering Building Restroom",
    "Dormitory Common Restroom",
  ];

  // Read ?location= from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefilledLocation = params.get("location");
    if (prefilledLocation) {
      setLocation(prefilledLocation);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseMessage("");

    if (!issueType || !location || !priority) {
      setError("Please select issue type, location, and priority.");
      return;
    }

    setIsLoading(true);
    const reportData = {
      issueType,
      location,
      priority,
      details,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Report submitted successfully!");
        // Reset form
        setIssueType("");
        setLocation("");
        setPriority("");
        setDetails("");
      } else {
        setError(data.message || "Failed to submit report.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const issueTypes = [
    "Empty Dispenser",
    "Poor Cleanliness",
    "Full Disposal Bin",
    "Privacy Issues",
    "Missing Supplies",
    "Maintenance Required",
  ];

  const priorityLevels = [
    { value: "Low Priority", color: "success" },
    { value: "Medium Priority", color: "info" },
    { value: "High Priority", color: "warning" },
    { value: "Urgent", color: "error" },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Anonymous Issue Reporting
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Report menstrual hygiene issues safely and anonymously.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Issue Type
            </Typography>
            <ToggleButtonGroup
              value={issueType}
              exclusive
              onChange={(e, value) => setIssueType(value)}
              fullWidth
            >
              {issueTypes.map((type) => (
                <StyledToggleButton key={type} value={type}>
                  {type}
                </StyledToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <TextField
              select
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="">Select a location</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Priority Level
            </Typography>
            <ToggleButtonGroup
              value={priority}
              exclusive
              onChange={(e, value) => setPriority(value)}
              fullWidth
            >
              {priorityLevels.map((level) => (
                <StyledToggleButton
                  key={level.value}
                  value={level.value}
                  color={level.color}
                >
                  {level.value}
                </StyledToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Details (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Describe the issue..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              variant="outlined"
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {responseMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {responseMessage}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Submit Anonymous Report"
            )}
          </Button>
        </form>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4, textAlign: "center" }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" color="success.main">
              247
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Issues Resolved
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" color="warning.main">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" color="primary.main">
              89%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Satisfaction
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportForm;
