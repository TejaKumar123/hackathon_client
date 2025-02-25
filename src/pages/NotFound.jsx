

// const NotFound = () => {
// 	return (
// 		<div>NotFound</div>
// 	)
// }

// export default NotFound;
import { Box, Container, Button, Typography, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Decorations */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 4,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ErrorOutlineIcon 
                        sx={{ 
                            fontSize: 100,
                            color: theme.palette.primary.main,
                            mb: 3,
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                                '0%': {
                                    transform: 'scale(1)',
                                    opacity: 1
                                },
                                '50%': {
                                    transform: 'scale(1.1)',
                                    opacity: 0.7
                                },
                                '100%': {
                                    transform: 'scale(1)',
                                    opacity: 1
                                }
                            }
                        }} 
                    />
                    
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '6rem', md: '8rem' },
                            fontWeight: 700,
                            mb: 2,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'text.primary'
                        }}
                    >
                        Page Not Found
                    </Typography>

                    <Typography
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Oops! The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                color: 'white',
                                '&:hover': {
                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                }
                            }}
                        >
                            Back to Home
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    borderColor: theme.palette.primary.dark,
                                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                                }
                            }}
                        >
                            Go Back
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default NotFound;