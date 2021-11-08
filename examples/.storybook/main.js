module.exports = {
  stories: [
    // '../components/**/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/action-sheet-provider/stories/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/backdrop-provider/stories/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/button/stories/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/date-picker/stories/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/modal-dialog/stories/*.stories.?(ts|tsx|js|jsx)',
    '../../packages/select/stories/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-notes',
    // '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
  ],
  reactOptions: {
    fastRefresh: true,
  },
};
