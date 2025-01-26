"use client"

import React from "react"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { LogOutIcon } from "lucide-react"

export const AvatarDropdown = () => {

    const { status, data } = useSession()
    const [openDropdown, setOpenDropdown] = React.useState(false)
    const isMobile = useIsMobile()

    if (status === "loading") {
        return <Skeleton className="w-9 h-9 rounded-full" />
    }

    if (status === "authenticated") {
        const { name, image, email, role } = data.user
        return (
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown} modal={false}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 rounded-full cursor-pointer select-none">
                        {image &&
                            <AvatarImage src={image as string} />
                        }
                        <AvatarFallback className="rounded-lg">
                            {name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={4}
                    className={cn(
                        "w-[--radix-dropdown-menu-trigger-width]  rounded-lg",
                        {
                            "w-screen h-[calc(100dvh_-_60px)] overflow-auto": isMobile,
                            "min-w-56": !isMobile,
                        }
                    )}
                >

                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-9 w-9 rounded-full">
                                <AvatarFallback className="rounded-lg">
                                    {image &&
                                        <AvatarImage src={image as string} />
                                    }
                                    <AvatarFallback className="rounded-lg">
                                        {name?.charAt(0)}
                                    </AvatarFallback>
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{name}</span>
                                <span className="truncate text-xs">{email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="text-red-500"
                            onSelect={() => {
                                signOut()
                            }}
                        >
                            <LogOutIcon />
                            <span>
                                log-out
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuArrow className="fill-border" />
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return null
}