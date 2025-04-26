
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  count?: number;
  variant?: "task" | "project" | "card";
}

export function LoadingSkeleton({ count = 3, variant = "task" }: LoadingSkeletonProps) {
  const renderTaskSkeleton = () => (
    <div className="p-4 border rounded-lg shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-3/4">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between mt-4 pt-2 border-t border-border/40">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );

  const renderProjectSkeleton = () => (
    <div className="p-4 border rounded-lg shadow-sm animate-pulse">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="p-6 border rounded-lg shadow-sm animate-pulse">
      <Skeleton className="h-7 w-1/2 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-14 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );

  return (
    <div className="space-y-3">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            {variant === "task" && renderTaskSkeleton()}
            {variant === "project" && renderProjectSkeleton()}
            {variant === "card" && renderCardSkeleton()}
          </div>
        ))}
    </div>
  );
}
