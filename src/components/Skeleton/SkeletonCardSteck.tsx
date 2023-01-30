import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Skeleton.css";

const SkeletonCardSteck = () => {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
};

const SkeletonCard: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={`skeleton-wrapper`}>
        <div>
          <Skeleton height={40} width={40} circle />
        </div>

        <div>
          <Skeleton height={20} width={100} />

          <Skeleton height={20} width={200} />
        </div>

        <Skeleton height={20} width={20} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCardSteck;
