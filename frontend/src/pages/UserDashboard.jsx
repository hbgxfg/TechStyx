import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Favorite as HeartIcon,
  LocationOn as MapPinIcon,
  Shield as ShieldIcon,
  Notifications as BellIcon,
  Person as UserIcon,
  Add as PlusIcon,
  AccessTime as ClockIcon,
  Reply as ReplyIcon,
  Chat as MessageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Keep your existing data arrays here
// const recentReports = [
//   { title: 'Hygiene Issue', location: 'Building A - Floor 2', severity: 'high', date: '2024-01-15' },
//   { title: 'Supply Shortage', location: 'Building B - Floor 1', severity: 'medium', date: '2024-01-14' },
//   { title: 'Facility Damage', location: 'Building C - Floor 3', severity: 'low', date: '2024-01-13' },
//   { title: 'Privacy Concern', location: 'Building A - Floor 1', severity: 'high', date: '2024-01-15' }
// ];

const adminUpdates = [
  {
    title: "Resolved hygiene issue",
    location: "Science Building - Floor 2",
    time: "2:30 PM",
    date: "2024-01-15",
  },
  {
    title: "Added new supplies",
    location: "Library - Ground Floor",
    time: "11:15 AM",
    date: "2024-01-14",
  },
  {
    title: "Updated facility status",
    location: "Engineering Block - Floor 3",
    time: "4:45 PM",
    date: "2024-01-13",
  },
  {
    title: "Maintenance completed",
    location: "Main Building - Floor 1",
    time: "9:20 AM",
    date: "2024-01-12",
  },
];

// const myReports = [
//   { title: 'Supply Shortage', location: 'Computer Lab - Floor 2', severity: 'medium', date: '2024-01-10', adminResponse: 'Supplies restocked' },
//   { title: 'Hygiene Issue', location: 'Cafeteria - Ground Floor', severity: 'high', date: '2024-01-12', adminResponse: 'Maintenance team assigned' },
//   { title: 'Privacy Concern', location: 'Student Center - Floor 1', severity: 'medium', date: '2024-01-14', status: 'Waiting for admin response...' },
//   { title: 'Facility Damage', location: 'Sports Complex - Locker Room', severity: 'low', date: '2024-01-08', adminResponse: 'Repairs completed successfully' },
//   { title: 'Safety Hazard', location: 'Chemistry Lab - Floor 3', severity: 'high', date: '2024-01-16', status: 'Waiting for admin response...' },
//   { title: 'Supply Shortage', location: 'Medical Room - Ground Floor', severity: 'medium', date: '2024-01-11', adminResponse: 'Order placed, supplies arriving soon' }
// ];

const discussions = [
  {
    id: 1,
    title: "Hygiene supplies shortage in Building A",
    content:
      "Has anyone else noticed the lack of soap dispensers on the second floor? This has been an ongoing issue for weeks.",
    category: "hygiene",
    author: "Anonymous User #1",
    timeAgo: "2 hours ago",
    likes: 8,
    replies: 12,
  },
  {
    id: 2,
    title: "Thank you to the maintenance team!",
    content: "Great work on fixing the facilities quickly!",
    category: "appreciation",
    author: "Anonymous User #2",
    timeAgo: "4 hours ago",
    likes: 15,
    replies: 3,
    resolved: true,
  },
];

const categories = [
  { name: "All Posts", count: 6 },
  { name: "Hygiene", count: 1 },
  { name: "Privacy", count: 1 },
  { name: "Urgent", count: 1 },
  { name: "Suggestions", count: 1 },
  { name: "Appreciation", count: 1 },
  { name: "Feedback", count: 1 },
];

const availableTags = [
  "hygiene",
  "privacy",
  "urgent",
  "suggestions",
  "appreciation",
  "feedback",
];

function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussionForm, setDiscussionForm] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const [recentReports, setRecentReports] = useState([]);
  const [myReports, setMyReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch recent reports (no auth needed)
        const recentRes = await axios.get("http://localhost:5000/api/reports");
        setRecentReports(recentRes.data);

        // Fetch my reports (requires token)
        const myRes = await axios.get("http://localhost:5000/api/my-reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyReports(myRes.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      hygiene: "primary",
      privacy: "secondary",
      urgent: "error",
      suggestions: "info",
      appreciation: "success",
      feedback: "warning",
    };
    return colors[category] || "default";
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTagToggle = (event, newTags) => {
    setDiscussionForm((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const handleSubmitDiscussion = () => {
    console.log("New discussion:", discussionForm);
    setDiscussionForm({ title: "", description: "", tags: [] });
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HeartIcon color="primary" />
            <Typography variant="h6" color="primary" fontWeight="bold">
              MenstruCare
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              startIcon={<HeartIcon />}
              color="inherit"
              onClick={() => navigate("/report")}
            >
              Report Issue
            </Button>
            <Button startIcon={<ShieldIcon />} color="inherit">
              Dashboard
            </Button>
            <Button startIcon={<BellIcon />} color="inherit">
              Audit
            </Button>
            <Button color="inherit">Login</Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 28 }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Typography variant="h4" gutterBottom fontWeight="bold">
          User Dashboard
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Overview of facility status and recent reports
        </Typography>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab label="Dashboard" />
          <Tab label="Discussion Forum" />
        </Tabs>

        {/* Dashboard Content */}
        {activeTab === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Grid container spacing={4}>
              {/* Recent Reports */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <BellIcon />
                      <Typography variant="h6">Recent Reports</Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Latest facility reports from all users
                    </Typography>
                    {recentReports.map((report, index) => (
                      <Box
                        key={index}
                        sx={{ py: 2, borderBottom: 1, borderColor: "divider" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Chip
                            size="small"
                            color={getSeverityColor(report.priority)}
                            label={report.priority}
                          />
                          <Typography variant="subtitle1">
                            {report.issueType}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MapPinIcon fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {report.location}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {report.details || "No additional details"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          gutterBottom
                        >
                          {report.timestamp &&
                            new Date(
                              report.timestamp.$date || report.timestamp
                            ).toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <BellIcon />
                      <Typography variant="h6">Recent Reports</Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Latest facility reports from all users
                    </Typography>
                    {recentReports.map((report, index) => (
                      <Box
                        key={index}
                        sx={{ py: 2, borderBottom: 1, borderColor: "divider" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Chip
                            size="small"
                            color={getSeverityColor(report.severity)}
                            label={report.severity}
                          />
                          <Typography variant="subtitle1">
                            {report.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MapPinIcon fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {report.location}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid> */}

              {/* Admin Updates */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <ShieldIcon />
                      <Typography variant="h6">Admin Updates</Typography>
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Latest actions taken by administrators
                    </Typography>
                    {adminUpdates.map((update, index) => (
                      <Box
                        key={index}
                        sx={{ py: 2, borderBottom: 1, borderColor: "divider" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "primary.light",
                              width: 32,
                              height: 32,
                            }}
                          >
                            A
                          </Avatar>
                          <Typography variant="subtitle1">
                            {update.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MapPinIcon fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {update.location}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* My Reports */}
            {/* My Reports */}
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <UserIcon />
                      My Reports
                    </Typography>
                    <Typography color="text.secondary">
                      Issues and reports you have submitted
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlusIcon />}
                    onClick={() => navigate("/report")}
                    sx={{ borderRadius: 28 }}
                  >
                    Report Issue
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {myReports.map((report, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography variant="subtitle1">
                              {report.issueType}
                            </Typography>
                            <Chip
                              size="small"
                              color={getSeverityColor(report.priority)}
                              label={report.priority}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <MapPinIcon fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {report.location}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {report.details || "No details provided"}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {new Date(report.timestamp).toLocaleString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={
                              report.adminResponse ? "primary" : "warning.main"
                            }
                            fontWeight="medium"
                          >
                            {report.adminResponse ||
                              report.status ||
                              "Pending review"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <UserIcon />
                      My Reports
                    </Typography>
                    <Typography color="text.secondary">
                      Issues and reports you have submitted
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlusIcon />}
                    onClick={() => navigate("/report")}
                    sx={{ borderRadius: 28 }}
                  >
                    Report Issue
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {myReports.map((report, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography variant="subtitle1">
                              {report.title}
                            </Typography>
                            <Chip
                              size="small"
                              color={getSeverityColor(report.severity)}
                              label={report.severity}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <MapPinIcon fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {report.location}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            gutterBottom
                          >
                            {report.date}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={
                              report.adminResponse ? "primary" : "warning.main"
                            }
                            fontWeight="medium"
                          >
                            {report.adminResponse || report.status}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card> */}
          </Box>
        )}

        {/* Discussion Forum Content */}
        {activeTab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Discussion Forum
                </Typography>
                <Typography color="text.secondary">
                  Anonymous community discussions about facility issues and
                  improvements
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusIcon />}
                onClick={() => setIsModalOpen(true)}
                sx={{ borderRadius: 28 }}
              >
                New Discussion
              </Button>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <ToggleButtonGroup
                value={activeCategory}
                exclusive
                onChange={(e, newCategory) =>
                  setActiveCategory(newCategory || "All Posts")
                }
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {categories.map((category) => (
                  <ToggleButton
                    key={category.name}
                    value={category.name}
                    sx={{
                      borderRadius: 28,
                      textTransform: "none",
                      "&.Mui-selected": {
                        color: "white",
                        bgcolor: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      },
                    }}
                  >
                    {category.name} ({category.count})
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.light" }}>A</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="medium">
                            {discussion.title}
                          </Typography>
                          <Chip
                            size="small"
                            color={getCategoryColor(discussion.category)}
                            label={discussion.category}
                          />
                          {discussion.resolved && (
                            <Chip
                              size="small"
                              color="success"
                              label="Resolved"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" paragraph>
                          {discussion.content}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <UserIcon fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {discussion.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              •
                            </Typography>
                            <ClockIcon fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {discussion.timeAgo}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <IconButton size="small">
                              <HeartIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary">
                              {discussion.likes}
                            </Typography>
                            <IconButton size="small">
                              <MessageIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary">
                              {discussion.replies}
                            </Typography>
                            <IconButton size="small">
                              <ReplyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>

      {/* New Discussion Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Start New Discussion
            <IconButton onClick={() => setIsModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Discussion Title"
              fullWidth
              value={discussionForm.title}
              onChange={(e) =>
                setDiscussionForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={discussionForm.description}
              onChange={(e) =>
                setDiscussionForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              <ToggleButtonGroup
                value={discussionForm.tags}
                onChange={handleTagToggle}
                multiple
              >
                {availableTags.map((tag) => (
                  <ToggleButton
                    key={tag}
                    value={tag}
                    sx={{
                      textTransform: "none",
                      "&.Mui-selected": {
                        color: "white",
                        bgcolor: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      },
                    }}
                  >
                    {tag}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitDiscussion}
            disabled={
              !discussionForm.title ||
              !discussionForm.description ||
              discussionForm.tags.length === 0
            }
          >
            Post Discussion
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserDashboard;
