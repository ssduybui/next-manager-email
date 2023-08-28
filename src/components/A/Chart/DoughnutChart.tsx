"user client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAccessToken } from '@/utils/clientToken';
import useSWR from 'swr';
import { useParams } from 'next/navigation'

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    role: string;
    job: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
    role,
    job
}) => {

    const params = useParams()

    const token = getAccessToken();

    const fetcher = (url: string) => fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

    const { data, isLoading, error } = useSWR(`/api/emails/emails-statistics?role=${role}&viewer=${params.username ? params.username : ''}&type_date=${job}`, fetcher, { refreshInterval: 1000 });

    if (error || isLoading) {
        return (
            <>
                <div className="h-80 flex justify-center items-center space-x-2">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    <span className="text-xl text-gray-500 dark:text-gray-400">Loading...</span>
                </div>
            </>
        )
    }

    const dataChartTotal = data.data.emails_total;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: job + ' Jobs',
            },
        },
    };

    const dataChart = {
        labels: ['Success', 'Cancel', 'Pending'],
        datasets: [
            {
                label: '# of Votes',
                data: [data.data.emails_success, data.data.emails_cancel, data.data.emails_pending],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)', // Success
                    'rgba(255, 99, 132, 0.5)', // Cancel
                    'rgba(250, 198, 26, 0.5)', // Pending
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Success
                    'rgba(255, 99, 132, 1)', // Cancel
                    'rgba(250, 198, 26, 1)', // Pending
                ],
                borderWidth: 1,
            },
        ],
    };

    const textCenter = {
        id: 'textCenter',
        afterDatasetsDraw(chart: ChartJS, args: any, pluginOptions: any) {
            const { ctx, data } = chart;
            const text = Number(data.datasets[0].data[0]) + Number(data.datasets[0].data[1]) + Number(data.datasets[0].data[2]);
            ctx.save();
            ctx.font = "bolder 12px sans-serif";
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Total: ${text}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
            ctx.restore();
        }
    }

    return (
        <>
            <Doughnut data={dataChart} options={options} plugins={[textCenter]} />
        </>
    )
}

export default DoughnutChart;