type ComponentFontWeight = 'light' | 'normal' | 'semibold' | 'bold';

type SummaryType = 'sum' | 'avg' | 'min' | 'max';

type ComponentDirection = 'horizontal' | 'vertical';
type ComponentSize = 'small' | 'normal' | 'large';

type InputStyle<Type extends ComponentSize> = Partial<{
  [k in Type]: string;
}>;

type ThemeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'info'
  | 'warning'
  | 'neutral';

type OptionItem<Value = string, Label = string> = {
  readonly label: Label;
  readonly value: Value;
  description?: string;
  data?: any;
};

type GroupedOption = {
  readonly label: string;
  readonly options: readonly OptionItem[];
};
