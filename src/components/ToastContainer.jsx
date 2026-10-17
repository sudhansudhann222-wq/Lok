import React from 'react';

export default function ToastContainer({ toasts = [], removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border text-sm font-semibold transition-all transform animate-slideUp ${
              isError
                ? 'bg-rose-900/90 text-rose-100 border-rose-500/40'
                : isWarning
                ? 'bg-amber-900/90 text-amber-100 border-amber-500/40'
                : isSuccess
                ? 'bg-emerald-900/90 text-emerald-100 border-emerald-500/40'
                : 'bg-slate-900/90 text-pink-100 border-pink-500/40'
            }`}
          >
            <i
              className={`fas ${
                isError
                  ? 'fa-circle-exclamation text-rose-400'
                  : isWarning
                  ? 'fa-triangle-exclamation text-amber-400'
                  : isSuccess
                  ? 'fa-circle-check text-emerald-400'
                  : 'fa-sparkles text-pink-400'
              } text-base`}
            ></i>
            <span className="flex-1 leading-snug">{toast.message}</span>
            {removeToast && (
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white transition ml-1"
                aria-label="Dismiss toast"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
