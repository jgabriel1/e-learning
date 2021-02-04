class BaseDomainException(BaseException):
    ...


class NonexistentCourseError(BaseDomainException):
    ...


class NonexistentLessonError(BaseDomainException):
    ...


class CourseNameAlreadyExistsError(BaseDomainException):
    ...
