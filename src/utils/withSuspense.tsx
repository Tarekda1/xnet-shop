import React, { FC, useEffect, useState, Suspense } from "react";

const LoadingWithGraceTime: FC<{}> = (): any => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 300); // 300ms grace time allowed to load

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return isLoading ? "Loading" : null;
};

function withSuspense(WrappedComponent: React.ElementType): any {
  return (props: any) => {
    return (
      <Suspense fallback={<LoadingWithGraceTime />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;
