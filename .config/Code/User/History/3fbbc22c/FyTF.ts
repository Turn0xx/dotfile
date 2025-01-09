import { TextAreaSetting } from "./../../text-area-setting";
import { Observer } from "./observer";
export interface Subject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notifyAdd(): void;
	notifyRemove(): void;
}
