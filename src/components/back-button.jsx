import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="px-3 border-2 border-purple-500 py-1.5 rounded-md shadow"
    >
      <div className="flex flex-row items-center gap-2">
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back</span>
      </div>
    </button>
  );
}
