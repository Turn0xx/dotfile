import { ColorManager } from './../../core/color-managing/color-manager';
import { Observer } from "./observer";

export type ObservableAction = 'add' | 'remove' | 'updated';

export interface ActionMap  {
	add: { colorName: string };
	remove: { colorName: string };
	updated: { colors: string };
};


export interface Subject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notifyAdd(colorName: string): void;
	notifyRemove(colorName: string): void;
	notify<T extends ObservableAction>(payload: ActionMap[T]): void;
}
