"use client"

import { useState } from "react"
import BarChart from "../Chart/BarChart";


const jobBarType: { id: number, title: string }[] = [
    {
        id: 3,
        title: "Week"
    },
    {
        id: 4,
        title: "Month"
    },
    {
        id: 5,
        title: "Year"
    }
]

interface Props {
    role: string;
}

const BarJob: React.FC<Props> = ({
    role
}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // Tính toán ngày tháng hết hạn (30 ngày sau ngày bắt đầu)
    const maxEndDate = startDate
        ? new Date(startDate)
        : new Date(); // Nếu startDate không tồn tại, sử dụng ngày hiện tại

    maxEndDate.setDate(maxEndDate.getDate() + 30);

    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);

    };

    const handleEndDateChange = (e: any) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);

        handleEndDateSelected(newEndDate);
    };

    const handleEndDateSelected = (selectedDate: string) => {
        // Thực hiện hành động khi ngày kết thúc được chọn
        setIsJob("beetween")
    };


    const [isJob, setIsJob] = useState(jobBarType[0].title)

    const handleIsJobChange = (job: string) => {
        setIsJob(job)
        setStartDate('')
        setEndDate('')
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-around">
                <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-3 space-y-3 lg:space-y-0">
                    <div className="flex space-x-3">
                        {jobBarType.map(({ id, title }) => (
                            <button
                                key={id}
                                onClick={() => handleIsJobChange(title)}
                                className={`border py-1 px-2 rounded-xl text-xs 
                                ${isJob === title && startDate === '' && endDate === ''
                                        ? "bg-cyan-500 text-white"
                                        : "bg-neutral-100 text-black"}`}
                            >
                                <span>{'This ' + title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-x-2">
                        <input
                            className={`py-1 px-2 rounded-xl text-xs ${startDate !== '' && isJob ==='beetween' ? "bg-cyan-500 text-white" : "bg-neutral-100 text-black"}`}
                            type="date"
                            value={startDate}
                            onChange={(e) => handleStartDateChange(e)}
                        />

                        <span className="text-xs">to</span>

                        <input
                            className={`py-1 px-2 rounded-xl text-xs ${startDate !== '' && isJob ==='beetween' ? "bg-cyan-500 text-white" : "bg-neutral-100 text-black"}`}
                            type="date"
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e)}
                            min={startDate} // Ngày kết thúc phải sau ngày bắt đầu
                            max={maxEndDate.toISOString().slice(0, 10)} // Ngày kết thúc không vượt quá 30 ngày sau ngày bắt đầu
                        />
                    </div>
                </div>
            </div>

            <BarChart job={isJob} role={role} start_date={startDate} end_date={endDate} />
        </div>
    )
}

export default BarJob