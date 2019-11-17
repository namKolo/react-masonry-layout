// @flow
import _ from 'lodash';
import React, { useRef, useState, useEffect } from 'react';

import { buildColumnsWithMinimumHeightDiff, computeElementPositions } from './utils';
import type { ItemPosition } from './utils';

type UseMasonryLayoutResult = {
  containerRef: React.RefObject<*>,
  childPositionList: Array<ItemPosition>
};

type UseMasonryLayoutConfig = {
  columnWidth: number,
  columnCount: number,
  gap: number
};

/**
 *  Build masonry layout by calculating position of each child which belongs to containerRef
 */
const useMasonryLayout = (children, config: UseMasonryLayoutConfig): UseMasonryLayoutResult => {
  const { columnWidth, columnCount, gap } = config;
  const containerRef = useRef();
  const [childPositionList, setChildPositionList] = useState([]);

  useEffect(() => {
    // get all children of containerRef
    const childHeightList = _.map(containerRef.current.childNodes, (childNode, colIndex) => ({
      height: childNode.clientHeight,
      index: colIndex
    }));

    // separate child into columns with minium height differences
    const cols = buildColumnsWithMinimumHeightDiff(childHeightList, columnCount);

    // compute child position
    const childPositionList = computeElementPositions(cols, { gap, columnWidth });

    setChildPositionList(childPositionList);
  }, [children, columnWidth, gap, columnCount]);

  return { childPositionList, containerRef };
};

export default useMasonryLayout;
