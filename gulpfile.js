var gulp = require('gulp');
var install = require('gulp-install');

gulp.task('default', function () {
  return gulp
    .src(['./docker-monitor-install/package.json'])
    .pipe(gulp.dest('./dist/docker-monitor-install'))
    .pipe(
      install({
        args: ['--force'],
      })
    )

    .pipe(gulp.src(['./docker-monitor-worker-notifications/package.json']))
    .pipe(gulp.dest('./dist/docker-monitor-worker-notifications'))
    .pipe(
      install({
        args: ['--force'],
      })
    )

    .pipe(gulp.src(['./docker-monitor-worker-stats/package.json']))
    .pipe(gulp.dest('./dist/docker-monitor-worker-stats'))
    .pipe(
      install({
        args: ['--force'],
      })

    .pipe(gulp.src(['./Dockerfile']))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.src(['./.dockerignore']))
    .pipe(gulp.dest('./dist'))
    );
});
