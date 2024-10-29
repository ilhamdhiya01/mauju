type SelectOption<Value = string> = {
  readonly label: string;
  readonly value: Value;
  description?: string;
  data?: any;
};

type GlobalState = {
  isShowModalAddProduct: boolean;
  isShowModalUpdateProduct: boolean;
  isShowModalConfirmDelete: boolean;
};

type GlobalAction = {
  setShowModalAdd: (val: boolean) => void;
  setShowModalUpdate: (val: boolean) => void;
  setShowModalConfirm: (val: boolean) => void;
};

type GlobalStore = GlobalState & GlobalAction;
