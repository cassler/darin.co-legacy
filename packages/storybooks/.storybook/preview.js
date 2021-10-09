import React from 'react';
export const decorators = [
  (Story) => (
    <div
      style={{
        // margin: "3em",
        textAlign: "center",
        display: "flex",
        margin: "auto",
        gap: 2,
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {Story()}
      </div>
    </div>
  ),
]
