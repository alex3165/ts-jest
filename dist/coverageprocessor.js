"use strict";
var path = require("path");
var includes = require("lodash.includes");
var partition = require("lodash.partition");
var loadCoverage = require('remap-istanbul/lib/loadCoverage');
var remap = require('remap-istanbul/lib/remap');
var writeReport = require('remap-istanbul/lib/writeReport');
var istanbulInstrument = require('istanbul-lib-instrument');
var pickBy = require("lodash.pickby");
function processResult(result) {
    if (!global.__ts_coverage__cache__)
        return result;
    var _a = global.__ts_coverage__cache__, coverageConfig = _a.coverageConfig, sourceCache = _a.sourceCache, coverageCollectFiles = _a.coverageCollectFiles;
    if (!coverageConfig.collectCoverage)
        return result;
    var coveredFiles = Object.keys(sourceCache);
    var coverage = [pickBy(result.coverageMap.data, function (_, fileName) { return includes(coveredFiles, fileName); })];
    var uncoveredFiles = partition(coverageCollectFiles, function (x) { return includes(coveredFiles, x); })[1];
    var coverageOutputPath = path.join(coverageConfig.coverageDirectory || 'coverage', 'remapped');
    var emptyCoverage = uncoveredFiles.map(function (x) {
        var ret = {};
        if (sourceCache[x]) {
            var instrumenter = istanbulInstrument.createInstrumenter();
            instrumenter.instrumentSync(sourceCache[x], x);
            ret[x] = instrumenter.fileCoverage;
        }
        return ret;
    });
    var mergedCoverage = loadCoverage(coverage.concat(emptyCoverage), { readJSON: function (t) { return t ? t : {}; } });
    var coverageCollector = remap(mergedCoverage, {
        readFile: function (x) {
            var key = path.normalize(x);
            var source = sourceCache[key];
            delete global.__ts_coverage__cache__.sourceCache[key];
            return source;
        }
    });
    writeReport(coverageCollector, 'html', {}, path.join(coverageOutputPath, 'html'));
    writeReport(coverageCollector, 'lcovonly', {}, path.join(coverageOutputPath, 'lcov.info'));
    writeReport(coverageCollector, 'json', {}, path.join(coverageOutputPath, 'coverage.json'));
    writeReport(coverageCollector, 'text', {}, path.join(coverageOutputPath, 'coverage.txt'));
    return result;
}
module.exports = processResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY292ZXJhZ2Vwcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY292ZXJhZ2Vwcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLDJCQUE2QjtBQUU3QiwwQ0FBNkM7QUFDN0MsNENBQStDO0FBQy9DLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2hFLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ2xELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDOUQsc0NBQXdDO0FBY3hDLHVCQUF1QixNQUFjO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxJQUFBLGtDQUFxRixFQUFuRixrQ0FBYyxFQUFFLDRCQUFXLEVBQUUsOENBQW9CLENBQW1DO0lBQzVGLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFbkQsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM3QyxJQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxVQUFDLENBQUMsRUFBRSxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQTtJQUVyRyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFJakcsSUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzNELFlBQVksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFWLENBQVUsRUFBRSxDQUFDLENBQUM7SUFDckcsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFO1FBQzlDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDVixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxPQUFPLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMzRixXQUFXLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzFGLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDIn0=