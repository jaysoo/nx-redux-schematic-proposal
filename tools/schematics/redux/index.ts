import { join, strings } from '@angular-devkit/core';
import '@nrwl/tao/src/compat/angular-cli-compat';
import { getProjectConfig } from '@nrwl/workspace/src/utils/ast-utils';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';

import { NormalizedSchema, Schema } from './schema';
import { getWorkspace, names, toFileName } from '@nrwl/workspace';
import { addReduxPackageDependencies } from './rules/add-redux-package-dependencies';
import { addExportsToBarrel } from './rules/add-exports-to-barrel';

export default function(schema: any): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const options = await normalizeOptions(host, schema);

    return chain([
      generateReduxFiles(options),
      addExportsToBarrel(options),
      addReduxPackageDependencies
    ]);
  };
}

function generateReduxFiles(options: NormalizedSchema) {
  const templateSource = apply(url('./files'), [
    template({ ...options, tmpl: '' }),
    move(options.filesPath)
  ]);

  return mergeWith(templateSource);
}

async function normalizeOptions(
  host: Tree,
  options: Schema
): Promise<NormalizedSchema> {
  const { sourceRoot } = getProjectConfig(host, options.project);

  const workspace = await getWorkspace(host);

  return {
    ...options,
    ...names(options.name),
    constantName: strings.underscore(options.name).toUpperCase(),
    directory: toFileName(options.directory),
    projectSourcePath: sourceRoot,
    filesPath: join(
      sourceRoot,
      workspace.projects.get(options.project).extensions.projectType ===
        'application'
        ? 'app'
        : 'lib'
    )
  };
}
