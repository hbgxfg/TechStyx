import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Chip,
  LinearProgress,
  Switch,
  FormControlLabel,
  Stack,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Warning as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Person as UserIcon,
  Business as BuildingIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Visibility as EyeIcon,
  Mail as MailIcon,
  Edit as EditIcon,
  MoreHoriz as MoreHorizontalIcon,
  CalendarToday as CalendarIcon,
  Add as PlusIcon,
  BarChart as BarChart3Icon,
  KeyboardArrowDown as ChevronDownIcon,
  Schedule as ClockIcon,
  LocationOn as MapPinIcon,
  PersonAdd as UserPlusIcon,
  FilterList as FilterIcon,
  Notifications as BellIcon,
  Security as ShieldIcon,
  Storage as DatabaseIcon,
  Language as GlobeIcon,
  PhoneAndroid as SmartphoneIcon,
  Save as SaveIcon,
  Refresh as RefreshCwIcon,
  GetApp as DownloadIcon,
  Upload as UploadIcon,
  Delete as Trash2Icon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  ToggleOn as ToggleIcon
} from '@mui/icons-material';

const MenstruCareDashboard = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Sample data
  const liveIssues = [
    {
      id: 1,
      type: 'Supply',
      priority: 'HIGH',
      title: 'Dispenser empty',
      location: 'Science Building - 2nd Floor',
      time: '5 min ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'Maintenance',
      priority: 'MEDIUM',
      title: 'Disposal bin full',
      location: 'Library - Ground Floor',
      time: '12 min ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'Hygiene',
      priority: 'HIGH',
      title: 'Poor cleanliness',
      location: 'Cafeteria - Women\'s Restroom',
      time: '18 min ago',
      status: 'active'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@university.edu',
      role: 'Student',
      campus: 'Main Campus',
      status: 'Active',
      reports: 12,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Dr. Emily Chen',
      email: 'e.chen@university.edu',
      role: 'Admin',
      campus: 'Main Campus',
      status: 'Active',
      reports: 0,
      lastActive: '30 min ago'
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      email: 'alex.r@university.edu',
      role: 'Facility Manager',
      campus: 'North Campus',
      status: 'Active',
      reports: 3,
      lastActive: '1 day ago'
    },
    {
      id: 4,
      name: 'Maria Santos',
      email: 'm.santos@university.edu',
      role: 'Student',
      campus: 'South Campus',
      status: 'Inactive',
      reports: 7,
      lastActive: '1 week ago'
    }
  ];

  const facilities = [
    {
      id: 1,
      name: 'Library Restroom - Ground Floor',
      location: 'Main Library - Ground Floor, East Wing',
      status: 'Operational',
      stockLevel: 85,
      cleanliness: 92,
      issues: 'No Issues',
      nextMaintenance: '2024-01-20'
    },
    {
      id: 2,
      name: 'Student Center Restroom',
      location: 'Student Center - Level 2, Near Cafeteria',
      status: 'Needs Attention',
      stockLevel: 45,
      cleanliness: 78,
      issues: '3 Open',
      nextMaintenance: '2024-01-18'
    },
    {
      id: 3,
      name: 'Engineering Building Restroom',
      location: 'Engineering Complex - Building A, 3rd Floor',
      status: 'Under Maintenance',
      stockLevel: 20,
      cleanliness: 60,
      issues: '1 Open',
      nextMaintenance: '2024-01-25'
    },
    {
      id: 4,
      name: 'Dormitory Common Restroom',
      location: 'Residence Hall B - 2nd Floor, West Wing',
      status: 'Operational',
      stockLevel: 95,
      cleanliness: 96,
      issues: 'No Issues',
      nextMaintenance: '2024-01-22'
    }
  ];

  const recentAudits = [
    {
      id: 1,
      building: 'Science Building',
      auditor: 'Sarah Johnson',
      date: '1/15/2024',
      score: 78,
      status: 'completed',
      issues: 'Dispenser empty, Poor lighting'
    },
    {
      id: 2,
      building: 'Library',
      auditor: 'Mike Chen',
      date: '1/14/2024',
      score: 92,
      status: 'completed',
      issues: 'Minor cleanliness issues'
    },
    {
      id: 3,
      building: 'Cafeteria',
      auditor: 'Lisa Brown',
      date: '1/12/2024',
      score: 65,
      status: 'action required',
      issues: 'Multiple dispensers broken, Disposal bin overflow'
    }
  ];

  const maintenanceSchedule = [
    {
      id: 1,
      task: 'Dispenser Restocking',
      location: 'Science Building',
      date: 'Today, 2:00 PM',
      assignedTo: 'Maintenance Team A',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      task: 'Deep Cleaning',
      location: 'Library Restrooms',
      date: 'Tomorrow, 9:00 AM',
      assignedTo: 'Cleaning Team B',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: 3,
      task: 'Equipment Repair',
      location: 'Cafeteria',
      date: 'Jan 18, 11:00 AM',
      assignedTo: 'Technical Team',
      priority: 'critical',
      status: 'overdue'
    }
  ];

  const renderReportsManagement = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '100%' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={5}>
          <Card sx={{ bgcolor: 'error.50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">Active Issues</Typography>
                  <Typography variant="h4" fontWeight="bold">23</Typography>
                  <Typography color="error.main" variant="body2">-12% from yesterday</Typography>
                </Box>
                <Box sx={{ bgcolor: 'error.100', p: 1.5, borderRadius: '50%' }}>
                  <AlertTriangleIcon color="error" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <Card sx={{ bgcolor: 'success.50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">Resolved Today</Typography>
                  <Typography variant="h4" fontWeight="bold">15</Typography>
                  <Typography color="success.main" variant="body2">+8% from yesterday</Typography>
                </Box>
                <Box sx={{ bgcolor: 'success.100', p: 1.5, borderRadius: '50%' }}>
                  <CheckCircleIcon color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AlertTriangleIcon color="warning" />
            <Typography variant="h6">Live Issue Reports</Typography>
          </Stack>
        </Box>
        <Box>
          {liveIssues.map((issue) => (
            <Box
              key={issue.id}
              sx={{
                p: 3,
                borderBottom: 1,
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      label={issue.priority}
                      size="small"
                      color={
                        issue.priority === 'HIGH' ? 'error' :
                        issue.priority === 'MEDIUM' ? 'warning' : 'success'
                      }
                    />
                    <Typography variant="body2" color="text.secondary">{issue.type}</Typography>
                  </Stack>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>{issue.title}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <MapPinIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{issue.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <ClockIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{issue.time}</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <IconButton>
                  <EyeIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BarChart3Icon color="primary" />
                  <Typography variant="h6">Recent Audits</Typography>
                </Stack>
                <Button color="primary">View All</Button>
              </Box>
            </Box>
            <Box>
              {recentAudits.map((audit) => (
                <Box key={audit.id} sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">{audit.building}</Typography>
                    <Chip
                      label={audit.status}
                      size="small"
                      color={audit.status === 'completed' ? 'success' : 'error'}
                    />
                  </Box>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <UserIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{audit.auditor}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{audit.date}</Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Issues found: {audit.issues}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h4">{audit.score}</Typography>
                    <Button
                      endIcon={<ChevronDownIcon />}
                      color="primary"
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarIcon color="success" />
                  <Typography variant="h6">Maintenance Schedule</Typography>
                </Stack>
                <Button color="primary">Add Task</Button>
              </Box>
            </Box>
            <Box>
              {maintenanceSchedule.map((task) => (
                <Box key={task.id} sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">{task.task}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={task.priority}
                        size="small"
                        color={
                          task.priority === 'high' ? 'error' :
                          task.priority === 'medium' ? 'warning' : 'error'
                        }
                      />
                      <Chip
                        label={task.status}
                        size="small"
                        color={
                          task.status === 'pending' ? 'warning' :
                          task.status === 'scheduled' ? 'primary' : 'error'
                        }
                      />
                    </Stack>
                  </Box>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <BuildingIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{task.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ClockIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{task.date}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <UserIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Assigned to: {task.assignedTo}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button variant="outlined" color="primary">Reschedule</Button>
                    <Button variant="contained">Mark Complete</Button>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderUserManagement = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">User Management</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage student and staff accounts
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<UserPlusIcon />}
            >
              Add User
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
            />
            <Select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="facility">Facility Manager</MenuItem>
            </Select>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Campus</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reports</TableCell>
                  <TableCell>Last Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={
                          user.role === 'Admin' ? 'primary' :
                          user.role === 'Facility Manager' ? 'secondary' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.campus}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'Active' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.reports}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.lastActive}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <MailIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreHorizontalIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );

  const renderFacilityStatus = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">Facility Status Overview</Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor all menstrual hygiene facilities across campus
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<BuildingIcon />}
            >
              Add Facility
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by name or building..."
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
            />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="operational">Operational</MenuItem>
              <MenuItem value="attention">Needs Attention</MenuItem>
              <MenuItem value="maintenance">Under Maintenance</MenuItem>
            </Select>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Facility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Stock Level</TableCell>
                  <TableCell>Cleanliness</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Next Maintenance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facilities.map((facility) => (
                  <TableRow key={facility.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{facility.name}</Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <MapPinIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {facility.location}
                          </Typography>
                        </Stack>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={facility.status}
                        size="small"
                        color={
                          facility.status === 'Operational' ? 'success' :
                          facility.status === 'Needs Attention' ? 'warning' : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={facility.stockLevel}
                            color={
                              facility.stockLevel > 70 ? 'success' :
                              facility.stockLevel > 40 ? 'warning' : 'error'
                            }
                          />
                        </Box>
                        <Typography variant="body2">{facility.stockLevel}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={facility.cleanliness}
                            color={
                              facility.cleanliness > 85 ? 'success' :
                              facility.cleanliness > 70 ? 'warning' : 'error'
                            }
                          />
                        </Box>
                        <Typography variant="body2">{facility.cleanliness}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={facility.issues}
                        size="small"
                        color={facility.issues === 'No Issues' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2">{facility.nextMaintenance}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small">View Details</Button>
                        <Button variant="outlined" size="small">Schedule</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
      <Container maxWidth="xl">
        <Paper sx={{ mb: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row" spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
              <Button
                variant={activeTab === 'reports' ? 'contained' : 'text'}
                onClick={() => setActiveTab('reports')}
                startIcon={<AlertTriangleIcon />}
              >
                Reports
              </Button>
              <Button
                variant={activeTab === 'users' ? 'contained' : 'text'}
                onClick={() => setActiveTab('users')}
                startIcon={<UserIcon />}
              >
                Users
              </Button>
              <Button
                variant={activeTab === 'facilities' ? 'contained' : 'text'}
                onClick={() => setActiveTab('facilities')}
                startIcon={<BuildingIcon />}
              >
                Facilities
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'contained' : 'text'}
                onClick={() => setActiveTab('settings')}
                startIcon={<SettingsIcon />}
              >
                Settings
              </Button>
            </Stack>
          </Box>
        </Paper>
  
        {activeTab === 'reports' && renderReportsManagement()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'facilities' && renderFacilityStatus()}
        {activeTab === 'settings' && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>System Settings</Typography>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Notifications</Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationsEnabled}
                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      />
                    }
                    label="Enable Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    }
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                      />
                    }
                    label="Push Notifications"
                  />
                </Stack>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>System</Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoBackup}
                        onChange={(e) => setAutoBackup(e.target.checked)}
                      />
                    }
                    label="Automatic Backup"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );  
};

export default MenstruCareDashboard;
// // pages/AdminDashboard.jsx
// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h1>Welcome to the Admin Dashboard!</h1>
//     </div>
//   );
// };

// export default AdminDashboard;

