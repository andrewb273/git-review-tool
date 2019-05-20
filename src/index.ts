import * as simplegit from 'simple-git/promise';
import npmPrompt from 'prompt';
import { readdir } from 'fs';
import { StatusResult } from 'simple-git/promise';
import { DefaultLogFields, ListLogSummary } from 'simple-git/typings/response';

const path = './';
const originalHash = 'c15c91c531bc0069b249e737de8fb81b6aeadf60';
const git = simplegit(path);
// git.status().then((status: StatusResult) => console.log(status));

git.log({
	n: 20
}).then((value: ListLogSummary<DefaultLogFields>) => console.log(value.all));

// git.diff(['0a369065286c03ed03cbe4e67b40921bdd18d5ed^!']).then((value: string) => console.log(value));
// git.diffSummary(['0a369065286c03ed03cbe4e67b40921bdd18d5ed^!']).then(value => console.log(value));

// const promptForPath = () => {
//   npmPrompt.start();
//   npmPrompt.get(['path'], (err: any, result: any) =>
//     readDirectory(result.path)
//   );
// };

// const readDirectory = (path: string) =>
//   readdir(path, (err: NodeJS.ErrnoException, files: string[]) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
