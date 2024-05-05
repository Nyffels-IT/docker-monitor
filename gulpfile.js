var gulp = require('gulp');
var install = require('gulp-install');

gulp.task('default', function () {
  return gulp
    .src(['./docker-monitor-install/package.json'])
    .pipe(gulp.dest('./dist/docker-monitor-install'))

    .pipe(gulp.src(['./docker-monitor-worker-notifications/package.json']))
    .pipe(gulp.dest('./dist/docker-monitor-worker-notifications'))

    .pipe(gulp.src(['./docker-monitor-worker-stats/package.json']))
    .pipe(gulp.dest('./dist/docker-monitor-worker-stats'))
    
    .pipe(gulp.src(['./Dockerfile']))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.src(['./.dockerignore']))
    .pipe(gulp.dest('./dist'))
    
    .pipe(gulp.src(['./entrypoint.sh']))
    .pipe(gulp.dest('./dist'));
});
