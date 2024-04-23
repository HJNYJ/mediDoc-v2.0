import { Card, Skeleton } from "@nextui-org/react";

export default function ContainerSkeleton() {
  return (
    <Card className="w-full bg-yellow">
      <div className="mt-10 mb-5 flex relative">
        <div>
          <Skeleton className="bg-blue p-5 rounded-" />
        </div>
        <div className="flex absolute p-7 right-3 bg-black">
          <Skeleton className="flex w-10 bg-orange " />
          <Skeleton className="flex w-24 bg-slate-500" />
        </div>
      </div>
    </Card>
  );
}
