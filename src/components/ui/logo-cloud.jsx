import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

export function LogoCloud({ className, logos, ...props }) {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
                {logos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-center">
                        {logo.component ? (
                            <logo.component className="w-12 h-12 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" />
                        ) : (
                            <img
                                alt={logo.alt}
                                className="pointer-events-none h-8 w-auto select-none dark:brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity"
                                src={logo.src}
                                loading="lazy"
                            />
                        )}
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}
