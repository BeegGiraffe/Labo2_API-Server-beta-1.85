import CourseModel from '../models/Course.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class CoursesController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new CourseModel()));
    }
}