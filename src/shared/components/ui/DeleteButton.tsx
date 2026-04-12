'use client';

import { useActionState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteBlockAction } from '@/modules/projects/actions';

export default function DeleteButton({ id }: { id: string }) {

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await deleteBlockAction(id);
    },
    null // Giá trị khởi tạo
  );

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors disabled:opacity-50"
        title="Xóa vĩnh viễn"
      >
        {isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Trash2 size={18} />
        )}
      </button>

      {/* Hiển thị thông báo lỗi nhanh nếu cần */}
      {state?.success === false && (
        <p className="absolute top-full right-0 text-[10px] text-red-500 whitespace-nowrap">
          {state.message}
        </p>
      )}
    </form>
  );
}
