import React from "react";

const ConfirmOverwriteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-60 text-center">
        <div className="mb-2">
          이미 등록된 내용이 있습니다.
          <br />
          덮어쓰시겠습니까?
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-1 bg-btn-main rounded-xl"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-btn-del rounded-xl"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOverwriteModal;
