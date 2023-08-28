"use client"

import { useState } from "react";
import HistoryUserTab from "./HistoryUserTab";
import DoingUserTab from "./DoingUserTab";

const subPages: { pageName: string; emoij: string }[] = [
    {
        emoij: "⌛",
        pageName: "History",
    },
    {
        emoij: "✍",
        pageName: "Doing",
    },
];

interface Props {
    viewer: string
}

const DashBoardUser: React.FC<Props> = ({viewer}) => {
    const [currentPage, setCurrentPage] = useState<string>(subPages[0].pageName);
    const handleTabPage = (pageName: string) => {
        setCurrentPage(pageName)
    }

    return (
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
            <div className="flex-shrink-0 max-w-xl xl:w-64 xl:pe-8">
                <ul className="text-base space-y-1 text-neutral-700 dark:text-neutral-400">
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
                    <HistoryUserTab viewer={viewer}/>
                )}
                {currentPage === subPages[1].pageName && (
                    <DoingUserTab viewer={viewer} />
                )}
            </div>
        </div>
    )
}

export default DashBoardUser;