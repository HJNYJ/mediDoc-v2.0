import { Card, Skeleton } from "@nextui-org/react";

export default function ContainerSkeleton() {
  return (
    <Card className="w-[300px] space-y-5 p-1 rounded-lg bg-black">
      <div className="max-w-[300px] w-full flex items-center gap-3 bg-yellow">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      {/* <Skeleton className="rounded-lg bg-yellow">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 bg-orange">
        <Skeleton className="w-3/5 rounded-lg bg-slate-600">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg bg-gray-900">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg bg-white">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div> */}
    </Card>
  );
}
