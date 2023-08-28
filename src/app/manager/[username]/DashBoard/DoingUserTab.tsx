import React from "react";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/Pagination/Pagination";
import Input from "@/components/Input/Input";
import { Route } from "@/routers/types";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import { getAccessToken } from "@/utils/clientToken";
import useSWR from "swr";
import { EmailsType } from "@/lib/types";
import { ConvertDateTime } from "@/utils/convertDateTime";

interface Props {
    viewer: string;
}

const DoingUserTab: React.FC<Props> = ({ viewer }) => {

    const token = getAccessToken();

    const fetcher = (url: string) => fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

    const { data, error } = useSWR(`/api/emails/partners/emails-doing?viewer=${viewer}`, fetcher);


    return (
        <div className="flex flex-col space-y-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                    <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                            <thead className="bg-neutral-100 dark:bg-neutral-800">
                                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                    <th scope="col" className="px-6 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Received Time
                                    </th>
                                </tr>
                            </thead>
                            {!error && data && (
                                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                                    {data.data.map((item: EmailsType, index: number) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center w-48 lg:w-auto max-w-md overflow-hidden">
                                                    <div className="ms-4 flex-grow">
                                                        <div className="text-center line-clamp-1 text-sm font-semibold  dark:text-neutral-300">
                                                            <Link
                                                                href={`/`}
                                                                target="_blank"
                                                            >
                                                                {item.brand_name}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex justify-center items-center w-48 lg:w-auto max-w-md overflow-hidden">
                                                    <span className="text-sm">{ConvertDateTime(item.updated_at)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoingUserTab;
