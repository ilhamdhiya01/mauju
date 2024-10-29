import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import InputLabel from '.';

export default {
  title: 'Basic/InputLabel',
  component: InputLabel,
  argTypes: {
    inputSize: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
    },
    fontWeight: {
      options: ['light', 'normal', 'bold'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof InputLabel>;

const Template: StoryFn<typeof InputLabel> = (args) => <InputLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  isNoMarginBottom: false,
  label: 'Label',
  required: false,
  inputSize: 'normal',
  fontWeight: 'normal',
};
