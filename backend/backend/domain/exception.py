class BaseDomainException(BaseException):
    ...


class DomainValidationError(BaseDomainException):
    ...


class NonexistentCourseError(BaseDomainException):
    ...


class NonexistentLessonError(BaseDomainException):
    ...


class CourseNameAlreadyExistsError(BaseDomainException):
    ...
