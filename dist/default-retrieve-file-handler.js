"use strict";
var fs = require("fs");
var transpile_if_ts_1 = require("./transpile-if-ts");
function defaultRetrieveFileHandler(path) {
    path = path.trim();
    var contents;
    try {
        contents = fs.readFileSync(path, 'utf8');
        contents = transpile_if_ts_1.transpileIfTypescript(path, contents);
    }
    catch (e) {
        contents = null;
    }
    return contents;
}
exports.defaultRetrieveFileHandler = defaultRetrieveFileHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1yZXRyaWV2ZS1maWxlLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVmYXVsdC1yZXRyaWV2ZS1maWxlLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF5QjtBQUN6QixxREFBMEQ7QUFFMUQsb0NBQTJDLElBQUk7SUFFN0MsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQVFuQixJQUFJLFFBQWdCLENBQUM7SUFDckIsSUFBSSxDQUFDO1FBQ0gsUUFBUSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLFFBQVEsR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFuQkQsZ0VBbUJDIn0=