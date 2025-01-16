import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticsCard = ({ title, count }) => {
    return (
        <Card className="bg-white shadow-lg rounded-lg max-w-xs mx-auto">
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    className=" text-gray-700 font-semibold"
                >
                    {title}
                </Typography>
                <Typography
                    variant="h4"
                    component="div"
                    className="text-center text-blue-500 font-bold mt-2"
                >
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;
