import React from 'react';
import { Info } from 'lucide-react';

export function ADHDMessage() {
  return (
    <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
      <div className="flex items-start gap-4">
        <Info className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
        <div>
          <p className="text-purple-900 mb-2">
            This is how people with ADHD feel when they try to concentrate, for example, on a test! Every detail attracts a lot of attention.
          </p>
          <p className="text-purple-700 text-sm">
            Do you want to learn more about the peculiarities of perception of the world by people with ADHD? Read our infotexts presented at the exhibition stand!
          </p>
        </div>
      </div>
    </div>
  );
}