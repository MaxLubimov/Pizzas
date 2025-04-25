import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="130" cy="119" r="120" />
    <rect x="0" y="270" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="317" rx="18" ry="18" width="280" height="88" />
    <rect x="0" y="420" rx="22" ry="22" width="90" height="45" />
    <rect x="128" y="420" rx="26" ry="26" width="152" height="45" />
  </ContentLoader>
);

export default Sceleton;
