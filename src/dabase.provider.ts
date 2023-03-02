import { join } from 'path';
import { DataSource } from 'typeorm';
import { CreateCoursesTable1677186804299 } from './migrations/1677186804299-CreateCoursesTable';
import { CreateTagsTable1677187544731 } from './migrations/1677187544731-CreateTagsTable';
import { CreateCourseTagsTable1677188782032 } from './migrations/1677188782032-CreateCourseTagsTable';
import { CreateCourseIdTOCousesTagsTable1677189159359 } from './migrations/1677189159359-CreateCourseIdTOCousesTagsTable';
import { CreateTagsIdTOCousesTagsTable1677189940873 } from './migrations/1677189940873-CreateTagsIdTOCousesTagsTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
  migrations: [
    CreateCoursesTable1677186804299,
    CreateTagsTable1677187544731,
    CreateCourseTagsTable1677188782032,
    CreateCourseIdTOCousesTagsTable1677189159359,
    CreateTagsIdTOCousesTagsTable1677189940873,
  ],
});
