import { create } from 'zustand';
import { INITIAL_VALUE_GLOBAL_STORE } from '@constants/initialValue';

const useGlobalStore = create<GlobalStore>((set) => ({
  ...INITIAL_VALUE_GLOBAL_STORE,
  setShowModalAdd: (val) => set({ isShowModalAddProduct: val }),
  setShowModalConfirm: (val) => set({ isShowModalConfirmDelete: val }),
  setShowModalUpdate: (val) => set({ isShowModalUpdateProduct: val }),
}));

export default useGlobalStore;
