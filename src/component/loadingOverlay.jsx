import { useEffect } from "react";

const LoadingOverlay = ({ loading, children }) => {
    useEffect(() => {
        if (loading) {
            // Disable scrolling when loading overlay is active
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when loading overlay is inactive
            document.body.style.overflow = 'auto';
        }
    }, [loading]);
    return (
        <div className="relative h-screen">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
                    <div className="w-16 h-16 border-t-4 border-[#05a081] rounded-full animate-spin"></div>
                </div>
            )}
            {children}
        </div>
    );
};

export default LoadingOverlay;
