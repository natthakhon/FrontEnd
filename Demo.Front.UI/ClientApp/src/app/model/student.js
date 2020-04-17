"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Student = /** @class */ (function () {
    function Student(id, name, lastname, isnew, isHidden, enrollments) {
        if (isnew === void 0) { isnew = false; }
        if (isHidden === void 0) { isHidden = false; }
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.isnew = isnew;
        this.isHidden = isHidden;
        this.enrollments = enrollments;
    }
    return Student;
}());
exports.Student = Student;
//# sourceMappingURL=student.js.map