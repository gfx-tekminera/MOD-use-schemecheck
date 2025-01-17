import React from 'react';
import { SchemeCheckContext } from './context';
import type { SchemeCheckConfig } from './context';

export const SchemeCheckProvider: React.FC<{
  config?: SchemeCheckConfig;
  children?: React.ReactNode;
}> = ({ children, config = {} }) => {
  return <SchemeCheckContext.Provider value={{ config }}>{children}</SchemeCheckContext.Provider>;
};
