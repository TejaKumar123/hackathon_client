import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Link
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

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
              <CardActions className="justify-end">
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

export default Opportunities;