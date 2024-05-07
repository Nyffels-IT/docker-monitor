@echo on
CALL credentials.bat
%LOCATION%\mysqldump.exe -h %HOST% -u %USER% -p%PASSWORD% --no-data %DATABASE% > schema.sql