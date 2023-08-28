import React from "react";
import Logo from "@/components/Logo/Logo";
import SocialsList1 from "@/components/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";

export interface WidgetFooterMenu {
    id: string;
    title: string;
    menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "5",
        title: "Getting started",
        menus: [
            { href: "/", label: "Installation" },
            { href: "/", label: "Release Notes" },
            { href: "/", label: "Upgrade Guide" },
            { href: "/", label: "Browser Support" },
            { href: "/", label: "Editor Support" },
        ],
    },
    {
        id: "1",
        title: "Explore",
        menus: [
            { href: "/", label: "Design features" },
            { href: "/", label: "Prototyping" },
            { href: "/", label: "Design systems" },
            { href: "/", label: "Pricing" },
            { href: "/", label: "Customers" },
        ],
    },
    {
        id: "2",
        title: "Resources",
        menus: [
            { href: "/", label: "Best practices" },
            { href: "/", label: "Support" },
            { href: "/", label: "Developers" },
            { href: "/", label: "Learn design" },
            { href: "/", label: "What's new" },
        ],
    },
    {
        id: "4",
        title: "Community",
        menus: [
            { href: "/", label: "Discussion Forums" },
            { href: "/", label: "Code of Conduct" },
            { href: "/", label: "Community Resources" },
            { href: "/", label: "Contributing" },
            { href: "/", label: "Concurrent Mode" },
        ],
    },
];

const Footer: React.FC = () => {
    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm">
                <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
                    {menu.title}
                </h2>
                <ul className="mt-5 space-y-4">
                    {menu.menus.map((item, index) => (
                        <li key={index}>
                            <a
                                key={index}
                                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="nc-Footer relative py-5 border-t border-neutral-200 dark:border-neutral-700">
            <div className="container">
                <Logo />
            </div>

        </div>
    );
};

export default Footer;
