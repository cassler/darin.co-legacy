import React from 'react';

type IItemLabel = {
  title: string,
  subtitle?: string,
  index?: number,
}
export const Headline: React.FC<IItemLabel> =
  ({ title, subtitle }) => {
    return (
      <div>
        <h3>{title}</h3>
        <button>{subtitle ? subtitle : 'default'} 🚀</button>
      </div>
    )
  }
