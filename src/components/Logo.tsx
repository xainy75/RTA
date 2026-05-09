import React from 'react';
import { Settings, Wrench } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      <div className="relative flex items-center justify-center translate-y-[-1px]">
        <div className="bg-orange-600 rounded-xl p-2 shadow-lg shadow-orange-600/20 group-hover:rotate-90 transition-transform duration-700">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Wrench className="w-3 h-3 text-neutral-900 rotate-[-45deg]" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter text-white italic">
          RTA
        </span>
        <span className="text-[7px] font-black text-orange-600 uppercase tracking-[0.2em] -mt-0.5">
          Ramzan Technical Academy
        </span>
      </div>
    </div>
  );
};
