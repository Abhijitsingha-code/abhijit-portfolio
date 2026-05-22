// Root schema index for Sanity Studio
// Add this to your Sanity Studio project's schema configuration

import { profile } from './profile';
import { project } from './project';
import { skill } from './skill';

export const schemaTypes = [profile, project, skill];
