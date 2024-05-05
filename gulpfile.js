var gulp = require('gulp');
var install = require('gulp-install');


gulp.task('default', function () {
  return gulp
    .src(['./docker-monitor-install/package.json'])
    .pipe(gulp.dest("./docker-monitor-install/dist"))
    .pipe(
      install({
        args: ['--force'],
      })
    )
    .pipe(gulp.src(['./.dockerignore']))
    .pipe(gulp.dest("./docker-monitor-install/dist"))
    .pipe(gulp.src(['./Dockerfile']))
    .pipe(gulp.dest("./docker-monitor-install/dist"))
    .pipe(gulp.src(['./docker-monitor-worker-notifications/package.json']))
    .pipe(gulp.dest("./docker-monitor-worker-notifications/dist"))
    .pipe(
      install({
        args: ['--force'],
      })
    )
    .pipe(gulp.src(['./.dockerignore']))
    .pipe(gulp.dest("./docker-monitor-worker-notifications/dist"))
    .pipe(gulp.src(['./Dockerfile']))
    .pipe(gulp.dest("./docker-monitor-worker-notifications/dist"))
    .pipe(gulp.src(['./docker-monitor-worker-stats/package.json']))
    .pipe(gulp.dest("./docker-monitor-worker-stats/dist"))
    .pipe(
      install({
        args: ['--force'],
      })
    )
    .pipe(gulp.src(['./.dockerignore']))
    .pipe(gulp.dest("./docker-monitor-worker-stats/dist"))
    .pipe(gulp.src(['./Dockerfile']))
    .pipe(gulp.dest("./docker-monitor-worker-stats/dist"))
});
