import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesLoading() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-8">
        {/* 标题骨架屏 */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* 表单骨架屏 */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>

        {/* 列表骨架屏 */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                  <Skeleton className="h-3 w-32 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}