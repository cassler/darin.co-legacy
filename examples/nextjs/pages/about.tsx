import React from "react";
import { MicroSweeper } from '@cassler/components';

export default () => {

  return (
    <>
			<div className="content">
				<h1>MineSweep</h1>
				<MicroSweeper size={12} difficulty={0.85} />
			</div>
		</>
  );
};
