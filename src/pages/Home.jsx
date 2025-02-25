import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Typography,
    useTheme,
    alpha,
    Toolbar,
    Stack,
    TextField,
    Paper,
    Divider
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import RocketIcon from '@mui/icons-material/Rocket';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Features data
    const features = [
        {
            icon: <CodeIcon sx={{ fontSize: 40 }} />,
            title: 'Clean Code',
            description: 'Write and maintain high-quality code with modern tools.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Secure Platform',
            description: 'Enterprise-grade security for all your applications.'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: 'Fast Performance',
            description: 'Optimized infrastructure for blazing fast performance.'
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 40 }} />,
            title: 'Collaboration',
            description: 'Work seamlessly with your team in real-time.'
        }
    ];

    // Pricing plans
    const plans = [
        {
            title: 'Basic',
            price: 'Free',
            features: ['Basic Features', '5 Projects', 'Community Support', '1GB Storage'],
            recommended: false
        },
        {
            title: 'Pro',
            price: '$29/mo',
            features: ['All Basic Features', 'Unlimited Projects', 'Priority Support', '10GB Storage'],
            recommended: true
        },
        {
            title: 'Enterprise',
            price: 'Custom',
            features: ['All Pro Features', 'Custom Integration', 'Dedicated Support', 'Unlimited Storage'],
            recommended: false
        }
    ];

    // return (
    //     <Box>
    //         {/* Navbar */}
    //         <AppBar 
    //             position="fixed" 
    //             elevation={scrolled ? 4 : 0}
    //             sx={{
    //                 bgcolor: scrolled ? 'white' : 'transparent',
    //                 transition: 'all 0.3s'
    //             }}
    //         >
    //             <Container maxWidth="lg">
    //                 <Toolbar disableGutters>
    //                     {/* Logo */}
    //                     <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
    //                         <RocketIcon 
    //                             sx={{ 
    //                                 fontSize: 35,
    //                                 color: theme.palette.primary.main,
    //                                 transform: 'rotate(45deg)'
    //                             }} 
    //                         />
    //                         <Typography 
    //                             variant="h5" 
    //                             sx={{ 
    //                                 ml: 1,
    //                                 fontWeight: 700,
    //                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    //                                 WebkitBackgroundClip: 'text',
    //                                 WebkitTextFillColor: 'transparent'
    //                             }}
    //                         >
    //                             Hackathon
    //                         </Typography>
    //                     </Box>

    //                     {/* Desktop Navigation */}
    //                     <Stack 
    //                         direction="row" 
    //                         spacing={3}
    //                         sx={{ 
    //                             display: { xs: 'none', md: 'flex' },
    //                             alignItems: 'center'
    //                         }}
    //                     >
    //                         {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
    //                             <Button
    //                                 key={item}
    //                                 sx={{
    //                                     color: scrolled ? 'text.primary' : 'white',
    //                                     '&:hover': {
    //                                         color: theme.palette.primary.main
    //                                     }
    //                                 }}
    //                             >
    //                                 {item}
    //                             </Button>
    //                         ))}
    //                         <Button
    //                             variant="contained"
    //                             sx={{
    //                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    //                                 color: 'white',
    //                                 px: 3,
    //                                 '&:hover': {
    //                                     background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
    //                                 }
    //                             }}
    //                         >
    //                             Get Started
    //                         </Button>
    //                     </Stack>

    //                     {/* Mobile menu button */}
    //                     <IconButton 
    //                         sx={{ 
    //                             display: { xs: 'flex', md: 'none' },
    //                             color: scrolled ? 'text.primary' : 'white'
    //                         }}
    //                     >
    //                         <MenuIcon />
    //                     </IconButton>
    //                 </Toolbar>
    //             </Container>
    //         </AppBar>

    //         {/* Hero Section */}
    //         <Box
    //             sx={{
    //                 pt: { xs: 12, md: 20 },
    //                 pb: { xs: 8, md: 12 },
    //                 background: `linear-gradient(to bottom right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`
    //             }}
    //         >
    //             <Container maxWidth="lg">
    //                 <Grid container spacing={6} alignItems="center">
    //                     <Grid item xs={12} md={6}>
    //                         <Typography
    //                             variant="h1"
    //                             sx={{
    //                                 fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
    //                                 fontWeight: 700,
    //                                 lineHeight: 1.2,
    //                                 mb: 3,
    //                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    //                                 WebkitBackgroundClip: 'text',
    //                                 WebkitTextFillColor: 'transparent'
    //                             }}
    //                         >
    //                             Transform Your Ideas Into Reality
    //                         </Typography>
    //                         <Typography
    //                             variant="h2"
    //                             sx={{
    //                                 fontSize: { xs: '1.1rem', md: '1.3rem' },
    //                                 color: 'text.secondary',
    //                                 mb: 4,
    //                                 fontWeight: 'normal'
    //                             }}
    //                         >
    //                             Join our platform to showcase your skills, collaborate with others,
    //                             and build amazing projects.
    //                         </Typography>
    //                         <Stack
    //                             direction={{ xs: 'column', sm: 'row' }}
    //                             spacing={2}
    //                         >
    //                             <Button
    //                                 variant="contained"
    //                                 size="large"
    //                                 sx={{
    //                                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    //                                     color: 'white',
    //                                     px: 4,
    //                                     py: 1.5,
    //                                     fontSize: '1.1rem',
    //                                     '&:hover': {
    //                                         background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
    //                                     }
    //                                 }}
    //                             >
    //                                 Get Started Free
    //                             </Button>
    //                             <Button
    //                                 variant="outlined"
    //                                 size="large"
    //                                 endIcon={<ArrowForwardIcon />}
    //                                 sx={{
    //                                     px: 4,
    //                                     py: 1.5,
    //                                     fontSize: '1.1rem',
    //                                     borderColor: theme.palette.primary.main,
    //                                     color: theme.palette.primary.main,
    //                                     '&:hover': {
    //                                         borderColor: theme.palette.primary.dark,
    //                                         bgcolor: alpha(theme.palette.primary.main, 0.05)
    //                                     }
    //                                 }}
    //                             >
    //                                 Learn More
    //                             </Button>
    //                         </Stack>
    //                     </Grid>
    //                     <Grid item xs={12} md={6}>
    //                         <Box
    //                             component="img"
    //                             src="https://themes.themesbrand.com/zooki/react/static/media/home-2-img.654d7b2c.png"
    //                             sx={{
    //                                 width: '100%',
    //                                 height: 'auto',
    //                                 animation: 'float 3s ease-in-out infinite',
    //                                 '@keyframes float': {
    //                                     '0%, 100%': { transform: 'translateY(0)' },
    //                                     '50%': { transform: 'translateY(-20px)' }
    //                                 }
    //                             }}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Container>
    //         </Box>
	return (
		<Box>
			{/* Navbar */}
			<AppBar 
				position="fixed" 
				elevation={scrolled ? 4 : 0}
				sx={{
					bgcolor: 'rgba(255, 255, 255, 0.95)',
					backdropFilter: 'blur(8px)',
					transition: 'all 0.3s'
				}}
			>
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ py: 1 }}>
						{/* Logo */}
						<Box 
							sx={{ 
								display: 'flex', 
								alignItems: 'center', 
								flexGrow: 1,
								cursor: 'pointer' 
							}}
							onClick={() => navigate('/')}
						>
							<RocketIcon 
								sx={{ 
									fontSize: 35,
									color: theme.palette.primary.main,
									transform: 'rotate(45deg)'
								}} 
							/>
							<Typography 
								variant="h5" 
								sx={{ 
									ml: 1,
									fontWeight: 700,
									background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent'
								}}
							>
								Hackathon
							</Typography>
						</Box>
	
						{/* Desktop Navigation */}
						<Stack 
							direction="row" 
							spacing={3}
							sx={{ 
								display: { xs: 'none', md: 'flex' },
								alignItems: 'center'
							}}
						>
							{['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
								<Button
									key={item}
									sx={{
										color: 'text.primary',
										fontWeight: 500,
										'&:hover': {
											color: theme.palette.primary.main,
											background: 'transparent'
										}
									}}
								>
									{item}
								</Button>
							))}
							<Button
								variant="outlined"
								onClick={() => navigate('/login')}
								sx={{
									borderColor: theme.palette.primary.main,
									color: theme.palette.primary.main,
									'&:hover': {
										borderColor: theme.palette.primary.dark,
										background: alpha(theme.palette.primary.main, 0.05)
									}
								}}
							>
								Login
							</Button>
							<Button
								variant="contained"
								onClick={() => navigate('/signup')}
								sx={{
									background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
									color: 'white',
									px: 3,
									'&:hover': {
										background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
									}
								}}
							>
								Sign Up
							</Button>
						</Stack>
	
						{/* Mobile menu button */}
						<IconButton 
							sx={{ 
								display: { xs: 'flex', md: 'none' },
								color: 'text.primary'
							}}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>
	
			{/* Hero Section */}
			<Box
				sx={{
					pt: { xs: 12, md: 20 },
					pb: { xs: 8, md: 12 },
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
	
				<Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
					<Grid container spacing={6} alignItems="center">
						<Grid item xs={12} md={6}>
							<Typography
								variant="h1"
								sx={{
									fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
									fontWeight: 700,
									lineHeight: 1.2,
									mb: 3,
									background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent'
								}}
							>
								Transform Your Ideas Into Reality
							</Typography>
							<Typography
								variant="h2"
								sx={{
									fontSize: { xs: '1.1rem', md: '1.3rem' },
									color: 'text.secondary',
									mb: 4,
									fontWeight: 'normal',
									lineHeight: 1.6
								}}
							>
								Join our platform to showcase your skills, collaborate with others,
								and build amazing projects that make a difference.
							</Typography>
							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								spacing={2}
							>
								<Button
									variant="contained"
									size="large"
									onClick={() => navigate('/signup')}
									sx={{
										background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
										color: 'white',
										px: 4,
										py: 1.5,
										fontSize: '1.1rem',
										'&:hover': {
											background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
										}
									}}
								>
									Get Started Free
								</Button>
								<Button
									variant="outlined"
									size="large"
									endIcon={<ArrowForwardIcon />}
									sx={{
										px: 4,
										py: 1.5,
										fontSize: '1.1rem',
										borderColor: theme.palette.primary.main,
										color: theme.palette.primary.main,
										'&:hover': {
											borderColor: theme.palette.primary.dark,
											bgcolor: alpha(theme.palette.primary.main, 0.05)
										}
									}}
								>
									Learn More
								</Button>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box
								sx={{
									position: 'relative',
									'&::before': {
										content: '""',
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: '140%',
										height: '140%',
										background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
										borderRadius: '50%',
										zIndex: -1
									}
								}}
							>
								<Box
									component="img"
									src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg"
									sx={{
										width: '100%',
										height: 'auto',
										borderRadius: '20px',
										boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
										animation: 'float 3s ease-in-out infinite',
										'@keyframes float': {
											'0%, 100%': { transform: 'translateY(0)' },
											'50%': { transform: 'translateY(-20px)' }
										}
									}}
								/>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
			            {/* Features Section */}
						<Box sx={{ py: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                mb: 2,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Powerful Features
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.1rem',
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Everything you need to build and scale your projects
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: theme.shadows[10]
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                        <Box
                                            sx={{
                                                mb: 3,
                                                display: 'inline-flex',
                                                p: 2,
                                                borderRadius: '50%',
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                mb: 2,
                                                fontWeight: 600
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'text.secondary'
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {[
                            { number: '10K+', label: 'Active Users' },
                            { number: '50+', label: 'Countries' },
                            { number: '100+', label: 'Projects' },
                            { number: '24/7', label: 'Support' }
                        ].map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: 'white',
                                        borderRadius: 2,
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: theme.shadows[2]
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            fontWeight: 700,
                                            color: theme.palette.primary.main,
                                            mb: 1
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pricing Section */}
            <Box sx={{ py: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                mb: 2,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Simple Pricing
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.1rem',
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Choose the perfect plan for your needs
                        </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        {plans.map((plan, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        position: 'relative',
                                        transition: 'all 0.3s ease',
                                        transform: plan.recommended ? 'scale(1.05)' : 'none',
                                        border: plan.recommended ? `2px solid ${theme.palette.primary.main}` : 'none',
                                        '&:hover': {
                                            transform: plan.recommended ? 'scale(1.05)' : 'scale(1.02)',
                                            boxShadow: theme.shadows[10]
                                        }
                                    }}
                                >
                                    {plan.recommended && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 20,
                                                right: -30,
                                                transform: 'rotate(45deg)',
                                                bgcolor: theme.palette.primary.main,
                                                color: 'white',
                                                px: 4,
                                                py: 0.5,
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Popular
                                        </Box>
                                    )}
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                            {plan.title}
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                mb: 4,
                                                color: theme.palette.primary.main,
                                                fontWeight: 700
                                            }}
                                        >
                                            {plan.price}
                                        </Typography>
                                        <Box sx={{ mb: 4 }}>
                                            {plan.features.map((feature, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        mb: 2
                                                    }}
                                                >
                                                    <CheckCircleIcon
                                                        sx={{
                                                            mr: 1,
                                                            color: theme.palette.success.main,
                                                            fontSize: 20
                                                        }}
                                                    />
                                                    <Typography>{feature}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Button
                                            variant={plan.recommended ? "contained" : "outlined"}
                                            fullWidth
                                            size="large"
                                            sx={{
                                                py: 1.5,
                                                ...(plan.recommended && {
                                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                    '&:hover': {
                                                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                                    }
                                                })
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
			            {/* Contact Section */}
						<Box sx={{ py: 10, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    fontWeight: 700,
                                    mb: 3,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Get in Touch
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    mb: 4,
                                    fontSize: '1.1rem'
                                }}
                            >
                                Have questions? We're here to help you. Send us a message and we'll respond as soon as possible.
                            </Typography>
                            {[
                                { icon: <LocationOnIcon />, text: '123 Innovation Street, Tech City' },
                                { icon: <EmailIcon />, text: 'contact@platform.com' },
                                { icon: <PhoneIcon />, text: '+1 (555) 123-4567' }
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            transition: 'transform 0.3s ease'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mr: 2,
                                            color: theme.palette.primary.main,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card 
                                sx={{ 
                                    p: 4,
                                    boxShadow: theme.shadows[5],
                                    borderRadius: 2
                                }}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Your Name"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Your Email"
                                        variant="outlined"
                                        type="email"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Message"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            '&:hover': {
                                                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                                            }
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: 'grey.900',
                    color: 'white',
                    py: 8,
                    mt: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Brand Section */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <RocketIcon 
                                    sx={{ 
                                        fontSize: 35,
                                        color: theme.palette.primary.main,
                                        transform: 'rotate(45deg)'
                                    }} 
                                />
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        ml: 1,
                                        fontWeight: 700,
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Hackathon
                                </Typography>
                            </Box>
                            <Typography 
                                sx={{ 
                                    color: 'grey.500',
                                    mb: 3,
                                    pr: { md: 8 }
                                }}
                            >
                                Building the future through innovation and collaboration. Join our community of developers and creators.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                {[
                                    { icon: <GitHubIcon />, label: 'GitHub' },
                                    { icon: <TwitterIcon />, label: 'Twitter' },
                                    { icon: <LinkedInIcon />, label: 'LinkedIn' }
                                ].map((social) => (
                                    <IconButton
                                        key={social.label}
                                        sx={{
                                            color: 'grey.500',
                                            '&:hover': {
                                                color: theme.palette.primary.main,
                                                transform: 'translateY(-3px)',
                                                transition: 'all 0.3s ease'
                                            }
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Quick Links */}
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={4}>
                                {[
                                    {
                                        title: 'Company',
                                        links: ['About Us', 'Features', 'Pricing', 'Contact']
                                    },
                                    {
                                        title: 'Resources',
                                        links: ['Blog', 'Documentation', 'Community', 'Support']
                                    },
                                    {
                                        title: 'Legal',
                                        links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
                                    }
                                ].map((section) => (
                                    <Grid item xs={12} sm={4} key={section.title}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: 3,
                                                color: 'white'
                                            }}
                                        >
                                            {section.title}
                                        </Typography>
                                        <Stack spacing={2}>
                                            {section.links.map((link) => (
                                                <Button
                                                    key={link}
                                                    sx={{
                                                        color: 'grey.500',
                                                        justifyContent: 'flex-start',
                                                        p: 0,
                                                        '&:hover': {
                                                            color: 'white',
                                                            bgcolor: 'transparent',
                                                            transform: 'translateX(5px)',
                                                            transition: 'all 0.3s ease'
                                                        }
                                                    }}
                                                >
                                                    {link}
                                                </Button>
                                            ))}
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
                    
                    <Typography 
                        align="center" 
                        sx={{ 
                            color: 'grey.500',
                            fontSize: '0.875rem'
                        }}
                    >
                        © {new Date().getFullYear()} Hackathon. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;