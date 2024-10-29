import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import InputError from '.';

export default {
  title: 'Basic/InputError',
  component: InputError,
} as Meta<typeof InputError>;

const Template: StoryFn<typeof InputError> = (args) => <InputError {...args} />;

export const Default = Template.bind({});
Default.args = {
  errorMessage: 'Data not found',
};
