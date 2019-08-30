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

const getDiffOfCommit = (hash: string) =>
  git.diff([`${hash}~`, hash]).then(e => console.log(e));

const logFile = async (from: string, file: string) => {
  const value = await git.log({
    file,
    from,
    to: 'HEAD'
  });
  return value.all;
};

interface DiffRange {
  from: string;
  fromDate: string;
  to?: string;
  toDate?: string;
}

const logFileForAuthor = async (
  from: string,
  file: string,
  authorEmail: string
) => {
  const commits = await logFile(from, file);
  const diffRanges: DiffRange[] = [];
  let currentDiffRange: DiffRange;

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (commit.author_email === authorEmail) {
      currentDiffRange = currentDiffRange
        ? {
            ...currentDiffRange,
            to: commit.hash,
            toDate: commit.date
          }
        : {
            from: commit.hash,
            fromDate: commit.date
          };
    } else {
      if (currentDiffRange) {
        diffRanges.push(currentDiffRange);
        currentDiffRange = null;
      }
    }
  }
};

logFile(originalHash, 'src/index.ts');

// git.log({
// 	from: originalHash,
// 	to: 'HEAD'
// }).then((value: ListLogSummary<DefaultLogFields>) => {
// 	const commits = value.all;
// 	console.log(commits);
// });
