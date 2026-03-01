'use client'

import { PAGES } from "@/app/lib/pages.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";

export function Nav() {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex">

                <li className="not-last:mr-4">
                    <Link className={clsx(pathname === PAGES.HOME ? 'text-gray-950' : 'text-gray-400')} href={PAGES.HOME}>home</Link>
                </li>
                <li className="not-last:mr-4">
                    <Link className={clsx(pathname === PAGES.BLOG ? 'text-gray-950' : 'text-gray-400')} href={PAGES.BLOG}>blog</Link>
                </li>
                <li className="not-last:mr-4">
                    <Link className={clsx(pathname === PAGES.GITHUB ? 'text-gray-950' : 'text-gray-400')} href={PAGES.GITHUB}>github</Link>
                </li>


                {/* <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>

                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={PAGES.HOME}>home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={PAGES.BLOG}>blog</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={PAGES.GITHUB}>github</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu> */}

            </ul>
        </nav>
    );
}