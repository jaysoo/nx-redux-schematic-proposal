import { Path } from '@angular-devkit/core';

export interface Schema {
  name: string;
  project: string;
  directory: string;
}

interface NormalizedSchema extends Schema {
  projectSourcePath: Path;
  filesPath: Path;
  className: string;
  constantName: string;
  propertyName: string;
  fileName: string;
}
