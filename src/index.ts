import * as simplegit from 'simple-git/promise';
import npmPrompt from 'prompt';
import { readdir } from 'fs';
import { StatusResult } from 'simple-git/promise';
import { DefaultLogFields, ListLogSummary } from 'simple-git/typings/response';

const path = './';
const originalHash = 'c15c91c531bc0069b249e737de8fb81b6aeadf60';
const git = simplegit(path);

const commits: string[] = [];
let foundStart = false;
let skip = 0;

git
	.diff([`${originalHash}~`, originalHash])
	.then(e => console.log(e));


// git.log({
// 	from: originalHash,
// 	to: 'HEAD'
// }).then((value: ListLogSummary<DefaultLogFields>) => {
// 	const commits = value.all;
// 	console.log(commits);
// });
