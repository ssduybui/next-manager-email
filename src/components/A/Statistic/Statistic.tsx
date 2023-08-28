"use client"

import DoughnutJob from "./DoughnutJob";
import BarJob from "./BarJob";

interface StatisticsProps {
    role: string;
}

const Statistics: React.FC<StatisticsProps> = ({
    role
}) => {
    
    return (
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0">
            <div className="w-full md:w-1/3 flex justify-center items-center">
                <div className="max-w-auto md:w-56 lg:w-72 xl:w-96">
                    <DoughnutJob role={role}/>
                </div>
            </div>
            <div className="h-1 bg-slate-300"></div>
            <div className="w-full md:w-2/3">
                <BarJob role={role}/>
            </div>
        </div>
    )
}

export default Statistics;