import { type IObjectCell } from './IObjectCell';
import { MockDataPromisesService } from './MockDataPromisesService';

export class MockDataFlatPromisesService extends MockDataPromisesService {
	private fieldValueToUpper(objectCell: IObjectCell, key: string) {
		if (!(key in objectCell)) {
			return;
		}
		const value = objectCell[key];
		objectCell[key] = this.toUpper ? value.toUpperCase() : value.toLowerCase();
	}

	public override format(): Promise<void> {
		const start = new Date();
		const promiseArray: Array<Promise<void>> = [];

		for (const objectCell of this.objectCells) {
			for (const key of Object.keys(objectCell)) {
				promiseArray.push(
					new Promise((resolve) => {
						this.fieldValueToUpper(objectCell, key);
						resolve();
					})
				);
			}
		}

		this.toUpper = !this.toUpper;
		return Promise.all(promiseArray).then(() => {
			const end = new Date();
			const durationMs = end.getTime() - start.getTime();
			console.log(`formatted ${this.objectCells.length} object cells in ${durationMs} ms via flat promises.`);

			if (this.reporter) {
				this.reporter(`formatted ${this.objectCells.length} object cells in ${durationMs} ms via flat promises.`);
			}
		});
	}
}
