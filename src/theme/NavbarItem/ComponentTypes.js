import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import GitHubStars from '@site/src/components/GitHubStars';

// Custom navbar items. Use them in docusaurus.config.js with
// `type: 'custom-<name>'`.
export default {
  ...ComponentTypes,
  'custom-githubStars': GitHubStars,
};
