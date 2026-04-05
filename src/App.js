import { ParksList, TabPanel, a11yProps, countVisitedParks, saveVisited } from './Service';
import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, Tab, Tabs, Box,
  CircularProgress, ThemeProvider, createTheme, Dialog, DialogContent,
} from '@mui/material';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { NPList } from './NPList';
import { NPMap } from './NPMap';
import confetti from 'canvas-confetti';

const theme = createTheme({
  typography: {
    fontFamily: "'Figtree', sans-serif",
  },
});

const TOTAL_PARKS = 63;

const App = () => {
  const [data, setData] = useState(ParksList);
  const [value, setValue] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const prevVisitedCount = useRef(countVisitedParks(ParksList));

  useEffect(() => {
    saveVisited(data);
  }, [data]);

  const visitedCount = countVisitedParks(data);
  const progress = (visitedCount / TOTAL_PARKS) * 100;

  useEffect(() => {
    if (visitedCount === TOTAL_PARKS && prevVisitedCount.current < TOTAL_PARKS) {
      setShowCongrats(true);
      const duration = 4000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
    prevVisitedCount.current = visitedCount;
  }, [visitedCount]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f0' }}>
        {/* Header */}
        <Box sx={{
          bgcolor: '#2e3d2f',
          color: 'white',
          pt: 4,
          pb: 3,
          textAlign: 'center',
        }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={100}
              thickness={3}
              sx={{ color: 'rgba(255,255,255,0.15)', position: 'absolute' }}
            />
            <CircularProgress
              variant="determinate"
              value={progress}
              size={100}
              thickness={3}
              sx={{ color: '#8fbc8f' }}
            />
            <Box sx={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                {visitedCount}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 300, letterSpacing: 1 }}>
            of {TOTAL_PARKS} US National Parks explored
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{
          bgcolor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
          <Container maxWidth="md">
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minHeight: 56 },
                '& .Mui-selected': { color: '#2e3d2f' },
                '& .MuiTabs-indicator': { backgroundColor: '#2e3d2f' },
              }}
            >
              <Tab icon={<ChecklistOutlinedIcon />} label="List" iconPosition="start" {...a11yProps(0)} />
              <Tab icon={<MapOutlinedIcon />} label="Map" iconPosition="start" {...a11yProps(1)} />
            </Tabs>
          </Container>
        </Box>

        {/* Congrats Dialog */}
        <Dialog
          open={showCongrats}
          onClose={() => setShowCongrats(false)}
          PaperProps={{
            sx: {
              textAlign: 'center', p: 4, borderRadius: 3,
              bgcolor: '#2e3d2f', color: 'white',
            }
          }}
        >
          <DialogContent>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Congratulations!
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              You've visited all 63 US National Parks!
            </Typography>
          </DialogContent>
        </Dialog>

        {/* Content */}
        <TabPanel value={value} index={0}>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <NPList data={data} setData={setData} />
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <NPMap data={data} setData={setData} />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App;
