
var gulp = require('gulp'),
	rename = require('gulp-rename');


gulp.task('rename',function() {

	gulp.src('./test/*.png')// 读取test文件夹下所有.png文件
		.pipe(rename('中文命名'))// 重命名.png文件的前缀
		.pipe(gulp.dest('./dist'));// 将重命名后的文件写入dist文件夹
});

// gulp.task('default',function() {

// 	gulp.run('rename');
// 	gulp.watch('./dist/*.png',function() {
//         gulp.run('rename');
//     });
// });

gulp.task('default',['rename']);

