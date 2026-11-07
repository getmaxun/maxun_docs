import React from 'react';
import Content from '@theme-original/Navbar/Content';
import DocsTabs from '@site/src/components/DocsTabs';

// Adds the Documentation / AI / API Reference / SDKs tab row under the navbar.
export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <DocsTabs />
    </>
  );
}
