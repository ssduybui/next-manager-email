"use client"

import { useState } from "react"
import DoughnutChart from "@/components/A/Chart/DoughnutChart";


const jobDoughnutType: { id: number, title: string}[] = [
    {
        id: 1,
        title: "Today"
    },
    {
        id: 2,
        title: "Total"
    }

]

interface Props {
    role: string;
}

const DoughnutJob: React.FC<Props> = ({
    role
}) => {
    
    const [isJob, setIsJob] = useState(jobDoughnutType[0].title)

    const handleIsJobChange = (job: string) => {
        setIsJob(job)
    }

    return (
        <div className="space-y-5">
            <div className="flex space-x-3">
                {jobDoughnutType.map(({id, title}) => (
                    <button
                        key={id}
                        onClick={() => handleIsJobChange(title)}
                        className={`border py-1 px-2 rounded-xl text-xs ${isJob === title ? "bg-cyan-500 text-white" : "bg-neutral-100 text-black"}`}
                    >
                        <span>{title}</span>
                    </button>
                ))}
            </div>
            <DoughnutChart job={isJob} role={role}/>
        </div>
    )
}

export default DoughnutJob;