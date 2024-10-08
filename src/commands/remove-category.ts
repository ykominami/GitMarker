import * as vscode from 'vscode';
import BookmarkManager from '../services/bookmark-manager';
import { inject, injectable} from 'inversify';
import { SURE_REMOVING_MSG, YES_MSG } from '../consts/messages';
import { NO_MSG } from '../consts/messages';
import { REMOVE_CATEGORY } from '../consts/commands';
import { TreeDataItem } from '../models/tree-data-item';
import { Command } from './base/command';
import TYPES from './base/types';
import { Category } from '../models/category';

@injectable()
export class RemoveCategory implements Command {

	constructor
	(
		@inject(TYPES.bookmarkManager) 
		private bookmarkManager: BookmarkManager,
	) {}
	
	get id() {
		return REMOVE_CATEGORY;
	}

	async execute(dataItem: TreeDataItem) {
		const existingCategory : Category = this.bookmarkManager.categoryRepositories!.categories
			?.filter(ec => ec.id === dataItem.id)[0];
			
		vscode.window
		.showInformationMessage(
			`${SURE_REMOVING_MSG} ${existingCategory.name}?`,
			...[YES_MSG, NO_MSG]
		)
		.then((answer) => {
			if (answer === YES_MSG) {
				this.bookmarkManager.removeCategory(dataItem);
			}
		});
	}
}