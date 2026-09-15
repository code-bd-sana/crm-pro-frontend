"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getRevenueAnalytics } from "@/services/analytics.service";
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChart() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenueAnalytics,
  });

  if (isLoading) {
    return (
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
        <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
          <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pt-[25px]">
          <Skeleton className="h-[300px] w-full rounded-[10px]" />
        </CardContent>
      </Card>
    );
  }

  const data = revenueData ?? [];

  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px]">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E5E5E5" />
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={true}
                tick={{ fill: '#737373', fontSize: 12 }}
                dy={10}
                stroke="#737373"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
                dx={-10}
                tickFormatter={(value: number) =>
                  value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
                }
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="value" fill="#0891B2" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
