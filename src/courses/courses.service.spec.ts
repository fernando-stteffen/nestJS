import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CourseService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = 'd5ef0ed3-fef4-4894-ab27-dc725ee906be';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    describe('find course by id', () => {
      it('should return an Course Object', async () => {
        const expectedOutPutTags = [
          {
            id,
            name: 'nestJs',
            created_at: date,
          },
        ];

        const expectedOutPutCourse = {
          id,
          name: 'nestJs From zero to Expert',
          description: 'this is an description for that course',
          expectedOutPutTags,
          created_at: date,
        };

        const mockCoursesRepository = {
          create: jest.fn().mockResolvedValue(expectedOutPutCourse),
          save: jest.fn().mockResolvedValue(expectedOutPutCourse),
        };

        const mockTagsRepository = {
          create: jest.fn().mockResolvedValue(expectedOutPutTags),
          findOne: jest.fn(),
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCoursesRepository;
        //@ts-expect-error defined part of methods
        service['tagRepository'] = mockTagsRepository;

        const createCourseDto: CreateCourseDto = {
          name: 'nestJs From zero to Expert',
          description: 'this is an description for that course',
          tags: ['nestJs'],
        };

        const newCourse = await service.create(createCourseDto);

        expect(mockCoursesRepository).toHaveBeenCalled();
      });
    });
  });
});
