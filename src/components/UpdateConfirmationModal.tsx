import React from 'react';
import { ShoppingItem } from '../types';

interface UpdateConfirmationModalProps {
  itemsToDelete: ShoppingItem[];
  itemsToUpdate: ShoppingItem[];
  itemsToAdd: ShoppingItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

const UpdateConfirmationModal: React.FC<UpdateConfirmationModalProps> = ({
  itemsToDelete,
  itemsToUpdate,
  itemsToAdd,
  onConfirm,
  onCancel
}) => {
  const hasChanges = itemsToDelete.length > 0 || itemsToUpdate.length > 0 || itemsToAdd.length > 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">アイテム更新の確認</h3>
        
        {!hasChanges && (
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-400">
              スプレッドシートとの差分はありません。すべてのアイテムが最新の状態です。
            </p>
          </div>
        )}

        {itemsToDelete.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold text-red-600 dark:text-red-400 mb-2">
              削除されるアイテム ({itemsToDelete.length}件)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              スプレッドシートに存在しないため、アプリからも削除されます。
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {itemsToDelete.map(item => (
                <div key={item.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {item.circle}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {item.eventDate} | {item.block}-{item.number} | {item.title || '(タイトルなし)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {itemsToUpdate.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-2">
              更新されるアイテム ({itemsToUpdate.length}件)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              スプレッドシートの内容でタイトル・価格・備考が更新されます。購入状態は保持されます。
            </p>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {itemsToUpdate.length}件のアイテムが更新されます（詳細は省略）
            </div>
          </div>
        )}

        {itemsToAdd.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold text-green-600 dark:text-green-400 mb-2">
              追加されるアイテム ({itemsToAdd.length}件)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              スプレッドシートに新たに追加されたアイテムです。
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {itemsToAdd.map((item, index) => (
                <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800 text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {item.circle}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {item.eventDate} | {item.block}-{item.number} | {item.title || '(タイトルなし)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            disabled={!hasChanges}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {hasChanges ? '更新を実行' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateConfirmationModal;
