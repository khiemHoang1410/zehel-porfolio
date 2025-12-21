'use client';

import { useActionState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteBlockAction } from '@/modules/admin/actions';

export default function DeleteButton({ id }: { id: string }) {
  /**
   * Giải thích: useActionState sẽ truyền (prevState, formData) vào hàm.
   * Do action của ngài cần (prevState, id), ta bọc lại như bên dưới.
   */
  const [state, formAction, isPending] = useActionState(
    (prevState: any) => deleteBlockAction(prevState, id),
    null
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
          <Trash2 size={18}/>
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
