import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MarketData } from '../types';

interface InvestmentChartProps {
  data: MarketData[];
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-center text-lg font-semibold text-gray-700 mb-4">Valorización Anual Estimada vs Crecimiento Turístico (%)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="city" 
            angle={-45} 
            textAnchor="end" 
            height={80} 
            tick={{ fill: '#4b5563', fontSize: 12 }} 
          />
          <YAxis tick={{ fill: '#4b5563' }} />
          <Tooltip 
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="appreciation" name="Valorización (%)" fill="#0d9488" radius={[4, 4, 0, 0]}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#0d9488' : '#94a3b8'} />
              ))}
          </Bar>
          <Bar dataKey="tourismGrowth" name="Turismo (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
