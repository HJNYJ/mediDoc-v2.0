import { Card, Skeleton } from "@nextui-org/react";

export function ContainerSkeleton() {
  return (
    <Card>
      {/* 게시물 목록 */}
      <div className="flex flex-col gap-4 my-2 relative">
        <div className="border-b border-gray-200 h-[150px] flex align-center justify-between gap-4">
          <Skeleton className="flex rounded-lg mt-4 w-[90px] h-[90px] bg-bluegray flex-none order-0 flex-grow-0" />
          <div>
            <Skeleton className="h-[21px] w-[270px] bg-gray-100 mb-2" />
            <Skeleton className="h-[42px] w-[270px] bg-bluegray mb-2" />
            <Skeleton className="h-[30px] w-[200px] bg-gray-100 mb-2" />
            <Skeleton className="h-[27px] w-[57px] bg-yellow" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SkeletonList() {
  return (
    <div>
      <Skeleton className="h-[80px] w-[358px] flex justify-center bg-gray-50 my-7 " />
      <ContainerSkeleton />
      <ContainerSkeleton />
      <ContainerSkeleton />
      <ContainerSkeleton />
      <ContainerSkeleton />
    </div>
  );
}

export default SkeletonList;
