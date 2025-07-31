import {Spinner} from "@heroui/spinner";

const LoadingScreen: React.FC = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center select-none">
            <Spinner
                size="lg"
                label="Loading..."
                variant="wave"
                classNames={{
                    "label": "text-stone-600 font-semibold text-sm tracking-wide",
                    "dots" : "bg-rose-500"
                }}
            />
        </div>
    )
}

export default LoadingScreen;