import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';

export function addReduxPackageDependencies(): Rule {
  return addDepsToPackageJson(
    {
      'redux-starter-kit': '0.6.3',
      'react-redux': '7.1.0',
      reselect: '4.0.0'
      // TODO: Should we add re-reselect here to avoid memoization problems?
    },
    {}
  );
}
