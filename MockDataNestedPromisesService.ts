import { type IObjectCell } from './IObjectCell';
import { MockDataPromisesService } from './MockDataPromisesService';

export class MockDataNestedPromisesService extends MockDataPromisesService {
	private formatKeyValue(key: string, value: string): Promise<[string, string]> {
		return new Promise((resolve) => {
			const resolvedValue = this.toUpper ? value.toUpperCase() : value.toLowerCase();
			resolve([key, resolvedValue]);
		});
	}

	private formatObjectCell(objectCell: IObjectCell): Promise<IObjectCell> {
		const fieldPromises: Array<Promise<[string, string]>> = [];

		for (const key of Object.keys(objectCell)) {
			fieldPromises.push(this.formatKeyValue(key, objectCell[key]));
		}

		return new Promise((resolve) => {
			Promise.all(fieldPromises).then((tuples: [string, string][]) => {
				const resolvedObjectCell: Record<string, string> = {};
				for (const tuple of tuples) {
					resolvedObjectCell[tuple[0]] = tuple[1];
				}

				resolve(resolvedObjectCell as IObjectCell);
			});
		});
	}

	public override format(): Promise<void> {
		const start = new Date();

		const objectCellPromises: Array<Promise<IObjectCell>> = [];
		for (const objectCell of this.objectCells) {
			objectCellPromises.push(this.formatObjectCell(objectCell));
		}

		this.toUpper = !this.toUpper;

		return Promise.all(objectCellPromises).then((objectCells: Array<IObjectCell>) => {
			const end = new Date();
			const durationMs = end.getTime() - start.getTime();
			console.log(`formatted ${objectCells.length} object cells in ${durationMs} ms via nested promises.`);

			if (this.reporter) {
				this.reporter(`formatted ${objectCells.length} object cells in ${durationMs} ms via nested promises.`);
			}

			this.objectCells = objectCells;
		});
	}
}
