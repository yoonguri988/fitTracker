import ReactDOM from "react-dom";
import { useModalStore } from "@/stores/useModalStore";

export const RoutineFormModal = ({ children }) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-40"
      onClick={closeModal}
    >
      <div
        className="w-full bg-base rounded-ss-xl rounded-se-xl p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold">운동 루틴 입력</div>
          <button
            onClick={closeModal}
            className="text-btn-del hover:text-sub text-xl"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
