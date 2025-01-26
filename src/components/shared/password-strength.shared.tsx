import { cn, evaluatePasswordStrength } from "@/lib/utils";

export const PasswordStrength = ({ password = "" }: { password?: string }) => {
    const score: number = evaluatePasswordStrength(password);

    if (!password) return null;

    const getColor = (index: number) => {
        if (score > index) {
            if (score <= 2) return "bg-red-500";
            if (score <= 4) return "bg-yellow-500";
            return "bg-green-500";
        }
        return "bg-gray-200";
    };

    return (
        <div className="flex gap-1 mt-3">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="w-1/5">
                    <div className={cn("h-2 rounded-xl transition-colors", getColor(index))}></div>
                </div>
            ))}
        </div>
    );
};