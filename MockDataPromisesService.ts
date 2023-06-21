import { IObjectCell } from './IObjectCell';
import { getObjectCells as get1kObjectCells } from './MockDataServiceObjectCells1k';
import { getObjectCells as get10kObjectCells } from './MockDataServiceObjectCells10k';

export type Reporter = (msg: string) => void;

export abstract class MockDataPromisesService {
	protected toUpper = true;
	private _objectCells: IObjectCell[] = [];

	constructor(protected reporter?: Reporter) {}

	public get objectCells() {
		return this._objectCells;
	}
	protected set objectCells(values: IObjectCell[]) {
		this._objectCells = values;
	}

	protected async getObjectCells(getObjectCells: () => Array<IObjectCell>): Promise<void> {
		const start = new Date();
		this._objectCells = getObjectCells();
		const end = new Date();
		const durationMs = end.getTime() - start.getTime();

		console.log(`populated ${this._objectCells.length} object cells in ${durationMs} ms`);
	}

	public populate1kObjectCells(): void {
		this.getObjectCells(get1kObjectCells);
	}

	public populate10kObjectCells(): void {
		this.getObjectCells(get10kObjectCells);
	}

	public abstract format(): Promise<void>;
}
