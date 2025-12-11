// src/app/loading.tsx
'use client';

import React from 'react';
import LoaderVisual from '@/app/components/ui/LoaderVisual'; // Import component xịn

export default function Loading() {
  return (
    // Gọi component, set đích là 95%, chạy chậm trong 8s giả vờ load
    <LoaderVisual targetProgress={95} duration={8} />
  );
}