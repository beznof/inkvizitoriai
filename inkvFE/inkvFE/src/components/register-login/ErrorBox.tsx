import CloseIcon from "@/static/CloseIcon";

type ErrorBoxProps = {
  error: string,
  onClose: () => void
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ error, onClose }) => {
  return (
    <div className="flex flex-row items-center justify-between max-h-full p-2 mb-3 bg-red-100 border-red-300 rounded-lg max-h-md border-1 ring-2 ring-red-100 gap-x-6">
      <p className="text-sm font-normal text-left text-red-500 break-words max-w-[300px]">
        {error}
      </p>
      <button onClick={onClose}>
        <CloseIcon className="transition-colors duration-100 size-4 fill-red-500 hover:fill-red-500/50"/>
      </button>
    </div>
  )
}

export default ErrorBox;