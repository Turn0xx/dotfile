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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {colors.map((c, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: "center",
                            width: "30px",
                        }}
                    >
                        <div>{index + 1}</div>
                        <div
                            style={{
                                backgroundColor: c.unpack(),
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                margin: "auto",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
	);
};

export default ShortCutsComponent;
