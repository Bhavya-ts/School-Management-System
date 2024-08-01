export var addStudent = function (req, res, next) {
    var _a = req.body, name = _a.name, age = _a.age, std = _a.std, division = _a.division;
    console.log(name, age, std, division);
};
