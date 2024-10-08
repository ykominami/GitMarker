import ContextManager from "./context-manager";
import { injectable } from "inversify";
import { Memento } from "vscode";

@injectable()
export class DataStorageManager {
	private storage: Memento;

	constructor() {
		this.storage = ContextManager.instance.
			context.globalState;
	}   

	public getValue<T>(key : string) {
		return this.storage.get<T>(key);
	}

	public setValue<T>(key : string, value : T) {
		this.storage.update(key, value);
	}

	public clearValues(key : string) {
		this.storage.update(key, undefined);
	}
}