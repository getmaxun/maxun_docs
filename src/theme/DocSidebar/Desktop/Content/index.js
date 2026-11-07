import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SidebarTabs from '@site/src/components/SidebarTabs';

// Adds the Documentation / AI / API Reference / SDKs tabs above the sidebar.
export default function ContentWrapper(props) {
  return (
    <>
      <SidebarTabs variant="vertical" />
      <Content {...props} />
    </>
  );
}
