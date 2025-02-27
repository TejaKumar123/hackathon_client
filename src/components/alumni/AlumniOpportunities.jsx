import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Link
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Launch as LaunchIcon
} from '@mui/icons-material';


const AlumniOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    type: "Internship",
    company: "",
    location: "",
    description: "",
    requirements: "",
    stipend: "",
    applyLink: "",
    deadline: "",
    status: "Open"
  });
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  // Get user from Redux store
  const {user} = useSelector((state) => state.user);

  // Fetch opportunities
  const fetchOpportunities = async () => {
    try {
      const response = await axios.post("http://localhost:5000/opportunity/opportunityfind", {
        criteria: {},
        projection: {
          title: 1,
          type: 1,
          company: 1,
          location: 1,
          description: 1,
          requirements: 1,
          stipend: 1,
          applyLink: 1,
          deadline: 1,
          status: 1,
          createdBy: 1
        }
      });

      if (response.data.status === "ok") {
        setOpportunities(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching opportunities!");
      console.error("Error fetching opportunities:", error);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Add a new opportunity
  const addOpportunity = async () => {
    try {
      if (!newOpportunity.title || !newOpportunity.company) {
        toast.error("Title and company are required!");
        return;
      }

      const response = await axios.post("http://localhost:5000/opportunity/opportunityinsert", {
        ...newOpportunity,
        requirements: newOpportunity.requirements.split(",").map(r => r.trim()),
        createdBy: user._id
      });

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchOpportunities();
        setNewOpportunity({
          title: "",
          type: "Internship",
          company: "",
          location: "",
          description: "",
          requirements: "",
          stipend: "",
          applyLink: "",
          deadline: "",
          status: "Open"
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding opportunity!");
      console.error("Error adding opportunity:", error);
    }
  };

  // Update an opportunity
  const updateOpportunity = async () => {
    try {
      if (!editingOpportunity.title || !editingOpportunity.company) {
        toast.error("Title and company are required!");
        return;
      }

      const response = await axios.post("http://localhost:5000/opportunity/opportunityupdate", {
        criteria: { _id: editingOpportunity._id },
        updatedInfo: {
          $set: {
            ...editingOpportunity,
            requirements: typeof editingOpportunity.requirements === 'string' 
              ? editingOpportunity.requirements.split(",").map(r => r.trim())
              : editingOpportunity.requirements
          }
        }
      });

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchOpportunities();
        setEditingOpportunity(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating opportunity!");
      console.error("Error updating opportunity:", error);
    }
  };

  // Delete an opportunity
  const deleteOpportunity = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/opportunity/opportunitydelete", {
        criteria: { _id: id }
      });

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchOpportunities();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting opportunity!");
      console.error("Error deleting opportunity:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingOpportunity(prev => ({ ...prev, [name]: value }));
    } else {
      setNewOpportunity(prev => ({ ...prev, [name]: value }));
    }
  };

  const filteredOpportunities = selectedType === "All"
    ? opportunities
    : opportunities.filter(opportunity => opportunity.type === selectedType);

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Opportunities
      </Typography>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "Internship", "Job"].map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "contained" : "outlined"}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Form */}
      <Paper elevation={3} className="p-6 mb-6">
        <Typography variant="h6" gutterBottom>
          {editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={editingOpportunity ? editingOpportunity.title : newOpportunity.title}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={editingOpportunity ? editingOpportunity.type : newOpportunity.type}
                onChange={(e) => handleInputChange(e, !!editingOpportunity)}
                label="Type"
              >
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Job">Job</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={editingOpportunity ? editingOpportunity.company : newOpportunity.company}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={editingOpportunity ? editingOpportunity.location : newOpportunity.location}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={editingOpportunity ? editingOpportunity.description : newOpportunity.description}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Requirements (comma-separated)"
              name="requirements"
              value={editingOpportunity 
                ? (Array.isArray(editingOpportunity.requirements) 
                    ? editingOpportunity.requirements.join(", ") 
                    : editingOpportunity.requirements)
                : newOpportunity.requirements}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Stipend"
              name="stipend"
              value={editingOpportunity ? editingOpportunity.stipend : newOpportunity.stipend}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apply Link"
              name="applyLink"
              type="url"
              value={editingOpportunity ? editingOpportunity.applyLink : newOpportunity.applyLink}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="date"
              value={editingOpportunity ? editingOpportunity.deadline : newOpportunity.deadline}
              onChange={(e) => handleInputChange(e, !!editingOpportunity)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editingOpportunity ? editingOpportunity.status : newOpportunity.status}
                onChange={(e) => handleInputChange(e, !!editingOpportunity)}
                label="Status"
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className="mt-6 flex gap-3">
          {editingOpportunity ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={updateOpportunity}
              >
                Update Opportunity
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditingOpportunity(null);
                  setNewOpportunity({
                    title: "",
                    type: "Internship",
                    company: "",
                    location: "",
                    description: "",
                    requirements: "",
                    stipend: "",
                    applyLink: "",
                    deadline: "",
                    status: "Open"
                  });
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={addOpportunity}
            >
              Add Opportunity
            </Button>
          )}
        </div>
      </Paper>

      {/* Opportunities List */}
	  <Grid container spacing={3}>
  {filteredOpportunities.map((opportunity) => (
    <Grid item xs={12} md={6} lg={4} key={opportunity._id}>
      <Card className="h-full flex flex-col">
        <CardContent className="flex-grow">
          <Typography variant="h6" gutterBottom>
            {opportunity.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {opportunity.company} • {opportunity.location}
          </Typography>
          <Typography variant="body2" paragraph>
            {opportunity.description}
          </Typography>
          {opportunity.requirements?.length > 0 && (
            <div className="mb-2">
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Requirements:
              </Typography>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(opportunity.requirements) 
                  ? opportunity.requirements.map((req, index) => (
                    <Chip 
                      key={index} 
                      label={req} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      className="m-1"
                    />
                  ))
                  : opportunity.requirements.split(',').map((req, index) => (
                    <Chip 
                      key={index} 
                      label={req.trim()} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      className="m-1"
                    />
                  ))
                }
              </div>
            </div>
          )}
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Stipend: {opportunity.stipend}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Status: {' '}
            <Chip 
              label={opportunity.status} 
              size="small" 
              color={opportunity.status === "Open" ? "success" : "error"}
              className="ml-1"
            />
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mt-2">
            Apply Link:{' '}
            <Link 
              href={opportunity.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              {opportunity.applyLink.length > 30 
                ? opportunity.applyLink.substring(0, 30) + '...' 
                : opportunity.applyLink}
              <LaunchIcon fontSize="small" />
            </Link>
          </Typography>
        </CardContent>
        <CardActions className="flex justify-between">
          <div>
            <IconButton 
              size="small" 
              color="primary"
              onClick={() => setEditingOpportunity(opportunity)}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              color="error"
              onClick={() => deleteOpportunity(opportunity._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            href={opportunity.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
          >
            Apply Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
    </div>
  );
};

export default AlumniOpportunities;