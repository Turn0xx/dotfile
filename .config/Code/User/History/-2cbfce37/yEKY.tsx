import * as React from "react";
import { ExtentedApp } from "../main";
import { ObsidianColorManager } from "../core/color-managing/color-manager.obsidian";
import { Color } from "../core/color.value-object";

type ShortCutsComponentProps = {
	handleKeyDown: (event: KeyboardEvent) => void;
  colors: Color[];
};

const ShortCutsComponent = ({ handleKeyDown }: ShortCutsComponentProps) => {
	const [colors, setColors] = React.useState<Color[]>([]);

	const colorManager = ObsidianColorManager.getInstance();
	const color = colorManager.loadColors().then((colors) => {
		return colors;
	});

	document.addEventListener("keydown", handleKeyDown);

	return (
		<div>
			<h3>Color Shortcuts</h3>
			<ul>
				{colors.map((c, index) => (
					<li
						key={index}
						style={{
							color: c.unpack(),
						}}
					>
						{c.unpack()}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShortCutsComponent;
