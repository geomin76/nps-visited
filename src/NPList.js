import { useState } from 'react';
import {
    Grid, Card, CardActionArea, Typography, Box, IconButton,
    Popover, MenuItem, Select, FormControl, InputLabel, Button, Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { setVisited, setVisitDate, formatVisitDate } from './Service';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

export const NPList = ({ data, setData }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editingPark, setEditingPark] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleOpenDatePicker = (event, park) => {
        event.stopPropagation();
        setEditingPark(park);
        if (park.visitDate) {
            const [y, m] = park.visitDate.split('-');
            setSelectedYear(parseInt(y, 10));
            setSelectedMonth(parseInt(m, 10));
        } else {
            setSelectedMonth('');
            setSelectedYear('');
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setEditingPark(null);
    };

    const handleSaveDate = () => {
        if (editingPark && selectedMonth && selectedYear) {
            const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;
            setVisitDate(editingPark.index, dateStr, setData);
        }
        handleClose();
    };

    const handleClearDate = () => {
        if (editingPark) {
            setVisitDate(editingPark.index, null, setData);
        }
        handleClose();
    };

    return (
        <>
            <Grid container spacing={2}>
                {data.map((park) => (
                    <Grid item xs={6} sm={4} md={3} key={park.index}>
                        <Card
                            elevation={park.visited ? 3 : 0}
                            sx={{
                                borderRadius: 2,
                                border: park.visited ? 'none' : '1px solid #e0e0e0',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                            }}
                        >
                            <CardActionArea
                                onClick={() => setVisited(park.index, setData)}
                                sx={{
                                    p: 2,
                                    minHeight: 80,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: park.visited ? park.color : 'white',
                                    color: park.visited ? 'white' : '#333',
                                }}
                            >
                                {park.visited && (
                                    <CheckCircleIcon sx={{ fontSize: 20, mb: 0.5, opacity: 0.9 }} />
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: park.visited ? 600 : 400,
                                        textAlign: 'center',
                                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {park.name}
                                </Typography>
                                {park.visited && park.visitDate && (
                                    <Typography
                                        variant="caption"
                                        sx={{ opacity: 0.85, mt: 0.5, fontSize: '0.7rem' }}
                                    >
                                        {formatVisitDate(park.visitDate)}
                                    </Typography>
                                )}
                            </CardActionArea>
                            {park.visited && (
                                <IconButton
                                    size="small"
                                    onClick={(e) => handleOpenDatePicker(e, park)}
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        color: 'white',
                                        bgcolor: 'rgba(0,0,0,0.2)',
                                        '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                                        width: 28,
                                        height: 28,
                                    }}
                                >
                                    <EditCalendarIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box sx={{ p: 2, minWidth: 240 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                        When did you visit {editingPark?.name}?
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                label="Month"
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                {MONTHS.map((m, i) => (
                                    <MenuItem key={i} value={i + 1}>{m}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 90 }}>
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={selectedYear}
                                label="Year"
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                {YEARS.map((y) => (
                                    <MenuItem key={y} value={y}>{y}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {editingPark?.visitDate && (
                            <Button size="small" color="error" onClick={handleClearDate}>
                                Clear
                            </Button>
                        )}
                        <Button size="small" onClick={handleClose}>Cancel</Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={handleSaveDate}
                            disabled={!selectedMonth || !selectedYear}
                            sx={{ bgcolor: '#2e3d2f', '&:hover': { bgcolor: '#3e5340' } }}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Popover>
        </>
    );
};