import * as migration_20260326_120503_initial from './20260326_120503_initial';
import * as migration_20260326_120832_full_schema from './20260326_120832_full_schema';
import * as migration_20260326_120942_site_about_contacts from './20260326_120942_site_about_contacts';
import * as migration_20260326_133322 from './20260326_133322';

export const migrations = [
  {
    up: migration_20260326_120503_initial.up,
    down: migration_20260326_120503_initial.down,
    name: '20260326_120503_initial',
  },
  {
    up: migration_20260326_120832_full_schema.up,
    down: migration_20260326_120832_full_schema.down,
    name: '20260326_120832_full_schema',
  },
  {
    up: migration_20260326_120942_site_about_contacts.up,
    down: migration_20260326_120942_site_about_contacts.down,
    name: '20260326_120942_site_about_contacts',
  },
  {
    up: migration_20260326_133322.up,
    down: migration_20260326_133322.down,
    name: '20260326_133322'
  },
];
