import { AvatarDropdown } from "@/components/shared/account.shared";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AvatarDropdown />
            {children}
        </>
    )
}