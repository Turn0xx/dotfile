import * as React from "react";
import { ExtentedApp } from "../main";
import { ObsidianColorManager } from "../core/color-managing/color-manager.obsidian";
import { Color } from "../core/color.value-object";

type ShortCutsComponentProps = {
	handleKeyDown: (event: KeyboardEvent) => void;
	colors: Color[];
};

const ShortCutsComponent = ({
	handleKeyDown,
	colors,
}: ShortCutsComponentProps) => {
	document.addEventListener("keydown", handleKeyDown);

	return (
		<div>
			<h3>Color Shortcuts</h3>
			<ul>
				{colors.map((c, index) => (
					<div
						key={index}
						style={{
							color: c.unpack(),
              backgroundColor: c.unpack(),
						}}
					>
						{c.unpack()} - {index + 1}
					</div>
				))}
			</ul>
		</div>
	);
};

export default ShortCutsComponent;