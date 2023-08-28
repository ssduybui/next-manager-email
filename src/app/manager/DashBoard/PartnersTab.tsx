import React, { useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/A/Pagination/Pagination";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { UsersType } from "@/lib/types";
import ButtonBlock from "./ButtonBlock";
import { getAccessToken } from "@/utils/clientToken";
import Link from "next/link";


const PartnersPage = () => {

    const [rows, setRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const token = getAccessToken();

    const fetcher = (url: string) => fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

    const { data, isLoading, error } = useSWR(`/api/users/all-users?rows=${rows}&page=${currentPage}`, fetcher);

    const handleSetRows = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRows(Number(event.target.value));
        setCurrentPage(1)
    }

    const totalPages = data?.data.page; // Số lượng trang

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const routers = useRouter();
    const handleViewUser = (username: string) => {
        routers.push(`/manager/${username}`);
    }

    return (
        <div className="flex flex-col space-y-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                    <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                            <thead className="bg-neutral-50 dark:bg-neutral-800">
                                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                    <th scope="col" className="px-6 py-3">
                                        User Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        State
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {!error && !isLoading ?
                                <>
                                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                                        {data.data.records.map((item: UsersType, index: number) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                                                        <div className="flex-grow text-center">
                                                            <span className="line-clamp-1 text-sm font-semibold  dark:text-neutral-300">
                                                                <span>{item.user_name}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <span className="px-2 text-xs leading-5 font-medium text-teal-900 lg:text-sm">
                                                        {item.user_fullname}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <span className={`px-2 text-xs leading-5 font-medium rounded-full lg:text-sm ${item.user_state === "active"
                                                        ? 'bg-teal-100 text-teal-900' : `bg-rose-100 text-rose-900`}`}>
                                                        {item.user_state}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    {/* <button
                                                        className="text-sm text-primary-800 dark:text-primary-500 hover:text-primary-900"
                                                        onClick={() => handleViewUser(item.user_name)}
                                                    >
                                                        View
                                                    </button> */}
                                                    <span className="text-sm text-primary-800 dark:text-primary-500 hover:text-primary-900">
                                                        <Link
                                                            href={`/manager/${item.user_name}`}
                                                            target="_blank"
                                                        >
                                                            View
                                                        </Link>
                                                    </span>
                                                    {` | `}
                                                    <ButtonBlock user_state={item.user_state} user_name={item.user_name} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                                :
                                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="h-64 flex justify-center items-center space-x-2 w-full">
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                </div>
                                                <span className="text-xl text-gray-500 dark:text-gray-400">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <select
                                value={rows}
                                className="h-11 w-auto border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-xl text-sm font-normal"
                                onChange={handleSetRows}
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>

                            </select>
                            <span className="text-sm">Rows Per Page</span>
                        </div>
                        <div className="flex items-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PartnersPage;
