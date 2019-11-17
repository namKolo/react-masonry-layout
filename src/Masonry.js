// @flow
import _ from 'lodash';
import React from 'react';

import useMasonryLayout from './useMasonryLayout';

type Props = {
  children: React.Node,
  gap: number,
  columnCount: number,
  columnWidth: number,
  containerStyle?: Object
};

const Masonry = ({ children, gap, columnCount, columnWidth, containerStyle }: Props) => {
  const { childPositionList, containerRef } = useMasonryLayout(children, {
    columnCount,
    columnWidth,
    gap
  });
  const containerWidth = columnWidth * columnCount + gap * (columnCount - 1);

  return (
    <div
      style={{ width: containerWidth, position: 'relative', ...containerStyle }}
      ref={containerRef}
    >
      {_.map(children, (child, index) => {
        return <div style={{ ...childPositionList[index], position: 'absolute' }}>{child}</div>;
      })}
    </div>
  );
};
export default Masonry;
