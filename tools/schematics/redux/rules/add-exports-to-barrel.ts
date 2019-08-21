import * as ts from 'typescript';
import * as path from 'path';
import { Rule, Tree } from '@angular-devkit/schematics';

import { insert, addGlobal } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

/*
 * Adds exports from redux slice to the project index.ts file.
 */
export function addExportsToBarrel(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    const indexFilePath = path.join(options.projectSourcePath, 'index.ts');

    const buffer = host.read(indexFilePath);
    if (!!buffer) {
      const indexSource = buffer.toString('utf-8');
      const indexSourceFile = ts.createSourceFile(
        indexFilePath,
        indexSource,
        ts.ScriptTarget.Latest,
        true
      );

      const statePath = options.directory
        ? `./lib/${options.directory}/${options.fileName}`
        : `./lib/${options.fileName}`;

      insert(host, indexFilePath, [
        ...addGlobal(
          indexSourceFile,
          indexFilePath,
          `export * from '${statePath}.slice';`
        )
      ]);
    }

    return host;
  };
}
