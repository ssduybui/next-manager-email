"use client"

import Heading2 from "@/components/Heading/Heading2";
import { useState } from "react";
import HistoryTab from "./HistoryTab";
import DoingTab from "./DoingTab";
import ProfileTab from "./ProfileTab";

const subPages: { pageName: string; emoij: string }[] = [
    {
        emoij: "✍",
        pageName: "Doing",
    },
    {
        emoij: "⌛",
        pageName: "History",
    },
    {
        emoij: "👤",
        pageName: "Profile",
    },
];

interface Props {
    user_name?: string | null;
    user_fullname?: string | null;
}

const DashBoard: React.FC<Props> = ({
    user_name = '',
    user_fullname = ''
}) => {

    const [currentPage, setCurrentPage] = useState<string>(subPages[0].pageName);
    const handleTabPage = (pageName: string) => {
        setCurrentPage(pageName)
    }

    return (
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
            <div className="flex-shrink-0 max-w-xl xl:w-64 xl:pe-8">
                <ul className="text-base space-y-1 text-neutral-700 dark:text-neutral-400 flex flex-row lg:flex-col overflow-x-auto">
                    {subPages.map(({ pageName, emoij }, index) => {
                        return (
                            <li key={index}>
                                <button
                                    onClick={() => handleTabPage(pageName)}
                                    className={`px-6 py-3 font-medium rounded-full flex items-center ${currentPage === pageName
                                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                                        : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                        }`}
                                >
                                    <span className="w-8 me-2 text-lg">{emoij}</span>
                                    <span> {pageName}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="border-t border-neutral-500 dark:border-neutral-300 md:hidden"></div>

            <div className="flex-1">
                {currentPage === subPages[0].pageName && (
                    <DoingTab />
                )}
                {currentPage === subPages[1].pageName && (
                    <HistoryTab />
                )}
                {currentPage === subPages[2].pageName && (
                    <ProfileTab user_name={user_name} user_fullname={user_fullname} />
                )}
            </div>
        </div>
    )
}

export default DashBoard;