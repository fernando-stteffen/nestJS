import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  @Inject('COURSE_REPOSITORY')
  private courseRepository: Repository<Course>;

  @Inject('TAGS_REPOSITORY')
  private tagRepository: Repository<Tag>;

  async findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!course) {
      throw new NotFoundException(`The course id: ${id} not founded.`);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`The course id: ${id} not founded.`);
    }

    await this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`The course id: ${id} not founded.`);
    }

    await this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const namePattern = name.toUpperCase();
    const tag = await this.tagRepository.findOne({
      where: { name: namePattern },
    });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name: namePattern });
  }
}
