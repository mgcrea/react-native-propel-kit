import {getStorybookUI} from '@storybook/react-native';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({
  // isUIHidden: true,
  shouldPersistSelection: true,
  // theme: {
  //   backgroundColor: 'red',
  //   headerTextColor: 'black',
  //   labelColor: 'black',
  //   borderColor: 'black',
  //   previewBorderColor: 'black',
  //   buttonTextColor: 'black',
  //   buttonActiveTextColor: 'black',
  // },
});

export default StorybookUIRoot;
