import React from 'react';
import ContentLoader from 'react-content-loader';

 const PageLoader = () => (
    <ContentLoader
        height={440}
        width={860}
        speed={1}
        primaryColor={"#f3f3f3"}
        secondaryColor={"#ecebeb"}
    >
        <rect x="0" y="0" rx="8" ry="8" width="280" height="48" />
        <rect x="0" y="64" rx="8" ry="8" width="480" height="24" />

        <rect x="0" y="118" rx="2" ry="2" width="860" height="1" />

        <rect x="0" y="148" rx="4" ry="4" width="124" height="24" />
        <rect x="0" y="188" rx="4" ry="4" width="200" height="16" />
        <rect x="0" y="220" rx="4" ry="4" width="124" height="16" />

        <rect x="258" y="148" rx="4" ry="4" width="602" height="64" />
        <rect x="258" y="228" rx="4" ry="4" width="602" height="48" />

        <rect x="258" y="292" rx="4" ry="4" width="70" height="12" />
        <rect x="324" y="292" rx="4" ry="4" width="90" height="12" />
        <rect x="432" y="292" rx="4" ry="4" width="20" height="12" />

        <rect x="258" y="320" rx="4" ry="4" width="50" height="12" />
        <rect x="304" y="320" rx="4" ry="4" width="90" height="12" />
        <rect x="410" y="320" rx="4" ry="4" width="30" height="12" />
        <rect x="456" y="320" rx="4" ry="4" width="60" height="12" />
    </ContentLoader>
);

export default PageLoader;
