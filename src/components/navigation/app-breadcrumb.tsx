"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { formatLabel, isNumeric } from "@/lib/string.helpers";

export function AppBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  let pathAccumulator = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
          {segments.length > 0 && <BreadcrumbSeparator />}
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          pathAccumulator += `/${segment}`;
          const isLast = index === segments.length - 1;
          const label = isNumeric(segment) ? segment : formatLabel(segment);

          return (
            <BreadcrumbItem key={pathAccumulator}>
              {isLast ? <span>{label}</span> : <span>{label}</span>}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
